import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { DataView } from "primereact/dataview";
import { ListBox } from "primereact/listbox";
import { Divider } from "primereact/divider";
import { PickList } from "primereact/picklist";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { TramiteServicio } from "../servicios/TramiteServicio";

const Tramite = () => {
  let tramiteVacio = {
    idTramite: null,
    nombre: "",
    descripcion: "",
    idArea: null,
    idUsuarioRegistro: null,
    estado: "",
    fechaRegistro: "",
    fechaModificacion: "",
  };
  const [fuente, establecerFuente] = useState([]);
  const [objetivo, establecerObjetivo] = useState([]);
  const [valorDataview, establecerValorDataview] = useState(null);
  const [envio, establecerEnvio] = useState(false);
  const [tramite, establecerTramite] = useState(tramiteVacio);
  const [dialogoInsercionTramite, establecerDialogoInsercionTramite] =
    useState(false);
  const [dialogoVistaTramite, establecerDialogoVisualizacionTramite] =
    useState(false);
  const [dialogoEdicionTramite, establecerDialogoEdicionTramite] =
    useState(false);
  const [dialogoBorradoTramite, establecerDialogoBorradoTramite] =
    useState(false);
  
  const tramiteServicio = new TramiteServicio();

  useEffect(() => {
    tramiteServicio.obtenerTramites().then((datos) => {
      console.log(datos);
      establecerValorDataview(datos);
    });
    establecerFuente([
      {
        idRequisito: 1,
        nombre: "Carnet de identidad",
        descripcion: "Carnet de identificacion personal",
      },
      {
        idRequisito: 2,
        nombre: "Titulo Bachiller",
        descripcion: "Titulo de culminacion de educacion",
      },
      {
        idRequisito: 3,
        nombre: "Carnet de estudiante",
        descripcion: "Carnet de identificacion de estudiante",
      },
    ]);
    // establecerValorDataview([
    //   {
    //     idTramite: 1,
    //     nombre: "Inscripcion",
    //     descripcion: "Tramite para inscripcion de estudiantes",
    //     idArea: "Tramites",
    //     idUsuarioRegistro: 1,
    //     estado: "Activo",
    //     fechaRegistro: "01/10/2022",
    //     fechaModificacion: "01/11/2022",
    //     requisitos: [
    //       { idRequisito: 1, nombre: "Carnet de identidad" },
    //       { idRequisito: 2, nombre: "Titulo Bachiller" },
    //     ],
    //   },
    //   {
    //     idTramite: 2,
    //     nombre: "Certificado de estudiante regular",
    //     descripcion: "Tramite para certificado de estudiante regular",
    //     idArea: "Tramites",
    //     idUsuarioRegistro: 1,
    //     estado: "Activo",
    //     fechaRegistro: "01/10/2022",
    //     fechaModificacion: "01/11/2022",
    //     requisitos: [
    //       { idRequisito: 1, nombre: "Carnet de identidad" },
    //       { idRequisito: 3, nombre: "Carnet de estudiante" },
    //     ],
    //   },
    // ]);
  }, []);
  const insercionTramite = () => {
    establecerTramite({ tramiteVacio });
    establecerDialogoInsercionTramite(true);
  };
  const verTramite = (tramite) => {
    establecerTramite({ ...tramite });
    establecerDialogoVisualizacionTramite(true);
  };
  const editarTramite = (tramite) => {
    establecerTramite({ ...tramite });
    establecerDialogoEdicionTramite(true);
  };
  const borrarTramite = (tramite) => {
    establecerTramite({ ...tramite });
    establecerDialogoBorradoTramite(true);
  };
  const ocultarDialogoInsercionTramite = () => {
    establecerEnvio(false);
    establecerDialogoInsercionTramite(false);
  };
  const ocultarDialogoVistaTramite = () => {
    establecerEnvio(false);
    establecerDialogoVisualizacionTramite(false);
  };
  const ocultarDialogoEdicionTramite = () => {
    establecerEnvio(false);
    establecerDialogoEdicionTramite(false);
  };
  const ocultarDialogoBorradoTramite = () => {
    establecerEnvio(false);
    establecerDialogoBorradoTramite(false);
  };
  const pieDialogoInsercionTramite = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoInsercionTramite}
      />
      <Button label="Guardar" icon="pi pi-check" />
    </>
  );
  const pieDialogoVistaTramite = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoVistaTramite}
      />
      <Button label="Guardar" icon="pi pi-check" />
    </>
  );
  const pieDialogoEdicionTramite = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoEdicionTramite}
      />
      <Button label="Guardar" icon="pi pi-check" />
    </>
  );
  const pieDialogoBorradoTramite = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoBorradoTramite}
      />
      <Button label="Si" icon="pi pi-check" />
    </>
  );
  const listaElementoDataView = (dato) => {
    return (
      <>
        <div className="col-12">
          <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div className="flex flex-column md:flex-row align-items-center p-3">
              <div className="flex-1 text-center md:text-left">
                <div className="font-bold text-2xl">{dato.Nombre}</div>
                <div className="mb-3">{dato.Descripcion}</div>
                <div className="mb-3">{dato.Estado === 0 ? 'INACTIVO' : 'ACTIVO'}</div>
              </div>
            </div>
            <span className="p-buttonset">
              <Button icon="pi pi-eye" onClick={() => verTramite(dato)} />
              <Button icon="pi pi-pencil" onClick={() => editarTramite(dato)} />
              <Button icon="pi pi-trash" onClick={() => borrarTramite(dato)} />
            </span>
          </div>
        </div>
      </>
    );
  };
  const baseRequisitos = (dato) => {
    return (
      <div>
        <h5>{dato.nombre}</h5>
        <p>{dato.descripcion}</p>
      </div>
    );
  };
  const enCambio = (e) => {
    establecerFuente(e.source);
    establecerObjetivo(e.target);
  };
  return (
    <React.Fragment>
      <div className="card">
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
          <h5>
            Administración De Tramites{" "}
            <i className="pi pi-plus icn" onClick={insercionTramite} />
          </h5>
          <div className="filters">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
              <Dropdown optionLabel="nombre" placeholder="Filtro por Areas" 
              emptyMessage="No se encontraron areas"/>
            </span>
          </div>
        </div>
        <DataView
          value={valorDataview}
          paginator
          rows={5}
          itemTemplate={listaElementoDataView}
          emptyMessage="No se encontraron Tramites"
        ></DataView>
      </div>
      <Dialog
        visible={dialogoInsercionTramite}
        header="Nuevo Tramite"
        modal
        className="p-fluid"
        footer={pieDialogoInsercionTramite}
        onHide={ocultarDialogoInsercionTramite}
      >
        <div className="flex flex-column md:flex-row">
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="nombre">Nombre</label>
              <InputText id="nombre" />
            </div>
            <div className="field">
              <label htmlFor="descripcion">Descripción</label>
              <InputTextarea id="descripcion" autoResize />
            </div>
            <div className="field">
              <label htmlFor="area">Area</label>
              <Dropdown id="area" emptyMessage="No se encontraron areas" />
            </div>
          </div>
          <Divider layout="vertical" />
          <div className="p-fluid">
            <PickList
              showSourceControls={false}
              showTargetControls={false}
              source={fuente}
              target={objetivo}
              itemTemplate={baseRequisitos}
              sourceHeader="Requisitos Disponibles"
              targetHeader="Requisitos Seleccionados"
              sourceStyle={{ height: "342px" }}
              targetStyle={{ height: "342px" }}
              onChange={enCambio}
              filterBy="nombre"
              sourceFilterPlaceholder="Buscar Requisitos Disponibles"
              targetFilterPlaceholder="Buscar Requisitos Seleccionados"
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={dialogoVistaTramite}
        header="Ver Tramite"
        modal
        footer={pieDialogoVistaTramite}
        onHide={ocultarDialogoVistaTramite}
      >
        <div className="flex flex-column md:flex-row">
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="nombre">Nombre</label>
              <InputText id="nombre" value={tramite.Nombre} />
            </div>
            <div className="field">
              <label htmlFor="descripcion">Descripción</label>
              <InputTextarea
                id="descripcion"
                value={tramite.Descripcion}
                autoResize
              />
            </div>
            <div className="field">
              <label htmlFor="area">Area</label>
              <InputText id="area" value={tramite.IdArea} />
            </div>
          </div>
          <Divider layout="vertical" />
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="requisitos">Requisitos</label>
              <ListBox
                id="requisitos"
                options={tramite.Requisitos}
                optionLabel="Nombre"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={dialogoEdicionTramite}
        header="Editar Tramite"
        modal
        className="p-fluid"
        footer={pieDialogoEdicionTramite}
        onHide={ocultarDialogoEdicionTramite}
      >
        <div className="flex flex-column md:flex-row">
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="nombre">Nombre</label>
              <InputText id="nombre" />
            </div>
            <div className="field">
              <label htmlFor="descripcion">Descripción</label>
              <InputTextarea id="descripcion" autoResize />
            </div>
            <div className="field">
              <label htmlFor="area">Area</label>
              <Dropdown id="area" emptyMessage="No se encontraron areas" />
            </div>
          </div>
          <Divider layout="vertical" />
          <div className="p-fluid">
            <PickList
              showSourceControls={false}
              showTargetControls={false}
              source={fuente}
              target={objetivo}
              itemTemplate={baseRequisitos}
              sourceHeader="Requisitos Disponibles"
              targetHeader="Requisitos Seleccionados"
              sourceStyle={{ height: "342px" }}
              targetStyle={{ height: "342px" }}
              onChange={enCambio}
              filterBy="nombre"
              sourceFilterPlaceholder="Buscar Requisitos Disponibles"
              targetFilterPlaceholder="Buscar Requisitos Seleccionados"
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={dialogoBorradoTramite}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={pieDialogoBorradoTramite}
        onHide={ocultarDialogoBorradoTramite}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>
            Estás seguro de que desea elimiar el tramite <b>{tramite.nombre}</b>
            ?
          </span>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Tramite, comparisonFn);
