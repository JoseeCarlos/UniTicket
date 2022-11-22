import React, { useState, useEffect,useRef } from "react";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea"; 
import { RazonQuejaServicio } from "../servicios/RazonQuejaServicio";

const RazonQueja = () => {
  let razonQuejaVacia = {
    IdRazonQuejaVacia: null,
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
  const [razonQueja, establecerRazonQueja] = useState(razonQuejaVacia);
  const [dialogoInsercionRazonQueja, establecerDialogoInsercionRazonQueja] =
    useState(false);
  const [dialogoVistaRazonQueja, establecerDialogoVistaRazonQueja] =
    useState(false);
  const [dialogoEdicionRazonQueja, establecerDialogoEdicionRazonQueja] =
    useState(false);
  const [dialogoBorradoRazonQueja, establecerDialogoBorradoRazonQueja] =
    useState(false);

  const razonQuejaServicio =new RazonQuejaServicio();
  useEffect(() => {
    razonQuejaServicio.obtenerRazonQuejas().then((datos) =>{
      console.log(datos);
      establecerValorDataview(datos);
    })
    establecerValorFiltroEstado([
      { id: 1, nombre: "Activo" },
      { id: 0, nombre: "Inactivo" },
    ]);
    // establecerValorDataview([
    //   {
    //     idRazonQueja: 1,
    //     nombre: "Malos tratos",
    //     descripcion: "Mala actitud por parte del empleado",
    //     estado: "Activo",
    //   },
    //   {
    //     idRazonQueja: 2,
    //     nombre: "Largos tiempos de espera",
    //     descripcion: "Mucho tiempo en espera para ser atendido",
    //     estado: "Activo",
    //   },
    // ]);
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

  const guardarRazonQueja = () => {
    establecerEnvio(true);
    console.log(razonQueja);
    if(razonQueja.IdRazonQueja){
      razonQuejaServicio.actualizarRazonQueja(razonQueja).then((datos) =>{
        console.log(datos);
        if(datos.status===200){
          toast.current.show({severity:'success', summary: 'Éxito', detail: 'Razón de queja actualizada', life: 3000});
          razonQuejaServicio.obtenerRazonQuejas().then((datos) =>{
            establecerValorDataview(datos);
          }
          )
        }else{
          toast.current.show({severity:'error', summary: 'Error', detail: 'Razón de queja no actualizada', life: 3000});
        }
      })
    }else{
      razonQuejaServicio.crearRazonQueja(razonQueja).then((datos) =>{
        if(datos.status === 200){
          toast.current.show({severity : 'success', summary : 'Exito', detail : 'Razon de queja creada', life : 3000});
          razonQuejaServicio.obtenerRazonQuejas().then((datos) =>{
            establecerValorDataview(datos);
          })
        }else{
          toast.current.show({severity : 'error', summary : 'Error', detail : 'Razon de queja no creada', life : 3000});
        }

      
      })

    }
    establecerEnvio(false);
    establecerDialogoInsercionRazonQueja(false);
    establecerDialogoEdicionRazonQueja(false);
  }
  const eliminarRazonQueja = () => {
    establecerEnvio(true);
    razonQuejaServicio.eliminarRazonQueja(razonQueja.IdRazonQueja).then((datos) =>{
      if(datos.status === 200){
        toast.current.show({severity : 'success', summary : 'Exito', detail : 'Razon de queja eliminada', life : 3000});
        razonQuejaServicio.obtenerRazonQuejas().then((datos) =>{
          establecerValorDataview(datos);
        })
      }else{
        toast.current.show({severity : 'error', summary : 'Error', detail : 'Razon de queja no eliminada', life : 3000});
      }
    } 
    )
    establecerEnvio(false);
    establecerDialogoBorradoRazonQueja(false);
  };
  
  const pieDialogoInsercionRazonQueja = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoInsercionRazonQueja}
      />
      <Button label="Guardar" onClick={guardarRazonQueja} icon="pi pi-check" />
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
        onClick={eliminarRazonQueja}
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
      <Button label="Guardar" onClick={guardarRazonQueja} icon="pi pi-check" />
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
                <div className="mb-3">{dato.Estado === 0 ? 'ACTIVO' : 'INACTIVO'}</div>
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
      <Toast ref={toast} />
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
            onChange={(e) => cambioEntrada(e, "Nombre")}
            required
            autoFocus
            className={classNames({ "p-invalid": envio && !razonQueja.Nombre })}
          />
          {envio && !razonQueja.Nombre && (
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
            className={classNames({ "p-invalid": envio && !razonQueja.Descripcion })}
          />
          {envio && !razonQueja.Descripcion && (
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
            value={razonQueja.Nombre}
            onChange={(e) => cambioEntrada(e, "Nombre")}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            autoResize
            value={razonQueja.Descripcion}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="estado">Estado</label>
          <InputText id="estado" value={razonQueja.Estado} readOnly />
        </div>
        <div className="field">
          <label htmlFor="usuarioCreacion">Responsable de Registro</label>
          <InputText
            id="usuarioCreacion"
            value={razonQueja.IdUsuarioRegistro}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="fechaCreacion">Fecha de Registro</label>
          <InputText id="fechaCreacion" value={razonQueja.FechaRegistro} readOnly />
        </div>
        <div className="field">
          <label htmlFor="fechaActualizacion">
            Fecha de Ultima Modificación
          </label>
          <InputText
            id="fechaActualizacion"
            value={razonQueja.FechaModificacion}
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
            value={razonQueja.Nombre}
            onChange={(e) => cambioEntrada(e, "Nombre")}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            autoResize
            value={razonQueja.Descripcion}
            onChange={(e) => cambioEntrada(e, "Descripcion")}
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
            Estás seguro de que desea elimiar la razon <b>{razonQueja.Nombre}</b>?
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
