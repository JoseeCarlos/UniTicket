import React, { useEffect, useState, useRef } from "react";
import { Dropdown } from "primereact/dropdown";
import classNames from "classnames";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataView } from "primereact/dataview";
import { TipoUsuarioServicio } from "../servicios/TipoUsuarioServicio";
import { Toast } from "primereact/toast";

const TipoUsuario = () => {
  let tipoUsuarioVacio = {
    IdTipoUsuario: null,
    Nombre: "",
    Descripcion: "",
    IdUsuarioRegistro: 1,
    Estado: "",
    FechaRegistro: "",
    FechaModificacion: ""
  };
  const toast = useRef(null);
  const [valorDataview, establecerValorDataview] = useState(null);
  const [tipoUsuario, establecerTipoUsuario] = useState(tipoUsuarioVacio);
  const [valorFiltroEstado, establecerValorFiltroEstado] = useState(null);
  const [envio, establecerEnvio] = useState(false);
  const [dialogoInsercionTipoUsuario, establecerDialogoInsercionTipoUsuario] =
    useState(false);
  const [dialogoVistaTipoUsuario, establecerDialogoVisualizacionTipoUsuario] =
    useState(false);
  const [dialogoEdicionTipoUsuario, establecerDialogoEdicionTipoUsuario] =
    useState(false);
  const [dialogoBorradoTipoUsuario, establecerDialogoBorradoTipoUsuario] =
    useState(false);
  
  const tipoUsuarioServicio = new TipoUsuarioServicio();
  
  // const tipo = new TipoUsuarioServicio();

  useEffect(() => {
    tipoUsuarioServicio.obtenerTipoUsuario().then((datos) => {
      console.log(datos);
      establecerValorDataview(datos);
    });
    establecerValorFiltroEstado([
      { id: 1, nombre: "Activo" },
      { id: 0, nombre: "Inactivo" },
    ]);
    // establecerValorDataview([
    //   {
    //     idTipoUsuario: 1,
    //     nombre: "Padre",
    //     descripcion: "Padre de estudiante",
    //     estado: "Activo",
    //     fechaCreacion: "10/10/2022",
    //     fechaActualizacion: "12/10/2022",
    //     usuarioCreacion: "Juan Perez",
    //   },
    //   {
    //     idTipoUsuario: 2,
    //     nombre: "Madre",
    //     descripcion: "Madre de estudiante",
    //     estado: "Activo",
    //     fechaCreacion: "10/10/2022",
    //     fechaActualizacion: "12/10/2022",
    //     usuarioCreacion: "Juan Perez",
    //   },
    //   {
    //     idTipoUsuario: 3,
    //     nombre: "Familiar",
    //     descripcion: "Familiar de estudiante",
    //     estado: "Activo",
    //     fechaCreacion: "10/10/2022",
    //     fechaActualizacion: "12/10/2022",
    //     usuarioCreacion: "Juan Perez",
    //   },
    // ]);
  },[]);
  const insercionTipoUsuario = () => {
    establecerTipoUsuario(tipoUsuario);
    establecerDialogoInsercionTipoUsuario(true);
  };
  const verTipoUsuario = (tipoUsuario) => {
    establecerTipoUsuario({ ...tipoUsuario });
    establecerDialogoVisualizacionTipoUsuario(true);
  };
  const edicionTipoUsuario = (tipoUsuario) => {
    establecerTipoUsuario({ ...tipoUsuario });
    establecerDialogoEdicionTipoUsuario(true);
  };
  const borradoTipoUsuario = (tipoUsuario) => {
    establecerTipoUsuario({ ...tipoUsuario });
    establecerDialogoBorradoTipoUsuario(true);
  };
  const ocultarDialogoInsercionTipoUsuario = () => {
    establecerEnvio(false);
    establecerDialogoInsercionTipoUsuario(false);
  };
  const ocultarDialogoVistaTipoUsuario = () => {
    establecerEnvio(false);
    establecerDialogoVisualizacionTipoUsuario(false);
  };
  const ocultarDialogoEdicionTipoUsuario = () => {
    establecerEnvio(false);
    establecerDialogoEdicionTipoUsuario(false);
  };
  const ocultarDialogoBorradoTipoUsuario = () => {
    establecerEnvio(false);
    establecerDialogoBorradoTipoUsuario(false);
  };
  const cambioEntrada = (e, nombre) => {
    const valor = (e.target && e.target.value) || "";
    let _tipoUsuario = { ...tipoUsuario };
    _tipoUsuario[`${nombre}`] = valor;

    establecerTipoUsuario(_tipoUsuario);
  };

  const guardarTipoUsuario = () => {
      console.log(tipoUsuario);
      let _tipoUsuario = {...tipoUsuario}
      
      if(tipoUsuario.idTipoUsuario){
        console.log("editar");
        tipoUsuarioServicio.actualizarTipoUsuario(_tipoUsuario).then(datos => {
          console.log(datos);
          if(datos.status === 200){
            toast.current.show({severity: 'success', summary: 'Éxito', detail: 'Tipo de usuario actualizado', life: 3000});
            tipoUsuarioServicio.obtenerTipoUsuario().then(datos => {
              establecerValorDataview(datos);
            }
            );
          }
          else{
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Error al actualizar el tipo de usuario', life: 3000});
          }
        })

     
      }else{
        console.log("crear");
        tipoUsuarioServicio.crearTipoUsuario(tipoUsuario).then(datos => {
          console.log(datos);
          if(datos.status === 200){
            toast.current.show({severity: 'success', summary: 'Éxito', detail: 'Tipo de usuario insertado', life: 3000});
            tipoUsuarioServicio.obtenerTipoUsuario().then(datos => {
              establecerValorDataview(datos);
            }
            );
          }
          else{
            toast.current.show({severity: 'error', summary: 'Error', detail: 'Error al insertar el tipo de usuario', life: 3000});
          }
        })
      }
  }
  const eliminarTipoUsuario = () => {
    tipoUsuarioServicio.eliminarTipoUsuario(tipoUsuario.idTipoUsuario).then(datos => {
      console.log(datos);
      if(datos.status === 200){
        toast.current.show({severity: 'success', summary: 'Éxito', detail: 'Tipo de usuario eliminado', life: 3000});
        tipoUsuarioServicio.obtenerTipoUsuario().then(datos => {
          establecerValorDataview(datos);
        }
        );
      }
      else{
        toast.current.show({severity: 'error', summary: 'Error', detail: 'Error al eliminar el tipo de usuario', life: 3000});
      }
    })
  }


  const pieDialogoInsercionTipoUsuario = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoInsercionTipoUsuario}
      />
      <Button label="Guardar" onClick={guardarTipoUsuario} icon="pi pi-check" />
    </>
  );
  const pieDialogoVistaTipoUsuario = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoVistaTipoUsuario}
      />
    </>
  );
  const pieDialogoBorradoTipoUsuario = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoBorradoTipoUsuario}
      />
      <Button label="Si" icon="pi pi-check" onClick={eliminarTipoUsuario} className="p-button-text" />
    </>
  );
  const pieDialogoEdicionTipoUsuario = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoEdicionTipoUsuario}
      />
      <Button label="Guardar" onClick={guardarTipoUsuario} icon="pi pi-check" />
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
                <div className={`mb-2 estado-${ dato.Estado === 0 ? 'inactico' : 'activo'}`}>{dato.Estado === 0 ? 'INACTIVO' : 'ACTIVO'}</div>
              </div>
            </div>
            <span className="p-buttonset">
              <Button
                icon="pi pi-eye"
                onClick={() => {
                  verTipoUsuario(dato);
                }}
              />
              <Button
                icon="pi pi-pencil"
                onClick={() => edicionTipoUsuario(dato)}
              />
              <Button
                icon="pi pi-trash"
                onClick={() => borradoTipoUsuario(dato)}
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
      <Toast ref={toast} />
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
          <h5>
            Administración de Tipos de Usuario{" "}
            <i className="pi pi-plus icn" onClick={insercionTipoUsuario} />
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
        visible={dialogoInsercionTipoUsuario}
        style={{ width: "450px" }}
        header="Nuevo Tipo de Usuario"
        modal
        className="p-fluid"
        footer={pieDialogoInsercionTipoUsuario}
        onHide={ocultarDialogoInsercionTipoUsuario}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            onChange={(e) => cambioEntrada(e, "Nombre")}
            required
            autoFocus
            className={classNames({
              "p-invalid": envio && !tipoUsuario.Nombre,
            })}
          />
          {envio && !tipoUsuario.Nombre && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            autoResize
            onChange={(e) => cambioEntrada(e, "Descripcion")}
            required
            className={classNames({
              "p-invalid": envio && !tipoUsuario.Descripcion,
            })}
          />
          {envio && !tipoUsuario.Descripcion && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
      </Dialog>
      <Dialog
        visible={dialogoVistaTipoUsuario}
        style={{ width: "450px" }}
        header="Visualizar Tipo de usuario"
        modal
        className="p-fluid"
        footer={pieDialogoVistaTipoUsuario}
        onHide={ocultarDialogoVistaTipoUsuario}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={tipoUsuario.Nombre}
            onChange={(e) => cambioEntrada(e, "Nombre")}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            autoResize
            value={tipoUsuario.Descripcion}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="estado">Estado</label>
          <InputText id="estado" value={tipoUsuario.Estado} readOnly />
        </div>
        <div className="field">
          <label htmlFor="usuarioCreacion">Responsable de Registro</label>
          <InputText
            id="usuarioCreacion"
            value={tipoUsuario.usuarioCreacion}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="fechaCreacion">Fecha de Registro</label>
          <InputText
            id="fechaCreacion"
            value={tipoUsuario.fechaCreacion}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="fechaActualizacion">
            Fecha de Ultima Modificación
          </label>
          <InputText
            id="fechaActualizacion"
            value={tipoUsuario.fechaActualizacion}
            readOnly
          />
        </div>
      </Dialog>
      <Dialog
        visible={dialogoEdicionTipoUsuario}
        style={{ width: "450px" }}
        header="Editar Tipo de usuario"
        modal
        className="p-fluid"
        footer={pieDialogoEdicionTipoUsuario}
        onHide={ocultarDialogoEdicionTipoUsuario}
      >
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <InputText
            id="nombre"
            value={tipoUsuario.Nombre}
            onChange={(e) => cambioEntrada(e, "Nombre")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            autoResize
            value={tipoUsuario.Descripcion}
            onChange={(e) => cambioEntrada(e, "Descripcion")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="estado">Estado</label>
          <InputText
            id="estado"
            value={tipoUsuario.Estado}
            onChange={(e) => cambioEntrada(e, "Estado")}
            required
          />
        </div>
      </Dialog>
      <Dialog
        visible={dialogoBorradoTipoUsuario}
        style={{ width: "450px" }}
        header="Confirmar"
        modal
        footer={pieDialogoBorradoTipoUsuario}
        onHide={ocultarDialogoBorradoTipoUsuario}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>
            Estás seguro de que desea elimiar el tipo de usuario{" "}
            <b>{tipoUsuario.Nombre}</b>?
          </span>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(TipoUsuario, comparisonFn);
