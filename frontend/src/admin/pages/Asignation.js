import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { EmployeeService } from "../service/EmployeeService";
import { Divider } from "primereact/divider";
const Asignation = () => {
  let emptyAsignation = {
    employeeId: null,
    tableId: null,
    status: "",
    createDate: "",
    updateDate: "",
    userIdCreate: "",
    userIdMod: "",
  };
  const [submitted, setSubmitted] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [asignationFilter, setAsignationFilter] = useState(null);
  const [employeeFilter, setEmployeeFilter] = useState(null);
  const [asignation, setAsignation] = useState(emptyAsignation);
  const [asignationInsertDialog, setAsignationInsertDialog] = useState(false);
  const [asignationViewDialog, setAsignationViewDialog] = useState(false);
  const [asignationUpdateDialog, setAsignationUpdateDialog] = useState(false);
  const [asignationDeleteDialog, setAsignationDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  const employeeService = new EmployeeService();
  useEffect(() => {
    setLoading(true);
    employeeService.getEmployeesSmall().then((data) => setEmployees(data));
  });
  const dropdownValues = [
    { name: "Habilitado", code: "1" },
    { name: "Inhabilitado", code: "0" },
  ];
  const saveAsignation = () => {};
  const asignationInsert = () => {
    setAsignation(emptyAsignation);
    setAsignationInsertDialog(true);
  };
  const asignationView = () => {
    setAsignation(emptyAsignation);
    setAsignationViewDialog(true);
  };
  const asignationUpdate = () => {
    setAsignation(emptyAsignation);
    setAsignationUpdateDialog(true);
  };
  const asignationDelete = () => {
    setAsignation(emptyAsignation);
    setAsignationDeleteDialog(true);
  };
  const asignationInsertDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => hideAsignationInsertDialog()}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => saveAsignation()}
      />
    </>
  );
  const asignationViewDialogFooter = (
    <>
      <Button
        label="Salir"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => hideAsignationViewDialog()}
      />
    </>
  );
  const asignationUpdateDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => hideAsignationUpdateDialog()}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => saveAsignation()}
      />
    </>
  );
  const asignationDeleteDialogFooter = (
    <>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => hideAsignationDeleteDialog()}
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={() => saveAsignation()}
      />
    </>
  );
  const hideAsignationInsertDialog = () => {
    setSubmitted(false);
    setAsignationInsertDialog(false);
  };
  const hideAsignationViewDialog = () => {
    setSubmitted(false);
    setAsignationViewDialog(false);
  };
  const hideAsignationUpdateDialog = () => {
    setSubmitted(false);
    setAsignationUpdateDialog(false);
  };
  const hideAsignationDeleteDialog = () => {
    setSubmitted(false);
    setAsignationDeleteDialog(false);
  };
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">
        Administración de Asignaciones{" "}
        <i className="pi pi-plus icn" onClick={asignationInsert}></i>
      </h5>
      <div className="filters">
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <Dropdown
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.value)}
            options={dropdownValues}
            optionLabel="name"
            placeholder="Estado del empleado"
          />
        </span>
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setAsignationFilter(e.target.value)}
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
            header={header}
            value={employees}
            globalFilter={asignationFilter}
            emptyMessage="Empleado no encontrado."
          >
            <Column field="name" header="Nombre Completo" sortable></Column>
            <Column field="area" header="Area" sortable></Column>
            <Column
              field="attentionPlace"
              header="Lugar de atencion"
              sortable
            ></Column>
            <Column field="table" header="Mesa" sortable></Column>
            <Column
              header="Acciones"
              headerStyle={{ width: "12rem" }}
              body={
                <span className="p-buttonset">
                  <Button icon="pi pi-eye" onClick={() => asignationView()} />
                  <Button
                    icon="pi pi-pencil"
                    onClick={() => asignationUpdate()}
                  />
                  <Button
                    icon="pi pi-trash"
                    onClick={() => asignationDelete()}
                  />
                </span>
              }
            ></Column>
          </DataTable>
          <Dialog
            visible={asignationInsertDialog}
            header="Nueva Asignacion"
            footer={asignationInsertDialogFooter}
            onHide={hideAsignationInsertDialog}
          >
            <div className="flex flex-column md:flex-row md:justify-content-between ">
              <div className="p-fluid">
                <div className="field">
                  <label htmlFor="employee">Empleado</label>
                  <InputText
                    type="search"
                    onInput={(e) => setEmployeeFilter(e.target.value)}
                    placeholder="Buscar empleado..."
                  />
                  <DataTable
                    id="employee"
                    value={employees}
                    scrollable
                    scrollHeight="370px"
                    globalFilter={employeeFilter}
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
                  <label htmlFor="table">Mesas</label>
                  <Dropdown
                    id="table"
                    placeholder="Seleccione la mesa"
                    required
                    emptyMessage="No se encontraron mesas"
                  ></Dropdown>
                </div>
                <div className="card p-fluid">
                  <h5>Resumen de la Asignación</h5>
                  <div className="field">
                    <label htmlFor="selectedEmployee">Empleado</label>
                    <p id="selectedEmployee">Juan Perez</p>
                  </div>
                  <div className="field">
                    <label htmlFor="selectedAttentionPlace">
                      Lugar de Atención
                    </label>
                    <p id="selectedAttentionPlace">Cajas Tiquipaya</p>
                  </div>
                  <div className="field">
                    <label htmlFor="startDate">Fecha de Inicio</label>
                    <p id="startDate">24/10/2022</p>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
          <Dialog
            visible={asignationViewDialog}
            header="Asignacion"
            footer={asignationViewDialogFooter}
            onHide={hideAsignationViewDialog}
            style={{ width: "450px" }}
          >
            <div className="p-fluid">
              <div className="field">
                <label htmlFor="employee">Empleado</label>
                <p id="employee">Juan Perez</p>
              </div>
            </div>
            <div className="p-fluid">
              <div className="field">
                <label htmlFor="selectedAttentionPlace">
                  Lugar de Atención
                </label>
                <p id="selectedAttentionPlace">Cajas Tiquipaya</p>
              </div>
              <div className="field">
                <label htmlFor="startDate">Fecha de Inicio</label>
                <p id="startDate">24/10/2022</p>
              </div>
              <div className="field">
                <label htmlFor="modificationDate">Fecha de Modificación</label>
                <p id="modificationDate">31/10/2022</p>
              </div>
            </div>
          </Dialog>
          <Dialog
            visible={asignationUpdateDialog}
            header="Modificar Asignacion"
            footer={asignationUpdateDialogFooter}
            onHide={hideAsignationUpdateDialog}
          >
            <div className="flex flex-column md:flex-row md:justify-content-between ">
              <div className="p-fluid">
                <div className="field">
                  <label htmlFor="employee">Empleado</label>
                  <InputText
                    type="search"
                    onInput={(e) => setEmployeeFilter(e.target.value)}
                    placeholder="Buscar empleado..."
                  />
                  <DataTable
                    id="employee"
                    value={employees}
                    scrollable
                    scrollHeight="370px"
                    globalFilter={employeeFilter}
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
                  <label htmlFor="table">Mesas</label>
                  <Dropdown
                    id="table"
                    placeholder="Seleccione la mesa"
                    required
                    emptyMessage="No se encontraron mesas"
                  ></Dropdown>
                </div>
                <div className="card p-fluid">
                  <h5>Resumen de la Asignación</h5>
                  <div className="field">
                    <label htmlFor="selectedEmployee">Empleado</label>
                    <p id="selectedEmployee">Juan Perez</p>
                  </div>
                  <div className="field">
                    <label htmlFor="selectedAttentionPlace">
                      Lugar de Atención
                    </label>
                    <p id="selectedAttentionPlace">Cajas Tiquipaya</p>
                  </div>
                  <div className="field">
                    <label htmlFor="startDate">Fecha de Inicio</label>
                    <p id="startDate">24/10/2022</p>
                  </div>
                </div>
              </div>
            </div>
          </Dialog>
          <Dialog
            visible={asignationDeleteDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={asignationDeleteDialogFooter}
            onHide={hideAsignationDeleteDialog}
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

export default React.memo(Asignation, comparisonFn);
