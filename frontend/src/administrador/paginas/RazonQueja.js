import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
const RazonQueja = () => {
  let razonQuejaVacia = {
    idRazonQuejaVacia: null,
    nombre: "",
    descripcion: "",
    idUsuarioRegistro: null,
    estado: "",
    fechaRegistro: "",
    fechaModificacion: "",
  };
  const [envio, establecerEnvio] = useState(false);
  const [valorDataview, establecerValorDataview] = useState(null);
  const [valorFiltroEstado, establecerValorFiltroEstado] = useState(null);
  const [razonQueja, establecerRazonQueja] = useState(razonQuejaVacia);
  const [dialogoInsercionRazonQueja, establecerDialogoInsercionRazonQueja] =
    useState(false);
  const [dialogoVistaRazonQueja, establecerDialogoVistaRazonQueja] =
    useState(false);
  const [dialogoEdicionRazonQueja, establecerDialogoEdicionRazonQueja] =
    useState(false);
  const [dialogoBorradoRazonQueja, establecerDialogoBorradoRazonQueja] =
    useState(false);
  useEffect(() => {
    establecerValorFiltroEstado([
      { id: 1, nombre: "Activo" },
      { id: 0, nombre: "Inactivo" },
    ]);
    establecerValorDataview([
      {
        idRazonQueja: 1,
        nombre: "Malos tratos",
        descripcion: "Mala actitud por parte del empleado",
        estado: "Activo",
      },
      {
        idRazonQueja: 2,
        nombre: "Largos tiempos de espera",
        descripcion: "Mucho tiempo en espera para ser atendido",
        estado: "Activo",
      },
    ]);
  }, []);
  const verRazonQueja = (razonQueja) => {
    establecerRazonQueja({ ...razonQueja });
    establecerDialogoVistaRazonQueja(true);
  };
  const insercionRazonQueja = () => {
    establecerRazonQueja(razonQuejaVacia);
    establecerDialogoInsercionRazonQueja(true);
  };
  const edicionRazonQueja = (razonQueja) => {
    establecerRazonQueja({ ...razonQueja });
    establecerDialogoEdicionRazonQueja(true);
  };
  const borradoRazonQueja = (razonQueja) => {
    establecerRazonQueja({ ...razonQueja });
    establecerDialogoBorradoRazonQueja(true);
  };
  const ocultarDialogoInsercionRazonQueja = () => {
    establecerEnvio(false);
    establecerDialogoInsercionRazonQueja(false);
  };
  const ocultarDialogoVistaRazonQueja = () => {
    establecerEnvio(false);
    establecerDialogoVistaRazonQueja(false);
  };
  const ocultarDialogoEdicionRazonQueja = () => {
    establecerEnvio(false);
    establecerDialogoEdicionRazonQueja(false);
  };
  const ocultarDialogoBorradoRazonQueja = () => {
    establecerEnvio(false);
    establecerDialogoBorradoRazonQueja(false);
  };

  const cambioEntrada = (e, nombre) => {
    const valor = (e.target && e.target.value) || "";
    let _razonQueja = { ...razonQueja };
    _razonQueja[`${nombre}`] = valor;

    establecerRazonQueja(_razonQueja);
  };
  const pieDialogoInsercionRazonQueja = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoInsercionRazonQueja}
      />
      <Button label="Guardar" icon="pi pi-check" />
    </>
  );
  const pieDialogoVistaRazonQueja = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoVistaRazonQueja}
      />
    </>
  );

  const borrarRazonQueja = () => {};
  const pieDialogoBorradoRazonQueja = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoBorradoRazonQueja}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={borrarRazonQueja}
      />
    </>
  );
  const pieDialogoEdicionRazonQueja = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoEdicionRazonQueja}
      />
      <Button label="Guardar" icon="pi pi-check" />
    </>
  );
  const listaElementoDataView = (dato) => {
    return (
      <>
        <div className="col-12">
          <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div className="flex flex-column md:flex-row align-items-center p-3">
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
                  verRazonQueja(dato);
                }}
              />
              <Button
                icon="pi pi-pencil"
                onClick={() => edicionRazonQueja(dato)}
              />
              <Button
                icon="pi pi-trash"
                onClick={() => borradoRazonQueja(dato)}
              />
            </span>
          </div>
        </div>
      </>
    );
  };
  return (
    <React.Fragment>
      <div className="card">
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
          <h5>
            Administración de Razones de Queja{" "}
            <i className="pi pi-plus icn" onClick={insercionRazonQueja} />
          </h5>
          <div className="filters">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
              <Dropdown
                optionLabel="nombre"
                placeholder="Filtro por Estado"
                options={valorFiltroEstado}
                emptyMessage="Activo Inactivo"
              />
            </span>
          </div>
        </div>
        <DataView
          value={valorDataview}
          paginator
          rows={5}
          itemTemplate={listaElementoDataView}
        ></DataView>
      </div>
      <Dialog
        visible={dialogoInsercionRazonQueja}
        style={{ width: "450px" }}
        header="Nueva Razon de Queja"
        modal
        className="p-fluid"
        footer={pieDialogoInsercionRazonQueja}
        onHide={ocultarDialogoInsercionRazonQueja}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            onChange={(e) => cambioEntrada(e, "nombre")}
            required
            autoFocus
            className={classNames({ "p-invalid": envio && !razonQueja.nombre })}
          />
          {envio && !razonQueja.nombre && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            autoResize
            onChange={(e) => cambioEntrada(e, "descripcion")}
            required
            className={classNames({ "p-invalid": envio && !razonQueja.descripcion })}
          />
          {envio && !razonQueja.descripcion && (
            <small className="p-invalid">La descripcion es requerida.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={dialogoVistaRazonQueja}
        style={{ width: "450px" }}
        header="Visualizar Razon Queja"
        modal
        className="p-fluid"
        footer={pieDialogoVistaRazonQueja}
        onHide={ocultarDialogoVistaRazonQueja}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={razonQueja.nombre}
            onChange={(e) => cambioEntrada(e, "nombre")}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            autoResize
            value={razonQueja.descripcion}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="estado">Estado</label>
          <InputText id="estado" value={razonQueja.estado} readOnly />
        </div>
        <div className="field">
          <label htmlFor="usuarioCreacion">Responsable de Registro</label>
          <InputText
            id="usuarioCreacion"
            value={razonQueja.idUsuarioRegistro}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="fechaCreacion">Fecha de Registro</label>
          <InputText id="fechaCreacion" value={razonQueja.fechaRegistro} readOnly />
        </div>
        <div className="field">
          <label htmlFor="fechaActualizacion">
            Fecha de Ultima Modificación
          </label>
          <InputText
            id="fechaActualizacion"
            value={razonQueja.fechaModificacion}
            readOnly
          />
        </div>
      </Dialog>
      <Dialog
        visible={dialogoEdicionRazonQueja}
        style={{ width: "450px" }}
        header="Editar Razon de Queja"
        modal
        className="p-fluid"
        footer={pieDialogoEdicionRazonQueja}
        onHide={ocultarDialogoEdicionRazonQueja}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={razonQueja.nombre}
            onChange={(e) => cambioEntrada(e, "nombre")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            autoResize
            value={razonQueja.descripcion}
            onChange={(e) => cambioEntrada(e, "descripcion")}
            required
          />
        </div>
      </Dialog>
      <Dialog
        visible={dialogoBorradoRazonQueja}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={pieDialogoBorradoRazonQueja}
        onHide={ocultarDialogoBorradoRazonQueja}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>
            Estás seguro de que desea elimiar la razon <b>{razonQueja.nombre}</b>?
          </span>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(RazonQueja, comparisonFn);
