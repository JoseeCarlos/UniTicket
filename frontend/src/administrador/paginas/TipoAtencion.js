import React, { useState, useEffect,useRef} from "react";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import classNames from "classnames";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { TipoAtencionServicio } from "../servicios/TipoAtencionServicio";
import { Toast } from "primereact/toast";

const TipoAtencion = () => {
  let tipoAtencionVacio = { 
    IdTipoAtencion: null,
    Nombre: "",
    Importancia: "",
    IdUsuarioRegistro: 1,
    Estado: null,
    FechaRegistro: null,
    FechaModificacion: null,
  };
  
  const toast = useRef(null);
  const [valorDataview, establecerValorDataview] = useState(null);
  const [tipoAtencion, establecerTipoAtencion] = useState(tipoAtencionVacio);
  const [valorFiltroEstado, establecerValorFiltroEstado] = useState(null);
  const [envio, establecerEnvio] = useState(false);
  const [dialogoInsercionTipoAtencion, establecerDialogoInsercionTipoAtencion] =
    useState(false);
  const [dialogoVistaTipoAtencion, establecerDialogoVisualizacionTipoAtencion] =
    useState(false);
  const [dialogoEdicionTipoAtencion, establecerDialogoEdicionTipoAtencion] =
    useState(false);
  const [dialogoBorradoTipoAtencion, establecerDialogoBorradoTipoAtencion] =
    useState(false);
  
  const tipoAtencionServicio = new TipoAtencionServicio();

  useEffect(() => {
    tipoAtencionServicio.obtenerTipoAtencion().then((datos) => {
      console.log(datos);
      establecerValorDataview(datos);
    });
    
    establecerValorFiltroEstado([
      { id: 1, nombre: "Activo" },
      { id: 0, nombre: "Inactivo" },
    ]);
  }, []);
  const insercionTipoAtencion = () => {
    establecerTipoAtencion(tipoAtencion);
    establecerDialogoInsercionTipoAtencion(true);
  };
  const verTipoAtencion = (tipoAtencion) => {
    establecerTipoAtencion({ ...tipoAtencion });
    establecerDialogoVisualizacionTipoAtencion(true);
  };
  const edicionTipoAtencion = (tipoAtencion) => {
    establecerTipoAtencion({ ...tipoAtencion });
    establecerDialogoEdicionTipoAtencion(true);
  };
  const borradoTipoAtencion = (tipoAtencion) => {
    establecerTipoAtencion({ ...tipoAtencion });
    establecerDialogoBorradoTipoAtencion(true);
  };
  const ocultarDialogoInsercionTipoAtencion = () => {
    establecerEnvio(false);
    establecerDialogoInsercionTipoAtencion(false);
  };
  const ocultarDialogoVistaTipoAtencion = () => {
    establecerEnvio(false);
    establecerDialogoVisualizacionTipoAtencion(false);
  };
  const ocultarDialogoEdicionTipoAtencion = () => {
    establecerEnvio(false);
    establecerDialogoEdicionTipoAtencion(false);
  };
  const ocultarDialogoBorradoTipoAtencion = () => {
    establecerEnvio(false);
    establecerDialogoBorradoTipoAtencion(false);
  };
  const cambioEntrada = (e, nombre) => {
    const valor = (e.target && e.target.value) || "";
    let _tipoAtencion = { ...tipoAtencion };
    _tipoAtencion[`${nombre}`] = valor;

    establecerTipoAtencion(_tipoAtencion);
  };
  const cambioEntradaNumero = (e, nombre) => {
    const valor = (e.value) || "";
    let _tipoAtencion = { ...tipoAtencion };
    _tipoAtencion[`${nombre}`] = valor;

    establecerTipoAtencion(_tipoAtencion);
  };

  const guardarTipoAtencion = () =>{
    if(tipoAtencion.Nombre.trim())
    {
      let _tipoAtencion = {...tipoAtencion}
      
      if(tipoAtencion.IdTipoAtencion){
        tipoAtencionServicio.actualizarTipoAtencion(_tipoAtencion).then(datos => {
          if(datos.status === 200){
            toast.current.show({severity: 'success', summary: 'Éxito', detail: 'Tipo de atención actualizado', life: 3000});
            tipoAtencionServicio.obtenerTipoAtencion().then(datos => establecerValorDataview(datos));
          }
          else{
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Tipo de atención no actualizado', life: 3000});
          }
        })
     
      }else{
        tipoAtencionServicio.crearTipoAtencion(tipoAtencion).then(datos =>{
          if(datos.status === 200){
            tipoAtencionServicio.obtenerTipoAtencion().then(datos => establecerValorDataview(datos));
            toast.current.show({ severity: 'success', summary: 'Queja', detail: 'Tipo de Atencion registrada', life: 3000 });

          }else{
            toast.current.show({ severity: 'error', summary: 'Queja', detail: 'Tipo de Atencion no registrada', life: 3000 });
          }
          
        })
      }
    }
    establecerEnvio(true);
    establecerDialogoInsercionTipoAtencion(false);
  }

  const eliminar = () => {
    tipoAtencionServicio.eliminarTipoAtencion(tipoAtencion.IdTipoAtencion).then(datos => {
      if(datos.status === 200){
        tipoAtencionServicio.obtenerTipoAtencion().then(datos => establecerValorDataview(datos));
        toast.current.show({ severity: 'success', summary: 'Queja', detail: 'Tipo de Atencion eliminada', life: 3000 });
      }else{
        toast.current.show({ severity: 'error', summary: 'Queja', detail: 'Tipo de Atencion no eliminada', life: 3000 });
      }
    })
    establecerEnvio(true);
    establecerDialogoBorradoTipoAtencion(false);

  }

  const pieDialogoInsercionTipoAtencion = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoInsercionTipoAtencion}
      />
      <Button label="Guardar" onClick={guardarTipoAtencion} icon="pi pi-check" />
    </>
  );
  const pieDialogoVistaTipoAtencion = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoVistaTipoAtencion}
      />
    </>
  );
  const pieDialogoBorradoTipoAtencion = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoBorradoTipoAtencion}
      />
      <Button label="Si" icon="pi pi-check" onClick={eliminar} className="p-button-text" />
    </>
  );
  const pieDialogoEdicionTipoAtencion = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoEdicionTipoAtencion}
      />
      <Button label="Guardar" onClick={guardarTipoAtencion} icon="pi pi-check" />
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
                <div className="mb-3">{"Nivel de importancia: "+dato.Importancia}</div>
                <div className={`mb-2 estado-${ dato.Estado === 0 ? 'inactico' : 'activo'}`} >{dato.Estado === 0 ? 'INACTIVO' : 'ACTIVO'}</div>
              </div>
            </div>
            <span className="p-buttonset">
              <Button
                icon="pi pi-eye"
                onClick={() => {
                  verTipoAtencion(dato);
                }}
              />
              <Button
                icon="pi pi-pencil"
                onClick={() => edicionTipoAtencion(dato)}
              />
              <Button
                icon="pi pi-trash"
                onClick={() => borradoTipoAtencion(dato)}
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
        <Toast ref={toast} />
          <h5>
            Administración de Tipos de Atencion{" "}
            <i className="pi pi-plus icn" onClick={insercionTipoAtencion} />
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
        visible={dialogoInsercionTipoAtencion}
        style={{ width: "450px" }}
        header="Nuevo Tipo de Atencion"
        modal
        className="p-fluid"
        footer={pieDialogoInsercionTipoAtencion}
        onHide={ocultarDialogoInsercionTipoAtencion}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            onChange={(e) => cambioEntrada(e, "Nombre")}
            required
            autoFocus
            className={classNames({
              "p-invalid": envio && !tipoAtencion.Nombre,
            })}
          />
          {envio && !tipoAtencion.Nombre && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="importancia">Importancia</label>
          <InputNumber
            id="importancia"
            onChange={(e) => cambioEntradaNumero(e, "Importancia")}
            required
            className={classNames({
              "p-invalid": envio && !tipoAtencion.Importancia,
            })}
          />
          {envio && !tipoAtencion.Importancia && (
            <small className="p-invalid">La importancia es requerida.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={dialogoVistaTipoAtencion}
        style={{ width: "450px" }}
        header="Visualizar Tipo de Atencion"
        modal
        className="p-fluid"
        footer={pieDialogoVistaTipoAtencion}
        onHide={ocultarDialogoVistaTipoAtencion}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={tipoAtencion.nombre}
            onChange={(e) => cambioEntrada(e, "nombre")}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="importancia">Importancia</label>
          <InputNumber
            id="importancia"
            value={tipoAtencion.importancia}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="estado">Estado</label>
          <InputText id="estado" value={tipoAtencion.estado} readOnly />
        </div>
        <div className="field">
          <label htmlFor="usuarioCreacion">Responsable de Registro</label>
          <InputText
            id="usuarioCreacion"
            value={tipoAtencion.usuarioCreacion}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="fechaCreacion">Fecha de Registro</label>
          <InputText
            id="fechaCreacion"
            value={tipoAtencion.fechaCreacion}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="fechaActualizacion">
            Fecha de Ultima Modificación
          </label>
          <InputText
            id="fechaActualizacion"
            value={tipoAtencion.fechaActualizacion}
            readOnly
          />
        </div>
      </Dialog>
      <Dialog
        visible={dialogoEdicionTipoAtencion}
        style={{ width: "450px" }}
        header="Editar Tipo de usuario"
        modal
        className="p-fluid"
        footer={pieDialogoEdicionTipoAtencion}
        onHide={ocultarDialogoEdicionTipoAtencion}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={tipoAtencion.Nombre}
            onChange={(e) => cambioEntrada(e, "Nombre")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="importancia">Importancia</label>
          <InputNumber
            id="importancia"
            value={tipoAtencion.Importancia}
            onChange={(e) => cambioEntradaNumero(e, "Importancia")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="estado">Estado</label>
          <InputText
            id="estado"
            value={tipoAtencion.Estado}
            onChange={(e) => cambioEntrada(e, "Estado")}
            required
          />
        </div>
      </Dialog>
      <Dialog
        visible={dialogoBorradoTipoAtencion}
        style={{ width: "450px" }}
        header="Confirmar"
        modal
        footer={pieDialogoBorradoTipoAtencion}
        onHide={ocultarDialogoBorradoTipoAtencion}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>
            Estás seguro de que desea elimiar el tipo de usuario{" "}
            <b>{tipoAtencion.Nombre}</b>?
          </span>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(TipoAtencion, comparisonFn);
