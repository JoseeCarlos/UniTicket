import React, { useState, useEffect, useRef } from "react";
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

const Equipos = () => {
  let equipoVacio = {
    IdEquipo: "",
    Nombre: "",
    IP: "",
    MAC: "",
    Estado: null,
    UsuarioCreacion: '',
    FechaRegistro: null,
    FechaModificacion: null,
  };

  const toast = useRef(null);
  const [valorDataview, establecerValorDataview] = useState(null);
  const [equipo, establecerEquipo] = useState(equipoVacio);
  const [valorFiltroEstado, establecerValorFiltroEstado] = useState(null);
  const [envio, establecerEnvio] = useState(false);
  const [dialogoEquipo, establecerDialogoEquipo] = useState(false);
  const [dialogoVerEquipo, establecerDialogoVerEquipo] = useState(false);
  const [dialogoBorrarEquipo, establecerDialogoBorrarEquipo] = useState(false);

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

  const insercionEquipo = () => {
    establecerEquipo(equipo);
    establecerDialogoEquipo(true);
  };

  const verEquipo = (equipo) => {
    establecerEquipo({ ...equipo });
    establecerDialogoVerEquipo(true);
  };

  const edicionEquipo = (equipo) => {
    establecerEquipo({ ...equipo });
    establecerDialogoEquipo(true);
  };

  const borradoEquipo = (equipo) => {
    establecerEquipo({ ...equipo });
    establecerDialogoBorrarEquipo(true);
  };

  const ocultarDialogoEquipo = () => {
    establecerEnvio(false);
    establecerDialogoEquipo(false);
  };

  const ocultarDialogoVistaEquipo = () => {
    establecerEnvio(false);
    establecerDialogoVerEquipo(false);
  };

  const ocultarDialogoBorradoEquipo = () => {
    establecerEnvio(false);
    establecerDialogoBorrarEquipo(false);
  };

  const cambioEntrada = (e, nombre) => {
    const valor = (e.target && e.target.value) || "";
    let _equipo = { ...equipo };
    _equipo[`${nombre}`] = valor;

    establecerEquipo(_equipo);
  };

  const cambioEntradaNumero = (e, nombre) => {
    const valor = (e.value) || "";
    let _equipo = { ...equipo };
    _equipo[`${nombre}`] = valor;

    establecerEquipo(_equipo);
  };

  const guardarEquipo = () => {
    if (equipo.Nombre.trim()) {
      let _equipo = { ...equipo }

      if (equipo.IdTipoAtencion) {
        tipoAtencionServicio.actualizarTipoAtencion(_equipo).then(datos => {
          if (datos.status === 200) {
            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Equipo Actualizado.', life: 3000 });
            tipoAtencionServicio.obtenerTipoAtencion().then(datos => establecerValorDataview(datos));
          }
          else {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Fallo al actualizar el equipo.', life: 3000 });
          }
        })

      } else {
        tipoAtencionServicio.crearTipoAtencion(equipo).then(datos => {
          if (datos.status === 200) {
            tipoAtencionServicio.obtenerTipoAtencion().then(datos => establecerValorDataview(datos));
            toast.current.show({ severity: 'success', summary: 'Queja', detail: 'Equipo guardado.', life: 3000 });

          } else {
            toast.current.show({ severity: 'error', summary: 'Queja', detail: 'Fallo al guardar el equipo.', life: 3000 });
          }

        })
      }
    }
    establecerEnvio(true);
    establecerDialogoEquipo(false);
  }

  const eliminar = () => {
    tipoAtencionServicio.eliminarTipoAtencion(equipo.IdTipoAtencion).then(datos => {
      if (datos.status === 200) {
        tipoAtencionServicio.obtenerTipoAtencion().then(datos => establecerValorDataview(datos));
        toast.current.show({ severity: 'success', summary: 'Equipo', detail: 'Equipo eliminado.', life: 3000 });
      } else {
        toast.current.show({ severity: 'error', summary: 'Equipo', detail: 'Equipo no eliminado.', life: 3000 });
      }
    })
    establecerEnvio(true);
    establecerDialogoBorrarEquipo(false);
  }

  const pieDialogoEquipo = (
    <>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={ocultarDialogoEquipo} />
      <Button label="Guardar" onClick={guardarEquipo} icon="pi pi-check" />
    </>
  );
  const pieDialogoVistaEquipo = (
    <>
      <Button label="Salir" className="p-button" onClick={ocultarDialogoVistaEquipo} />
    </>
  );
  const pieDialogoBorradoEquipo = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={ocultarDialogoBorradoEquipo} />
      <Button label="Si" icon="pi pi-check" onClick={eliminar} className="p-button" />
    </>
  );

  const listaElementoDataView = (dato) => { 
    let estadoEquipo = dato.Estado === 0 ? 'inactivo' : 'activo';
    return (
      <>
        <div className="col-12">
          <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div className="flex flex-column md:flex-row align-items-center p-3">
              <div className="flex-1 text-center md:text-left">
                <div className="font-bold text-2xl mb-2">{"Equipo: " + dato.Nombre}</div>
                <div className="mb-2">{"IP: " + dato.Importancia}</div>
                <div className="mb-2">{"MAC: " + dato.Importancia}</div>
                <div className={`mb-2 estado-${estadoEquipo}`}>{estadoEquipo}</div>
              </div>
            </div>
            <span className="p-buttonset">
              <Button icon="pi pi-eye" onClick={() => { verEquipo(dato) }} />
              <Button icon="pi pi-pencil" onClick={() => edicionEquipo(dato)} />
              <Button icon="pi pi-trash" onClick={() => borradoEquipo(dato)} />
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
            Administración de Equipos
            <i className="pi pi-plus icn" onClick={insercionEquipo} />
          </h5>

          <div className="filters">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
              <Dropdown optionLabel="nombre" placeholder="Filtro por Estado" options={valorFiltroEstado} emptyMessage="Activo Inactivo" />
            </span>
          </div>
        </div>

        <DataView value={valorDataview} paginator rows={5} itemTemplate={listaElementoDataView} />

      </div>

      <Dialog visible={dialogoEquipo} style={{ width: "450px" }} header="Datos del equipo" modal className="p-fluid"
        footer={pieDialogoEquipo} onHide={ocultarDialogoEquipo}>
        <div className="field">
          <label htmlFor="nombre">Nombre del Equipo:</label>
          <InputText id="nombre" value={equipo.Nombre} onChange={(e) => cambioEntrada(e, "Nombre")} required autoFocus className={classNames({ "p-invalid": envio && !equipo.Nombre })} />
          {envio && !equipo.Nombre && (<small className="p-invalid">El nombre es requerido.</small>)}
        </div>

        <div className="field">
          <label htmlFor="ip">IP:</label>
          <InputText id="ip" value={equipo.IP} onChange={(e) => cambioEntradaNumero(e, "IP")} required className={classNames({ "p-invalid": envio && !equipo.IP })} />
          {envio && !equipo.IP && (<small className="p-invalid">La importancia es requerida.</small>)}
        </div>

        <div className="field">
          <label htmlFor="mac">MAC:</label>
          <InputText id="mac" value={equipo.MAC} onChange={(e) => cambioEntradaNumero(e, "MAC")} required className={classNames({ "p-invalid": envio && !equipo.MAC })} />
          {envio && !equipo.MAC && (<small className="p-invalid">La importancia es requerida.</small>)}
        </div>
      </Dialog>

      <Dialog visible={dialogoVerEquipo} style={{ width: "450px" }} header="Datos del equipo" modal className="p-fluid"
        footer={pieDialogoEquipo} onHide={ocultarDialogoVistaEquipo} >
        <div className="datos-equipo">
          <i className="pi pi-desktop" />
          <span>{equipo.Nombre}</span>
        </div>
        <div className="datos-equipo">
          <i className="pi pi-desktop" />
          <span>{equipo.IP}</span>
        </div>
        <div className="datos-equipo">
          <i className="pi pi-desktop" />
          <span>{equipo.MAC}</span>
        </div>
        <div className="datos-equipo">
          <i className="pi pi-desktop" />
          <span>{equipo.Estado}</span>
        </div>
        <div className="datos-equipo">
          <i className="pi pi-desktop" />
          <span>{equipo.UsuarioCreacion}</span>
        </div>
        <div className="datos-equipo">
          <i className="pi pi-desktop" />
          <span>{equipo.FechaRegistro}</span>
        </div>
        <div className="datos-equipo">
          <i className="pi pi-desktop" />
          <span>{equipo.FechaModificacion}</span>
        </div>
      </Dialog>

      <Dialog visible={dialogoBorrarEquipo} style={{ width: "450px" }} header="Confirmar" modal
        footer={pieDialogoBorradoEquipo} onHide={ocultarDialogoBorradoEquipo}>
        <div className="flex align-items-center justify-content-center">
          <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: "2rem" }} />
          <span>
            Estás seguro de que desea elimiar el equipo:
            <b> {equipo.Nombre}</b>?
          </span>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Equipos, comparisonFn);
