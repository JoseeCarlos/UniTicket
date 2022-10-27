import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { EmployeeService } from "../servicios/ServicioEmpleado";
import { Divider } from "primereact/divider";
const Asignacion = () => {
  let asignacionVacia = {
    idEmpleado: null,
    IdMesa: null,
    estado: "",
    fechaCreacion: "",
    fechaActualizacion: "",
    idUsuarioCreacion: "",
    idUsuarioModificacion: "",
  };
  const [enviado, establecerEnvio] = useState(false);
  const [valorDropdown, establecerValorDropdown] = useState(null);
  const [filtroAsignacion, establecerFiltroAsignacion] = useState(null);
  const [filtroEmpleado, establecerFiltroEmpleado] = useState(null);
  const [asignacion, establecerAsignacion] = useState(asignacionVacia);
  const [dialogoInsercionAsignacion, establecerDialogoInsercionAsignacion] =
    useState(false);
  const [dialogoVistaAsignacion, establecerDialogoVisualizacionAsignacion] =
    useState(false);
  const [
    dialogoModificacionAsignacion,
    establecerDialogoActualizacionAsignacion,
  ] = useState(false);
  const [dialogoBorradoAsignacion, establecerDialogoBorradoAsignacion] =
    useState(false);
  const [carga, establecerCarga] = useState(true);
  const [empleado, establecerEmpleados] = useState([]);

  const servicioEmpleado = new EmployeeService();
  useEffect(() => {
    establecerCarga(true);
    servicioEmpleado
      .getEmployeesSmall()
      .then((data) => establecerEmpleados(data));
  });
  const valoresDropdown = [
    { name: "Habilitado", code: "1" },
    { name: "Inhabilitado", code: "0" },
  ];
  const guardarAsignacion = () => {};
  const insercionAsignacion = () => {
    establecerAsignacion(asignacionVacia);
    establecerDialogoInsercionAsignacion(true);
  };
  const vistaAsignacion = () => {
    establecerAsignacion(asignacionVacia);
    establecerDialogoVisualizacionAsignacion(true);
  };
  const actualizacionAsignacion = () => {
    establecerAsignacion(asignacionVacia);
    establecerDialogoActualizacionAsignacion(true);
  };
  const borradoAsignacion = () => {
    establecerAsignacion(asignacionVacia);
    establecerDialogoBorradoAsignacion(true);
  };
  const pieDialogoInsercionAsignacion = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => ocultarDialogoInsercionAsignacion()}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => guardarAsignacion()}
      />
    </>
  );
  const pieDialogoVistaAsignacion = (
    <Button
      label="Salir"
      icon="pi pi-times"
      className="p-button-text"
      onClick={() => ocultarDialogoVistaAsignacion()}
    />
  );
  const pieDialogoModificacionAsignacion = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => ocultarDialogoModificacionAsignacion()}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => guardarAsignacion()}
      />
    </>
  );
  const pieDialogoBorradoAsignacion = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => ocultarDialogoBorradoAsignacion()}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => guardarAsignacion()}
      />
    </>
  );
  const ocultarDialogoInsercionAsignacion = () => {
    establecerEnvio(false);
    establecerDialogoInsercionAsignacion(false);
  };
  const ocultarDialogoVistaAsignacion = () => {
    establecerEnvio(false);
    establecerDialogoVisualizacionAsignacion(false);
  };
  const ocultarDialogoModificacionAsignacion = () => {
    establecerEnvio(false);
    establecerDialogoActualizacionAsignacion(false);
  };
  const ocultarDialogoBorradoAsignacion = () => {
    establecerEnvio(false);
    establecerDialogoBorradoAsignacion(false);
  };
  const encabezado = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">
        Administración de Asignaciones{" "}
        <i className="pi pi-plus icn" onClick={insercionAsignacion}></i>
      </h5>
      <div className="filters">
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <Dropdown
            value={valorDropdown}
            onChange={(e) => establecerValorDropdown(e.value)}
            options={valoresDropdown}
            optionLabel="nombre"
            placeholder="Estado del empleado"
          />
        </span>
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => establecerFiltroAsignacion(e.target.value)}
            placeholder="Buscar empleado..."
          />
        </span>
      </div>
    </div>
  );
  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <DataTable
            responsiveLayout="scroll"
            header={encabezado}
            value={empleado}
            globalFilter={filtroAsignacion}
            emptyMessage="Empleado no encontrado."
          >
            <Column field="nombre" header="Nombre Completo" sortable></Column>
            <Column field="area" header="Area" sortable></Column>
            <Column
              field="attentionPlace"
              header="Lugar de atencion"
              sortable
            ></Column>
            <Column field="mesa" header="Mesa" sortable></Column>
            <Column
              header="Acciones"
              headerStyle={{ width: "12rem" }}
              body={
                <span className="p-buttonset">
                  <Button icon="pi pi-eye" onClick={() => vistaAsignacion()} />
                  <Button
                    icon="pi pi-pencil"
                    onClick={() => actualizacionAsignacion()}
                  />
                  <Button
                    icon="pi pi-trash"
                    onClick={() => borradoAsignacion()}
                  />
                </span>
              }
            ></Column>
          </DataTable>
          <Dialog
            visible={dialogoInsercionAsignacion}
            header="Nueva Asignacion"
            footer={pieDialogoInsercionAsignacion}
            onHide={ocultarDialogoInsercionAsignacion}
          >
            <div className="flex flex-column md:flex-row md:justify-content-between ">
              <div className="p-fluid">
                <div className="field">
                  <label htmlFor="empleado">Empleado</label>
                  <InputText
                    type="search"
                    onInput={(e) => establecerFiltroEmpleado(e.target.value)}
                    placeholder="Buscar empleado..."
                  />
                  <DataTable
                    id="empleado"
                    value={empleado}
                    scrollable
                    scrollHeight="370px"
                    globalFilter={filtroEmpleado}
                    emptyMessage="Empleado no encontrado."
                  >
                    <Column field="name" header="Nombre Completo" />
                  </DataTable>
                </div>
              </div>
              <Divider layout="vertical" />
              <div className="p-fluid">
                <div className="field">
                  <label htmlFor="attentionPlace">Lugares de Atención</label>
                  <Dropdown
                    id="attentionPlace"
                    placeholder="Seleccione el lugar de atencion"
                    required
                    emptyMessage="No se encontraron lugares de atención"
                  ></Dropdown>
                </div>
                <div className="field">
                  <label htmlFor="mesa">Mesas</label>
                  <Dropdown
                    id="mesa"
                    placeholder="Seleccione la mesa"
                    required
                    emptyMessage="No se encontraron mesas"
                  ></Dropdown>
                </div>
                <div className="card p-fluid">
                  <h5>Resumen de la Asignación</h5>
                  <div className="field">
                    <label htmlFor="empleadoSeleccionado">Empleado</label>
                    <p id="empleadoSeleccionado">Juan Perez</p>
                  </div>
                  <div className="field">
                    <label htmlFor="lugarAtencionSeleccionado">
                      Lugar de Atención
                    </label>
                    <p id="lugarAtencionSeleccionado">Cajas Tiquipaya</p>
                  </div>
                  <div className="field">
                    <label htmlFor="fechaInicio">Fecha de Inicio</label>
                    <p id="fechaInicio">24/10/2022</p>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
          <Dialog
            visible={dialogoVistaAsignacion}
            header="Asignacion"
            footer={pieDialogoVistaAsignacion}
            onHide={ocultarDialogoVistaAsignacion}
            style={{ width: "450px" }}
          >
            <div className="p-fluid">
              <div className="field">
                <label htmlFor="empleado">Empleado</label>
                <p id="empleado">Juan Perez</p>
              </div>
            </div>
            <div className="p-fluid">
              <div className="field">
                <label htmlFor="lugarAtencionSeleccionado">
                  Lugar de Atención
                </label>
                <p id="lugarAtencionSeleccionado">Cajas Tiquipaya</p>
              </div>
              <div className="field">
                <label htmlFor="fechaInicio">Fecha de Inicio</label>
                <p id="fechaInicio">24/10/2022</p>
              </div>
              <div className="field">
                <label htmlFor="fechaModificacion">Fecha de Modificación</label>
                <p id="fechaModificacion">31/10/2022</p>
              </div>
            </div>
          </Dialog>
          <Dialog
            visible={dialogoModificacionAsignacion}
            header="Modificar Asignacion"
            footer={pieDialogoModificacionAsignacion}
            onHide={ocultarDialogoModificacionAsignacion}
          >
            <div className="flex flex-column md:flex-row md:justify-content-between ">
              <div className="p-fluid">
                <div className="field">
                  <label htmlFor="empleado">Empleado</label>
                  <InputText
                    type="search"
                    onInput={(e) => establecerFiltroEmpleado(e.target.value)}
                    placeholder="Buscar empleado..."
                  />
                  <DataTable
                    id="empleado"
                    value={empleado}
                    scrollable
                    scrollHeight="370px"
                    globalFilter={filtroEmpleado}
                    emptyMessage="Empleado no encontrado."
                  >
                    <Column field="nombre" header="Nombre Completo" />
                  </DataTable>
                </div>
              </div>
              <Divider layout="vertical" />
              <div className="p-fluid">
                <div className="field">
                  <label htmlFor="lugarAtencion">Lugares de Atención</label>
                  <Dropdown
                    id="lugarAtencion"
                    placeholder="Seleccione el lugar de atencion"
                    required
                    emptyMessage="No se encontraron lugares de atención"
                  ></Dropdown>
                </div>
                <div className="field">
                  <label htmlFor="mesa">Mesas</label>
                  <Dropdown
                    id="mesa"
                    placeholder="Seleccione la mesa"
                    required
                    emptyMessage="No se encontraron mesas"
                  ></Dropdown>
                </div>
                <div className="card p-fluid">
                  <h5>Resumen de la Asignación</h5>
                  <div className="field">
                    <label htmlFor="empleadoSeleccionado">Empleado</label>
                    <p id="empleadoSeleccionado">Juan Perez</p>
                  </div>
                  <div className="field">
                    <label htmlFor="lugarAtencionSeleccionado">
                      Lugar de Atención
                    </label>
                    <p id="lugarAtencionSeleccionado">Cajas Tiquipaya</p>
                  </div>
                  <div className="field">
                    <label htmlFor="fechaInicio">Fecha de Inicio</label>
                    <p id="fechaInicio">24/10/2022</p>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
          <Dialog
            visible={dialogoBorradoAsignacion}
            style={{ width: "450px" }}
            header="Confirmar"
            modal
            footer={pieDialogoBorradoAsignacion}
            onHide={ocultarDialogoBorradoAsignacion}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              <span>Estás seguro de que desea elimiar la asignación?</span>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Asignacion, comparisonFn);
