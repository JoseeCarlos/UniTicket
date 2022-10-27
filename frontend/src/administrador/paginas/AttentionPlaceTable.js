import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { CustomerService } from "../servicios/ServicioCliente";
import { ProductService } from "../servicios/ServicioProducto";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const LugarAtencionMesa = () => {
  let mesaVacia = {
    idMesa: null,
    numero: "",
    idLugarAtencion: null,
    idArea: null,
    estado: "",
    fechaCreacion: "",
    fechaActualizacion: "",
    idUsuarioCreacion: "",
    idUsuarioActualizacion: "",
  };
  let lugarAtencionVacio = {
    idLugarAtencion: null,
    nombre: "",
    idCampus: "",
    estado: "",
    fechaCreacion: "",
    fechaActualizacion: "",
    idUsuarioCreacion: "",
    idUsuarioActualizacion: "",
  };
  let lugarAtencionAreaVacia = {
    idLugarAtencion: null,
    idArea: null,
    fechaInicio: "",
    fechaFin: "",
    estado: "",
    fechaCreacion: "",
    fechaActualizacion: "",
    idUsuarioCreacion: "",
    idUsuarioActualizacion: "",
  };
  const [productos, establecerProducto] = useState([]);
  const [filasExpandidas, establecerFilasExpandidas] = useState(null);
  const [numero, establecerEnvioNumero] = useState(false);
  const [mesa, establecerMesa] = useState(mesaVacia);
  const [dialogoInsercionMesa, establecerDialogoInsercionMesa] = useState(false);
  const [dialogoEdicionMesa, establecerDialogoEdicionMesa] = useState(false);
  const [dialogoVistaMesa, establecerDialogoVistaMesa] = useState(false);
  const [dialogoBorradoMesa, establecerDialogoBorradoMesa] = useState(false);
  const [nombre, establecerEnvioNombre] = useState(false);
  const [lugarAtencion, establcerLugarAtencion] = useState(lugarAtencionVacio);
  const [dialogoInsercionLugarAtencion, establecerDialogoInsercionLugarAtencion] =
    useState(false);
  const [dialogoVistaLugarAtencion, establecerDialogoVistaLugarAtencion] =
    useState(false);
  const [dialogoEdicionLugarAtencion, establecerDialogoEdicionLugarAtencion] =
    useState(false);
  const [dialogoBorradoLugarAtencion, establecerDialogoBorradoLugarAtencion] =
    useState(false);
  const [valorDropdown, establecerValorDropdown] = useState(null);

  const servicioProducto = new ProductService();

  const valoresDropdown = [
    { nombre: "Cajas Tiquipaya", code: "1" },
    { nombre: "Bienestar Universitario Tiquipaya", code: "2" },
  ];
  const valoresDropdownCampus = [
    { nombre: "Campus Tiquipaya", code: "1" },
    { nombre: "Edificio America", code: "2" },
  ];
  const valoresDropdownArea = [
    { nombre: "Caja", code: "1" },
    { nombre: "Bienestar Universitario", code: "2" },
  ];
  const ocultarDialogo = () => {
    establecerEnvioNumero(false);
    establecerEnvioNombre(false);
    establecerDialogoInsercionMesa(false);
    establecerDialogoEdicionMesa(false);
    establecerDialogoVistaMesa(false);
    establecerDialogoBorradoMesa(false);
    establecerDialogoInsercionLugarAtencion(false);
    establecerDialogoBorradoLugarAtencion(false);
    establecerDialogoVistaLugarAtencion(false);
    establecerDialogoEdicionLugarAtencion(false);
  };
  const cambioEntradaMesa = (e, numero) => {
    const val = (e.target && e.target.value) || "";
    let _Mesa = { ...mesa };
    _Mesa[`${numero}`] = val;

    establecerMesa(_Mesa);
  };
  const cambioEntradaLugarAtencion = (e, nombre) => {
    const val = (e.target && e.target.value) || "";
    let _LugarAtencion = { ...lugarAtencion };
    _LugarAtencion[`${nombre}`] = val;
    establcerLugarAtencion(_LugarAtencion);
  };
  useEffect(() => {
    servicioProducto
      .getProductsWithOrdersSmall()
      .then((dato) => establecerProducto(dato));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const expandirTodo = () => {
    let _filasExpandidas = {};
    productos.forEach((p) => (_filasExpandidas[`${p.id}`] = true));

    establecerFilasExpandidas(_filasExpandidas);
  };

  const colapsarTodo = () => {
    establecerFilasExpandidas(null);
  };
  const insertarMesa = () => {
    establecerMesa({ mesaVacia });
    establecerDialogoInsercionMesa(true);
  };
  const verMesa = (table) => {
    establecerMesa({ ...table });
    establecerDialogoVistaMesa(true);
  };
  const editarMesa = (table) => {
    establecerMesa({ ...table });
    establecerDialogoEdicionMesa(true);
  };
  const confirmarBorradoMesa = (table) => {
    establecerMesa(table);
    establecerDialogoBorradoMesa(true);
  };
  const insertarLugarAtencion = () => {
    establcerLugarAtencion(lugarAtencionVacio);
    establecerDialogoInsercionLugarAtencion(true);
  };
  const verLugarAtencion = (lugarAtencion) => {
    establcerLugarAtencion({ ...lugarAtencion });
    establecerDialogoVistaLugarAtencion(true);
  };
  const editarLugarAtencion = (lugarAtencion) => {
    establcerLugarAtencion({ ...lugarAtencion });
    establecerDialogoEdicionLugarAtencion(true);
  };
  const confirmarBorradoLugarAtencion = (lugarAtencion) => {
    establcerLugarAtencion(lugarAtencion);
    establecerDialogoBorradoLugarAtencion(true);
  };
  const baseExpancionFilas = (dato) => {
    return (
      <div className="orders-subtable">
        <DataTable
          value={dato.orders}
          responsiveLayout="scroll"
          header={encabezadoMesa}
        >
          <Column
            field="id"
            header="Numero de Mesa"
            sortable
            headerStyle={{ width: "4rem" }}
          ></Column>
          <Column
            field="empleado"
            header="Empleado Actual"
            sortable
            headerStyle={{ width: "12rem" }}
          ></Column>
          <Column
            field="estado"
            header="Estado"
            sortable
            headerStyle={{ width: "4rem" }}
          ></Column>
          <Column
            header="Acciones"
            headerStyle={{ width: "1rem" }}
            body={
              <span className="p-buttonset">
                <Button icon="pi pi-eye" onClick={() => verMesa(dato)} />
                <Button icon="pi pi-pencil" onClick={() => editarMesa(dato)} />
                <Button
                  icon="pi pi-trash"
                  onClick={() => confirmarBorradoMesa(dato)}
                />
              </span>
            }
          ></Column>
        </DataTable>
        <Dialog
          visible={dialogoInsercionMesa}
          style={{ width: "450px" }}
          header="Nueva Mesa"
          modal
          className="p-fluid"
          footer={pieDialogoInsercionMesa}
          onHide={ocultarDialogo}
        >
          <div className="field">
            <label htmlFor="numero">Numero</label>
            <InputText
              id="numero"
              value={mesa.numero}
              onChange={(e) => cambioEntradaMesa(e, "numero")}
              required
              autoFocus
              className={classNames({ "p-invalid": numero && !mesa.numero })}
            />
            {numero && !mesa.numero && (
              <small className="p-invalid">El numero es requerido.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="lugarAtencion">Lugar de Atención</label>
            <Dropdown
              value={valorDropdown}
              onChange={(e) => establecerValorDropdown(e.value)}
              options={valoresDropdown}
              optionLabel="nombre"
              placeholder="Seleccione el Lugar de Atención"
            />
          </div>
        </Dialog>
        <Dialog
          visible={dialogoVistaMesa}
          style={{ width: "450px" }}
          header="Mesa"
          modal
          className="p-fluid"
          footer={pieDialogoVistaMesa}
          onHide={ocultarDialogo}
        >
          <div className="field">
            <label htmlFor="numero">Numero</label>
            <InputText
              id="numero"
              value={"1"}
              onChange={(e) => cambioEntradaMesa(e, "numero")}
              disabled
              className={classNames({ "p-invalid": numero && !mesa.numero })}
            />
          </div>
          <div className="field">
            <label htmlFor="lugarAtencion">Lugar de Atención</label>
            <Dropdown
              id="lugarAtencion"
              value={valoresDropdown[0]}
              onChange={(e) => establecerValorDropdown(e.value)}
              options={valoresDropdown}
              optionLabel="nombre"
              placeholder="Seleccione el Lugar de Atención"
              disabled
            />
          </div>
        </Dialog>
        <Dialog
          visible={dialogoEdicionMesa}
          style={{ width: "450px" }}
          header="Editar Mesa"
          modal
          className="p-fluid"
          footer={pieDialogoEdicionMesa}
          onHide={ocultarDialogo}
        >
          <div className="field">
            <label htmlFor="numero">Numero</label>
            <InputText
              id="numero"
              value={mesa.numero}
              onChange={(e) => cambioEntradaMesa(e, "numero")}
              required
              autoFocus
              className={classNames({ "p-invalid": numero && !mesa.numero })}
            />
            {numero && !mesa.numero && (
              <small className="p-invalid">El numero es requerido.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="lugarAtencion">Lugar de Atención</label>
            <Dropdown
            id="lugarAtencion"
              value={valorDropdown}
              onChange={(e) => establecerValorDropdown(e.value)}
              options={valoresDropdown}
              optionLabel="nombre"
              placeholder="Seleccione el Lugar de Atención"
            />
          </div>
        </Dialog>
        <Dialog
          visible={dialogoBorradoMesa}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={pieDialogoBorradoMesa}
          onHide={ocultarDialogo}
        >
          <div className="flex align-items-center justify-content-center">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            <span>Estás seguro de que desea eliminar la Mesa</span>
          </div>
        </Dialog>
      </div>
    );
  };
  const pieDialogoVistaMesa = (
    <>
      <Button
        label="Salir"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
    </>
  );
  const pieDialogoInsercionMesa = (
    <>
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
    </>
  );
  const pieDialogoEdicionMesa = (
    <>
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
    </>
  );
  const pieDialogoBorradoMesa = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={borrarMesa}
      />
    </>
  );
  const pieDialogoInsercionLugarAtencion = (
    <>
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
    </>
  );
  const pieDialogoVistaLugarAtencion = (
    <>
      <Button
        label="Salir"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
    </>
  );
  const borrarMesa = () => {};
  const borrarLugraAtencion = () => {};
  const pieDialogoBorradoLugarAtencion = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={borrarLugraAtencion}
      />
    </>
  );
  const pieDialogoEdicionLugarAtencion = (
    <>
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogo}
      />
    </>
  );
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5>
        Lugares De Atención{" "}
        <i className="pi pi-plus icn" onClick={insertarLugarAtencion} />
      </h5>
      <span className="p-buttonset">
        <Button icon="pi pi-plus" label="Expandir" onClick={expandirTodo} />
        <Button icon="pi pi-minus" label="Colapsar" onClick={colapsarTodo} />
      </span>
    </div>
  );
  const encabezadoMesa = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5>
        Mesas asignadas
        <i className="pi pi-plus icn" onClick={insertarMesa} />
      </h5>
    </div>
  );
  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5>Administración De Lugares De Atención y Mesas</h5>
          </div>

          <DataTable
            value={productos}
            expandedRows={filasExpandidas}
            onRowToggle={(e) => establecerFilasExpandidas(e.dato)}
            responsiveLayout="scroll"
            rowExpansionTemplate={baseExpancionFilas}
            dataKey="id"
            header={header}
          >
            <Column expander style={{ width: "1em" }} />
            <Column field="nombre" header="Nombre" sortable />
            <Column field="area" header="Area Actual" sortable />
            <Column field="campus" header="Campus" sortable />
            <Column field="estado" header="Estado" sortable />
            <Column
              header="Acciones"
              headerStyle={{ width: "12rem" }}
              body={
                <span className="p-buttonset">
                  <Button
                    icon="pi pi-eye"
                    onClick={() => verLugarAtencion()}
                  />
                  <Button
                    icon="pi pi-pencil"
                    onClick={() => editarLugarAtencion()}
                  />
                  <Button
                    icon="pi pi-trash"
                    onClick={() => confirmarBorradoLugarAtencion()}
                  />
                </span>
              }
            ></Column>
          </DataTable>
        </div>
      </div>
      <Dialog
        visible={dialogoInsercionLugarAtencion}
        style={{ width: "450px" }}
        header="Nuevo Lugar de Atención"
        className="p-fluid"
        footer={pieDialogoInsercionLugarAtencion}
        onHide={ocultarDialogo}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            onChange={(e) => cambioEntradaLugarAtencion(e, "nombre")}
            required
            className={classNames({ "p-invalid": nombre && !lugarAtencion.nombre })}
          />
          {nombre && !lugarAtencion.nombre && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="campus">Campus</label>
          <Dropdown
            value={valorDropdown}
            onChange={(e) => establecerValorDropdown(e.value)}
            options={valoresDropdownCampus}
            optionLabel="nombre"
            placeholder="Seleccione el campus"
          />
        </div>
        <div className="field">
          <label htmlFor="area">Area</label>
          <Dropdown
            value={valorDropdown}
            onChange={(e) => establecerValorDropdown(e.value)}
            options={valoresDropdownArea}
            optionLabel="nombre"
            placeholder="Seleccione el area"
            required
          />
        </div>
      </Dialog>
      <Dialog
        visible={dialogoVistaLugarAtencion}
        style={{ width: "450px" }}
        header="Lugar de Atención"
        modal
        className="p-fluid"
        footer={pieDialogoVistaLugarAtencion}
        onHide={ocultarDialogo}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={"Cajas Tipuipaya"}
            onChange={(e) => cambioEntradaLugarAtencion(e, "nombre")}
            disabled
            className={classNames({ "p-invalid": nombre && !lugarAtencion.nombre })}
          />
          {nombre && !lugarAtencion.nombre && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="campus">Campus</label>
          <Dropdown
            value={valoresDropdownCampus[0]}
            onChange={(e) => establecerValorDropdown(e.value)}
            options={valoresDropdownCampus}
            optionLabel="nombre"
            placeholder="Seleccione el Lugar de Atención"
            disabled
          />
        </div>
        <div className="field">
          <label htmlFor="area">Area</label>
          <Dropdown
            value={valoresDropdownArea[0]}
            onChange={(e) => establecerValorDropdown(e.value)}
            options={valoresDropdownArea}
            optionLabel="nombre"
            placeholder="Seleccione el area"
            disabled
          />
        </div>
      </Dialog>
      <Dialog
        visible={dialogoEdicionLugarAtencion}
        style={{ width: "450px" }}
        header="Editar Lugar de Atención"
        modal
        className="p-fluid"
        footer={pieDialogoEdicionLugarAtencion}
        onHide={ocultarDialogo}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={lugarAtencion.nombre}
            onChange={(e) => cambioEntradaLugarAtencion(e, "nombre")}
            required
            autoFocus
            className={classNames({ "p-invalid": nombre && !lugarAtencion.nombre })}
          />
          {nombre && !lugarAtencion.nombre && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="campus">Campus</label>
          <Dropdown
            value={valorDropdown}
            onChange={(e) => establecerValorDropdown(e.value)}
            options={valoresDropdownCampus}
            optionLabel="nombre"
            placeholder="Seleccione el campus"
          />
        </div>
        <div className="field">
          <label htmlFor="area">Area</label>
          <Dropdown
            value={valorDropdown}
            onChange={(e) => establecerValorDropdown(e.value)}
            options={valoresDropdownArea}
            optionLabel="nombre"
            placeholder="Seleccione el area"
            required
          />
        </div>
      </Dialog>
      <Dialog
        visible={dialogoBorradoLugarAtencion}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={pieDialogoBorradoLugarAtencion}
        onHide={ocultarDialogo}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>Estás seguro de que desea elimiar el Lugar de Atención</span>
          {lugarAtencion && (
            <span>
              Estás seguro de que desea elimiar el campus{" "}
              <b>{lugarAtencion.nombre}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(LugarAtencionMesa, comparisonFn);
