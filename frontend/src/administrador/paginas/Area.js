import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
const Area = () => {
  let areaVacia = {
    idArea: null,
    nombre: "",
    descripcion: "",
    estado: "",
    fechaCreacion: "",
    fechaActualizacion: "",
    idUsuarioCreacion: "",
    idUsuarioModificacion: "",
  };
  const [ValorDataview, establecerValorDataview] = useState(null);
  const [layout, establecerLayout] = useState("grid");
  const [tipoOrden, establecerTipoOrden] = useState(null);
  const [tipoCampo, establecerTipoCampo] = useState(null);
  const [envio, establecerEnvio] = useState(false);
  const [area, establecerArea] = useState(areaVacia);
  const [dialogoInsercionArea, establecerDialogoInsercionArea] = useState(false);
  const [dialogoVistaArea, establecerDialogoVisualizacionArea] = useState(false);
  const [dialogoEdicionArea, establecerDialogoEdicionArea] = useState(false);
  const [dialogoBorradoArea, establecerDialogoBorradoArea] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    establecerValorDataview([
      {
        idArea: 1,
        nombre: "Cajas",
        descripcion: "Atencion para pagos al a universidad",
        estado: "Activo",
        fechaCreacion: "10/10/2022",
        fechaActualizacion: "12/10/2022",
        usuarioCreacion: "Juan Perez",
        usuarioModificacion: "Jose Matinez",
      },
      {
        idArea: 2,
        nombre: "Bienestar Universitario",
        descripcion: "Atencion para pagos al a universidad",
        estado: "Activo",
        fechaCreacion: "10/10/2022",
        fechaActualizacion: "12/10/2022",
        usuarioCreacion: "Juan Perez",
        usuarioModificacion: "Jose Matinez",
      },
      {
        idArea: 3,
        nombre: "Tramites",
        descripcion: "Atencion para pagos al a universidad",
        estado: "Activo",
        fechaCreacion: "10/10/2022",
        fechaActualizacion: "12/10/2022",
        usuarioCreacion: "Juan Perez",
        usuarioModificacion: "Jose Matinez",
      },
      {
        idArea: 4,
        nombre: "Contabilidad",
        descripcion: "Atencion para pagos al a universidad",
        estado: "Activo",
        fechaCreacion: "10/10/2022",
        fechaActualizacion: "12/10/2022",
        usuarioCreacion: "Juan Perez",
        usuarioModificacion: "Jose Matinez",
      },
      {
        idArea: 5,
        nombre: "Incripciones",
        descripcion: "Atencion para pagos al a universidad",
        estado: "Inactivo",
        fechaCreacion: "10/10/2022",
        fechaActualizacion: "12/10/2022",
        usuarioCreacion: "Juan Perez",
        usuarioModificacion: "Jose Matinez",
      },
    ]);
  }, []);
  const verArea = (area) => {
    establecerArea({ ...area });
    establecerDialogoVisualizacionArea(true);
  };
  const insercionArea = () => {
    establecerArea(areaVacia);
    establecerDialogoInsercionArea(true);
  };
  const edicionArea = (area) => {
    establecerArea({ ...area });
    establecerDialogoEdicionArea(true);
  };
  const borradoArea = (area) => {
    establecerArea({ ...area });
    establecerDialogoBorradoArea(true);
  };
  const ocultarDialogoInsercionArea = () => {
    establecerEnvio(false);
    establecerDialogoInsercionArea(false);
  };
  const ocultarDialogoVistaArea = () => {
    establecerEnvio(false);
    establecerDialogoVisualizacionArea(false);
  };
  const ocultarDialogoEdicionArea = () => {
    establecerEnvio(false);
    establecerDialogoEdicionArea(false);
  };
  const ocultarDialogoBorradoArea = () => {
    establecerEnvio(false);
    establecerDialogoBorradoArea(false);
  };
  const guardarArea = () => {};

  const cambioEntrada = (e, nombre) => {
    const val = (e.target && e.target.value) || "";
    let _area = { ...area };
    _area[`${nombre}`] = val;

    establecerArea(_area);
  };
  const pieDialogoInsercionArea = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        classnombre="p-button-text"
        onClick={ocultarDialogoInsercionArea}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={guardarArea}
      />
    </>
  );
  const pieDialogoVistaArea = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoVistaArea}
      />
    </>
  );

  const borrarArea = () => {};
  const pieDialogoBorradoArea = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoBorradoArea}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={borrarArea}
      />
    </>
  );
  const pieDialogoEdicionArea = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoEdicionArea}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={guardarArea}
      />
    </>
  );
  const listaElementoD = (dato) => {
    return (
      <>
        <div className="col-12">
          <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div className="flex flex-column md:flex-row align-items-center p-3">
              <img
                src={`assets/demo/images/product/${dato.image}`}
                alt={dato.name}
                className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5"
              />
              <div className="flex-1 text-center md:text-left">
                <div className="font-bold text-2xl">{dato.nombre}</div>
                <div className="mb-3">{dato.descripcion}</div>
                <div className="mb-3">{dato.estado}</div>
              </div>
            </div>
            <span className="p-buttonset">
              <Button
                icon="pi pi-eye"
                onClick={() => {
                  verArea(dato);
                }}
              />
              <Button icon="pi pi-pencil" onClick={() => edicionArea(dato)} />
              <Button icon="pi pi-trash" onClick={() => borradoArea(dato)} />
            </span>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="card">
        <h5>
          Administración De Areas{" "}
          <i className="pi pi-plus icn" onClick={insercionArea} />
        </h5>
        <DataView
          value={ValorDataview}
          layout={layout}
          paginator
          rows={9}
          sortOrder={tipoOrden}
          sortField={tipoCampo}
          itemTemplate={listaElementoD}
        ></DataView>
      </div>
      <Dialog
        visible={dialogoInsercionArea}
        style={{ width: "450px" }}
        header="Nueva Area"
        modal
        className="p-fluid"
        footer={pieDialogoInsercionArea}
        onHide={ocultarDialogoInsercionArea}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={area.nombre}
            onChange={(e) => cambioEntrada(e, "nombre")}
            required
            autoFocus
            className={classNames({ "p-invalid": envio && !area.nombre })}
          />
          {envio && !area.nombre && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputText
            id="descripcion"
            value={area.descripcion}
            onChange={(e) => cambioEntrada(e, "descripcion")}
            required
            autoFocus
            className={classNames({ "p-invalid": envio && !area.nombre })}
          />
          {envio && !area.nombre && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={dialogoVistaArea}
        style={{ width: "450px" }}
        header="Visualizar Area"
        modal
        className="p-fluid"
        footer={pieDialogoVistaArea}
        onHide={ocultarDialogoVistaArea}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={area.nombre}
            onChange={(e) => cambioEntrada(e, "nombre")}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputText id="descripcion" value={area.descripcion} readOnly />
        </div>
        <div className="field">
          <label htmlFor="estado">Estado</label>
          <InputText id="estado" value={area.estado} readOnly />
        </div>
        <div className="field">
          <label htmlFor="usuarioCreacion">Responsable de Registro</label>
          <InputText id="usuarioCreacion" value={area.usuarioCreacion} readOnly />
        </div>
        <div className="field">
          <label htmlFor="fechaCreacion">Fecha de Registro</label>
          <InputText id="fechaCreacion" value={area.fechaCreacion} readOnly />
        </div>
        <div className="field">
          <label htmlFor="fechaActualizacion">Fecha de Ultima Modificación</label>
          <InputText id="fechaActualizacion" value={area.fechaActualizacion} readOnly />
        </div>
        <div className="field">
          <label htmlFor="usuarioModificacion">Responsable de Ultima Modificación</label>
          <InputText id="usuarioModificacion" value={area.usuarioModificacion} readOnly />
        </div>
      </Dialog>
      <Dialog
        visible={dialogoEdicionArea}
        style={{ width: "450px" }}
        header="Editar Area"
        modal
        className="p-fluid"
        footer={pieDialogoEdicionArea}
        onHide={ocultarDialogoEdicionArea}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={area.nombre}
            onChange={(e) => cambioEntrada(e, "nombre")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputText
            id="descripcion"
            value={area.descripcion}
            onChange={(e) => cambioEntrada(e, "descripcion")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="estado">Estado</label>
          <InputText
            id="estado"
            value={area.estado}
            onChange={(e) => cambioEntrada(e, "estado")}
            required
          />
        </div>
      </Dialog>
      <Dialog
        visible={dialogoBorradoArea}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={pieDialogoBorradoArea}
        onHide={ocultarDialogoBorradoArea}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>
            Estás seguro de que desea elimiar el area <b>{area.nombre}</b>?
          </span>
        </div>
      </Dialog>
    </>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Area, comparisonFn);
