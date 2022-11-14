import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import classNames from "classnames";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataView } from "primereact/dataview";
const Bitacora = () => {
  let bitacoraVacio = {
    idBitacora: null,
    descripcion: "",
    fechaCreacion: "",
    idUsuarioCreacion: "",
  };
  const [valorDataview, establecerValorDataview] = useState(null);
  const [bitacora, establecerBitacora] = useState(bitacoraVacio);
  const [valorFiltroTabla, establecerValorFiltroTabla] = useState(null);
  const [envio, establecerEnvio] = useState(false);
  const [dialogoVistaBitacora, establecerDialogoVisualizacionBitacora] =
    useState(false);
  useEffect(() => {
    establecerValorFiltroTabla([
        { id: 1, nombre: "Area" },
        { id: 2, nombre: "LugarAtencion" },
        { id: 3, nombre: "RazonQueja" },
        { id: 4, nombre: "Mesa" },
        { id: 5, nombre: "Tramite" },
        { id: 6, nombre: "Raquisito" },
    ]);
    establecerValorDataview([
      {
        idBitacora: 1,
        accion: "Modificacion",
        descripcion: "Se modifico la tabla razon queja con los datos: nombre: Malos Tratos descripcion: Mala actitud del empleado Estado: Activo, a los datos: nombre: Malos Tratos Mala actitud del empleado Estado: Inactivo",
        fechaCreacion: "10/10/2022",
        usuarioCreacion: "Juan Perez",
      },
      {
        idBitacora: 2,
        accion: "Modificacion",
        descripcion: "Se modifico la tabla razon queja con los datos: nombre: Malos Tratos descripcion: Mala actitud del empleado Estado: Activo, a los datos: nombre: Malos Tratos Mala actitud del empleado Estado: Inactivo",
        fechaCreacion: "10/10/2022",
        usuarioCreacion: "Juan Perez",
      },
      {
        idBitacora: 3,
        accion: "Modificacion",
        descripcion: "Se modifico la tabla razon queja con los datos: nombre: Malos Tratos descripcion: Mala actitud del empleado Estado: Activo, a los datos: nombre: Malos Tratos Mala actitud del empleado Estado: Inactivo",
        fechaCreacion: "10/10/2022",
        usuarioCreacion: "Juan Perez",
      },
    ]);
  }, []);
  const verBitacora = (bitacora) => {
    establecerBitacora({ ...bitacora });
    establecerDialogoVisualizacionBitacora(true);
  };
  const ocultarDialogoVistaBitacora = () => {
    establecerEnvio(false);
    establecerDialogoVisualizacionBitacora(false);
  };
  const pieDialogoVistaBitacora = (
    <>
      <Button
        label="Salir"
        icon="pi pi-times"
        className="p-button-text"
        onClick={ocultarDialogoVistaBitacora}
      />
    </>
  );
  const listaElementoDataView = (dato) => {
    return (
      <>
        <div className="col-12">
          <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <div className="flex flex-column md:flex-row align-items-center p-3">
              <div className="flex-1 text-center md:text-left">
                <div className="font-bold text-2xl">{dato.accion}</div>
                <div className="mb-3">{dato.descripcion}</div>
                <div className="mb-3">{dato.usuarioCreacion}</div>
                <div className="mb-3">{dato.fechaCreacion}</div>
              </div>
            </div>
            <span className="p-buttonset">
              <Button
                icon="pi pi-eye"
                onClick={() => {
                  verBitacora(dato);
                }}
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
            Regitros de Bitacora
          </h5>
          <div className="filters">
            <span className="block mt-2 md:mt-0 p-input-icon-left">
              <Dropdown
                optionLabel="nombre"
                placeholder="Filtro por tablas"
                options={valorFiltroTabla}
                emptyMessage="Selecciona una tabla"
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
        visible={dialogoVistaBitacora}
        style={{ width: "450px" }}
        header="Visualizar Tipo de usuario"
        modal
        className="p-fluid"
        footer={pieDialogoVistaBitacora}
        onHide={ocultarDialogoVistaBitacora}
      >
        <div className="field">
          <label htmlFor="descripcion">Descripción</label>
          <InputTextarea
            id="descripcion"
            autoResize
            value={bitacora.descripcion}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="usuarioCreacion">Responsable de Registro</label>
          <InputText
            id="usuarioCreacion"
            value={bitacora.usuarioCreacion}
            readOnly
          />
        </div>
        <div className="field">
          <label htmlFor="fechaCreacion">Fecha de Registro</label>
          <InputText
            id="fechaCreacion"
            value={bitacora.fechaCreacion}
            readOnly
          />
        </div>
      </Dialog>
    </React.Fragment>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Bitacora, comparisonFn);
