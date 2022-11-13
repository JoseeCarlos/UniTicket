import React, { useState, useEffect,useRef } from "react";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { DataView } from "primereact/dataview";
import { ListBox } from "primereact/listbox";
import { Divider } from "primereact/divider";
import { PickList } from "primereact/picklist";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { RequisitoServicio } from "../servicios/RequisitoServicio";
import { Toast } from "primereact/toast";
const Requisito = () => {
  let requisitoVacio = {
    IdRequisito: null,
    Nombre: "",
    Descripcion: "",
    IdUsuarioRegistro: 1,
    Estado: "",
    FechaRegistro: "",
    FechaModificacion: "",
  };
  const toast = useRef(null);
  const [envio, establecerEnvio] = useState(false);
  const [valorDataview, establecerValorDataview] = useState(null);
  const [valorFiltroEstado, establecerValorFiltroEstado] = useState(null);
  const [requisito, establecerRequisito] = useState(requisitoVacio);
  const [dialogoInsercionRequisito, establecerDialogoInsercionRequisito] =
    useState(false);
  const [dialogoVistaRequisito, establecerDialogoVistaRequisito] =
    useState(false);
  const [dialogoEdicionRequisito, establecerDialogoEdicionRequisito] =
    useState(false);
  const [dialogoBorradoRequisito, establecerDialogoBorradoRequisito] =
    useState(false);
  
  const requisitoServicio = new RequisitoServicio();

  useEffect(() => {
    requisitoServicio.obtenerRequisitos().then((datos) => {
      console.log(datos);
      establecerValorDataview(datos);
    });

    establecerValorFiltroEstado([
      { id: 1, nombre: "Activo" },
      { id: 0, nombre: "Inactivo" },
    ]);
    // establecerValorDataview([
    //   {
    //     idRequisito: 1,
    //     nombre: "Carnet",
    //     descripcion: "Documento de identificacion personal",
    //     estado: "Activo",
    //   },
    //   {
    //     idRequisito: 2,
    //     nombre: "Titulo Bachiller",
    //     descripcion: "Titulo de culminacion de educacion",
    //     estado: "Activo",
    //   },
    //   {
    //     idRequisito: 1,
    //     nombre: "Carnet de estudiante",
    //     descripcion: "Documento de identificacion estudiantil",
    //     estado: "Activo",
    //   },
    // ]);
  }, []);
  const insercionRequisito = () => {
    establecerRequisito(requisitoVacio);
    establecerDialogoInsercionRequisito(true);
  };
  const vistaRequisito = (requisito) => {
    establecerRequisito({ ...requisito });
    establecerDialogoVistaRequisito(true);
  };
  const editarRequisito = (requisito) => {
    establecerRequisito({ ...requisito });
    establecerDialogoEdicionRequisito(true);
  };
  const borrarRequisito = (requisito) => {
    establecerRequisito({ ...requisito });
    establecerDialogoBorradoRequisito(true);
  };

  const ocultarDialogoInsercionRequisito = () => {
    establecerEnvio(false);
    establecerDialogoInsercionRequisito(false);
  };
  const ocultarDialogoVistaRequisito = () => {
    establecerEnvio(false);
    establecerDialogoVistaRequisito(false);
  };
  const ocultarDialogoEdicionRequisito = () => {
    establecerEnvio(false);
    establecerDialogoEdicionRequisito(false);
  };
  const ocultarDialogoBorradoRequisito = () => {
    establecerEnvio(false);
    establecerDialogoBorradoRequisito(false);
  };

  const guardarRequisito = () => {
    console.log(requisito);
    if (requisito.IdRequisito) {
      requisitoServicio
        .actualizarRequisito(requisito)
        .then((datos) => {
          console.log(datos)
          if(datos.status === 200){
            toast.current.show({severity:'success', summary: 'Exito', detail:'Requisito actualizado', life: 3000});
            requisitoServicio.obtenerRequisitos().then((datos) => {
              console.log(datos);
              establecerValorDataview(datos);
            });
          
          }else{
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Error al actualizar requisito', life: 3000});
          }
        });
    }
    else {
      requisitoServicio
        .crearRequisito(requisito)
        .then((datos) => {
          console.log(datos);
          if(datos.status === 200){
            toast.current.show({severity:'success', summary: 'Exito', detail:'Requisito creado', life: 3000});
            requisitoServicio.obtenerRequisitos().then((datos) => {
              console.log(datos);
              establecerValorDataview(datos);
            });

          }else{
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Error al crear requisito', life: 3000});
          }
        });

    }
    establecerEnvio(true);
    establecerDialogoInsercionRequisito(false);
    establecerDialogoEdicionRequisito(false);
  
  }

  const eliminarRequisito = () => {
    requisitoServicio
      .eliminarRequisito(requisito.IdRequisito)
      .then((datos) => {
        console.log(datos);
        if(datos.status === 200){
          toast.current.show({severity:'success', summary: 'Exito', detail:'Requisito eliminado', life: 3000});
          requisitoServicio.obtenerRequisitos().then((datos) => {
            console.log(datos);
            establecerValorDataview(datos);
          });
        }else{
          toast.current.show({severity: 'error', summary: 'Error', detail: 'Error al eliminar requisito', life: 3000});
        }
      });
    establecerEnvio(true);
    establecerDialogoBorradoRequisito(false);
  };

  const pieDialogoInsercionRequisito = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoInsercionRequisito}
      />
      <Button label="Guardar" onClick={guardarRequisito} icon="pi pi-check" />
    </>
  );
  const pieDialogoVistaRequisito = (
    <Button
      label="Salir"
      icon="pi pi-times"
      className="p-button-text"
      onClick={ocultarDialogoVistaRequisito}
    />
  );
  const pieDialogoEdicionRequisito = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoEdicionRequisito}
      />
      <Button label="Guardar" onClick={guardarRequisito} icon="pi pi-check" />
    </>
  );
  const pieDialogoBorradoRequisito = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoBorradoRequisito}
      />
      <Button label="Si" onClick={eliminarRequisito} icon="pi pi-check" />
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
                <div className="mb-3">{dato.Estado}</div>
              </div>
            </div>
            <span className="p-buttonset">
              <Button icon="pi pi-eye" onClick={() => vistaRequisito(dato)} />
              <Button
                icon="pi pi-pencil"
                onClick={() => editarRequisito(dato)}
              />
              <Button
                icon="pi pi-trash"
                onClick={() => borrarRequisito(dato)}
              />
            </span>
          </div>
        </div>
      </>
    );
  };
  const cambioEntrada = (e, nombre) => {
    const valor = (e.target && e.target.value) || "";
    let _requisito = { ...requisito };
    _requisito[`${nombre}`] = valor;
    establecerRequisito(_requisito);
  };
  return (
    <React.Fragment>
      <div className="card">
      <Toast ref={toast} />
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
          <h5>
            Administración de Requisitos{" "}
            <i className="pi pi-plus icn" onClick={insercionRequisito} />
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
          emptyMessage="No se encontraron Requisitos"
        ></DataView>
      </div>
      <Dialog
        visible={dialogoInsercionRequisito}
        header="Nuevo Requisito"
        modal
        className="p-fluid"
        footer={pieDialogoInsercionRequisito}
        onHide={ocultarDialogoInsercionRequisito}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            required
            autoFocus
            onChange={(e) => cambioEntrada(e, "Nombre")}
            className={classNames({ "p-invalid": envio && !requisito.Nombre })}
          />
          {envio && !requisito.Nombre && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            autoResize
            required
            onChange={(e) => cambioEntrada(e, "Descripcion")}
            className={classNames({
              "p-invalid": envio && !requisito.Descripcion,
            })}
          />
          {envio && !requisito.Descripcion && (
            <small className="p-invalid">La descripcion es requerida.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={dialogoVistaRequisito}
        header="Ver Requisito"
        modal
        className="p-fluid"
        footer={pieDialogoVistaRequisito}
        onHide={ocultarDialogoVistaRequisito}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={requisito.Nombre}
            className={classNames({ "p-invalid": envio && !requisito.Nombre })}
          />
          {envio && !requisito.Nombre && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            value={requisito.Descripcion}
            autoResize
            className={classNames({
              "p-invalid": envio && !requisito.Descripcion,
            })}
          />
          {envio && !requisito.Descripcion && (
            <small className="p-invalid">La descripcion es requerida.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={dialogoEdicionRequisito}
        header="Edicion Requisito"
        modal
        className="p-fluid"
        footer={pieDialogoEdicionRequisito}
        onHide={ocultarDialogoEdicionRequisito}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={requisito.Nombre}
            onChange={(e) => cambioEntrada(e, "Nombre")}
            autoFocus
            className={classNames({ "p-invalid": envio && !requisito.nombre })}
          />
          {envio && !requisito.Nombre && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            value={requisito.Descripcion}
            onChange={(e) => cambioEntrada(e, "Descripcion")}
            autoResize
            className={classNames({
              "p-invalid": envio && !requisito.Descripcion,
            })}
          />
          {envio && !requisito.Descripcion && (
            <small className="p-invalid">La descripcion es requerida.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={dialogoBorradoRequisito}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={pieDialogoBorradoRequisito}
        onHide={ocultarDialogoBorradoRequisito}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>
            Estás seguro de que desea elimiar el requisito{" "}
            <b>{requisito.Nombre}</b>?
          </span>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Requisito, comparisonFn);
