import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { CustomerService } from "../service/CustomerService";
import { ProductService } from "../service/ProductService";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { AttentionPLaceService } from "../service/AttentionPLaceService";
import { TableService } from "../service/TableService";

const AttentionPlaceTable = () => {
  let emptyTable = {
    id: null,
    number: "",
    attentionPlaceId: null,
    areaId: null,
    status: "",
    createDate: "",
    updateDate: "",
    userIdCreate: "",
    userIdMod: "",
  };
  let emptyAttentionPlace = {
    atentionPlaceId: null,
    name: "",
    campusId: "",
    status: "",
    createDate: "",
    updateDate: "",
    userIdCreate: "",
    userIdMod: "",
  };
  let emptyAttentionPlaceArea = {
    atentionPlaceid: null,
    areaId: null,
    startDate: "",
    finishDate: "",
    status: "",
    createDate: "",
    updateDate: "",
    userIdCreate: "",
    userIdMod: "",
  };
  const [customers1, setCustomers1] = useState(null);
  const [customers2, setCustomers2] = useState([]);
  const [customers3, setCustomers3] = useState([]);
  const [filters1, setFilters1] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [idFrozen, setIdFrozen] = useState(false);
  const [products, setProducts] = useState([]);
  const [expandedRows, setExpandedRows] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [table, setTable] = useState(emptyTable);
  const [tableInsertDialog, setTableInsertDialog] = useState(false);
  const [tableEditDialog, setTableEditDialog] = useState(false);
  const [tableViewDialog, setTableViewDialog] = useState(false);
  const [tableDeleteDialog, setTableDeleteDialog] = useState(false);
  const [attentionPlace, setAttentionPlace] = useState(emptyAttentionPlace);
  
  const [attentionPlaceInsertDialog, setAttentionPlaceInsertDialog] =
    useState(false);
  const [attentionPlaceViewDialog, setAttentionPlaceViewDialog] =
    useState(false);
  const [attentionPlaceEditDialog, setAttentionPlaceEditDialog] =
    useState(false);
  const [attentionPlaceDeleteDialog, setAttentionPlaceDeleteDialog] =
    useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);

  const customerService = new CustomerService();
  const productService = new ProductService();
  const attentionPLaceService = new AttentionPLaceService();
  const tableService = new TableService();

  const dropdownValues = [
    { name: "Cajas Tiquipaya", code: "1" },
    { name: "Bienestar Universitario Tiquipaya", code: "2" },
  ];
  const dropdownCampusValues = [
    { name: "Campus Tiquipaya", code: "1" },
    { name: "Edificio America", code: "2" },
  ];
  const dropdownAreaValues = [
    { name: "Caja", code: "1" },
    { name: "Bienestar Universitario", code: "2" },
  ];
  const hideDialog = () => {
    setSubmitted(false);
    setTableInsertDialog(false);
    setTableEditDialog(false);
    setTableViewDialog(false);
    setTableDeleteDialog(false);
    setAttentionPlaceInsertDialog(false);
    setAttentionPlaceDeleteDialog(false);
    setAttentionPlaceViewDialog(false);
    setAttentionPlaceEditDialog(false);
  };
  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _Table = { ...table };
    _Table[`${name}`] = val;

    setTable(_Table);
  };
  useEffect(() => {
    setLoading2(true);
    // customerService.getCustomersLarge().then((data) => {
    //   setCustomers1(getCustomers(data));
    //   setLoading1(false);
    // });
    // customerService.getCustomersLarge().then((data) => {
    //   setCustomers2(getCustomers(data));
    //   setLoading2(false);
    // });
    // customerService.getCustomersMedium().then((data) => setCustomers3(data));
    // productService
    //   .getProductsWithOrdersSmall()
    //   .then((data) => {
    //     setProducts(data)
    //     console.log(data)
    //   });
    
    attentionPLaceService.getAreas().then((data) => {
      setProducts(data);
      setDropdownValue(data);
      console.log(data);
    });

    console.log(getTableAreas("2")); 

    initFilters1();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Status</span>
        <span className={`provider-badge status-${ rowData.status === 0 ?  'outofstock' : 'instock' }`}>{ rowData.status === 0 ? 'Inactivo' : 'Activo' }</span>
      </>
    );
  }


  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "country.name": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      representative: { value: null, matchMode: FilterMatchMode.IN },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      balance: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      status: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
  };
  const expandAll = () => {
    let _expandedRows = {};
    products.forEach((p) => (_expandedRows[`${p.id}`] = true));

    setExpandedRows(_expandedRows);
  };

  const collapseAll = () => {
    setExpandedRows(null);
  };
  const insertTable = () => {
    setTable({ emptyTable });
    setTableInsertDialog(true);
  };
  const viewTable = (table) => {
    setTable({ ...table });
    setTableViewDialog(true);
  };
  const editTable = (table) => {
    setTable({ ...table });
    setTableEditDialog(true);
  };
  const confirmDeleteTable = (table) => {
    setTable(table);
    setTableDeleteDialog(true);
  };
  const getTableAreas = (tableId) => {
    let tableAreas = [];
    tableService.getTableAreas(tableId).then((data) => {
      tableAreas.push(data);
      console.log(tableAreas[0]);
    }
    );
    return tableAreas;
  };

  const insertAttentionPlace = () => {
    setAttentionPlace(emptyAttentionPlace);
    setAttentionPlaceInsertDialog(true);
  };
  const viewAttentionPlace = (attentionPlace) => {
    setAttentionPlace({ ...attentionPlace });
    setAttentionPlaceViewDialog(true);
  };
  const editAttentionPlace = (attentionPlace) => {
    setAttentionPlace({ ...attentionPlace });
    setAttentionPlaceEditDialog(true);
  };
  const confirmDeleteAttentionPlace = (attentionPlace) => {
    setAttentionPlace(attentionPlace);
    setAttentionPlaceDeleteDialog(true);
  };
  const [dataTableArea, setDataTableArea] = useState([]);

  const rowExpansionTemplate = (data) => {
    console.log("holaa " + data.attentionPlaceId);
    data = getTableAreas(data.attentionPlaceId);
    console.log(data);
    return (
      <div className="orders-subtable">
        {
          // console.log(data)
          // console.log(getTableAreas(data.attentionPlaceId))
          // setDataTableArea(getTableAreas(data.attentionPlaceId))
        }
        <DataTable
          value={data[0]}
          responsiveLayout="scroll"
          header={tableHeader}
        >
          <Column
            field="number"
            header="Numero de Mesa"
            sortable
            headerStyle={{ width: "4rem" }}
          ></Column>
          <Column
            field="employeeName"
            header="Empleado Actual"
            sortable
            headerStyle={{ width: "12rem" }}
          >culo</Column>
          <Column
            field="status"
            header="Estado"
            sortable
            headerStyle={{ width: "4rem" }}
          ></Column>
          <Column
            header="Acciones"
            headerStyle={{ width: "1rem" }}
            body={
              <span className="p-buttonset">
                <Button icon="pi pi-eye" onClick={() => viewTable(data)} />
                <Button icon="pi pi-pencil" onClick={() => editTable(data)} />
                <Button
                  icon="pi pi-trash"
                  onClick={() => confirmDeleteTable(data)}
                />
              </span>
            }
          ></Column>
        </DataTable>
        <Dialog
          visible={tableInsertDialog}
          style={{ width: "450px" }}
          header="Nueva Mesa"
          modal
          className="p-fluid"
          footer={tableInsertDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="name">Numero</label>
            <InputText
              id="name"
              value={table.name}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({ "p-invalid": submitted && !table.name })}
            />
            {submitted && !table.name && (
              <small className="p-invalid">El nombre es requerido.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="attentionPlace">Lugar de Atención</label>
            <Dropdown
              value={dropdownValue}
              onChange={(e) => setDropdownValue(e.value)}
              options={dropdownValues}
              optionLabel="name"
              placeholder="Seleccione el Lugar de Atención"
            />
          </div>
        </Dialog>
        <Dialog
          visible={tableViewDialog}
          style={{ width: "450px" }}
          header="Mesa"
          modal
          className="p-fluid"
          footer={tableViewDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="number">Numero</label>
            <InputText
              id="number"
              value={"1"}
              onChange={(e) => onInputChange(e, "name")}
              disabled
              className={classNames({ "p-invalid": submitted && !table.name })}
            />
          </div>
          <div className="field">
            <label htmlFor="city">Lugar de Atención</label>
            <Dropdown
              value={dropdownValues[0]}
              onChange={(e) => setDropdownValue(e.value)}
              options={dropdownValues}
              optionLabel="name"
              placeholder="Seleccione el Lugar de Atención"
              disabled
            />
          </div>
        </Dialog>
        <Dialog
          visible={tableEditDialog}
          style={{ width: "450px" }}
          header="Editar Mesa"
          modal
          className="p-fluid"
          footer={tableEditDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="name">Numero</label>
            <InputText
              id="name"
              value={table.name}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({ "p-invalid": submitted && !table.name })}
            />
            {submitted && !table.name && (
              <small className="p-invalid">El nombre es requerido.</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="city">Lugar de Atención</label>
            <Dropdown
              value={dropdownValue}
              onChange={(e) => setDropdownValue(e.value)}
              options={dropdownValues}
              optionLabel="name"
              placeholder="Seleccione el Lugar de Atención"
            />
          </div>
        </Dialog>
        <Dialog
          visible={tableDeleteDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={tableDeleteDialogFooter}
          onHide={hideDialog}
        >
          <div className="flex align-items-center justify-content-center">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            <span>Estás seguro de que desea eliminar la Mesa</span>
          </div>
        </Dialog>
      </div>
    );
  };
  const tableViewDialogFooter = (
    <>
      <Button
        label="Salir"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
    </>
  );
  const tableInsertDialogFooter = (
    <>
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
    </>
  );
  const tableEditDialogFooter = (
    <>
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
    </>
  );
  const tableDeleteDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteTable}
      />
    </>
  );
  const attentionPlaceDialogInsertFooter = (
    <>
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
    </>
  );
  const attentionPlaceDialogViewFooter = (
    <>
      <Button
        label="Salir"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
    </>
  );
  const deleteTable = () => {};
  const deleteAttentionPlace = () => {};
  const attentionPlaceDeleteDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Si"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteAttentionPlace}
      />
    </>
  );
  const attentionPlaceDialogEditFooter = (
    <>
      <Button
        label="Guardar"
        icon="pi pi-check"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
    </>
  );
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5>
        Lugares De Atención{" "}
        <i className="pi pi-plus icn" onClick={insertAttentionPlace} />
      </h5>
      <span className="p-buttonset">
        <Button icon="pi pi-plus" label="Expandir" onClick={expandAll} />
        <Button icon="pi pi-minus" label="Colapsar" onClick={collapseAll} />
      </span>
    </div>
  );
  const tableHeader = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5>
        Mesas asignadas
        <i className="pi pi-plus icn" onClick={insertTable} />
      </h5>
    </div>
  );
  return (
    <div className="grid table-demo">
      <div className="col-12">
        <div className="card">
          <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5>Administración De Lugares De Atención y Mesas</h5>
          </div>

          <DataTable
            value={products}
            expandedRows={expandedRows}
            onRowToggle={(e) => {
              setExpandedRows(e.data);
            }}
            responsiveLayout="scroll"
            rowExpansionTemplate={rowExpansionTemplate}
            dataKey="id"
            header={header}
          >
            <Column expander style={{ width: "1em" }} />
            <Column field="attentionPlaceName" header="Nombre" sortable />
            <Column field="areaName" header="Area Actual" sortable />
            <Column field="campusName" header="Campus" sortable />
            <Column field="status" header="Estado" body={statusBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
            <Column
              header="Acciones"
              headerStyle={{ width: "12rem" }}
              body={
                <span className="p-buttonset">
                  <Button
                    icon="pi pi-eye"
                    onClick={() => viewAttentionPlace()}
                  />
                  <Button
                    icon="pi pi-pencil"
                    onClick={() => editAttentionPlace()}
                  />
                  <Button
                    icon="pi pi-trash"
                    onClick={() => confirmDeleteAttentionPlace()}
                  />
                </span>
              }
            ></Column>
          </DataTable>
        </div>
      </div>
      <Dialog
        visible={attentionPlaceInsertDialog}
        style={{ width: "450px" }}
        header="Nuevo Lugar de Atención"
        className="p-fluid"
        footer={attentionPlaceDialogInsertFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            onChange={(e) => onInputChange(e, "name")}
            required
            className={classNames({ "p-invalid": submitted && !table.name })}
          />
          {submitted && !table.name && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="campus">Campus</label>
          <Dropdown
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.value)}
            options={dropdownCampusValues}
            optionLabel="name"
            placeholder="Seleccione el campus"
          />
        </div>
        <div className="field">
          <label htmlFor="area">Area</label>
          <Dropdown
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.value)}
            options={dropdownAreaValues}
            optionLabel="name"
            placeholder="Seleccione el area"
            required
          />
        </div>
      </Dialog>
      <Dialog
        visible={attentionPlaceViewDialog}
        style={{ width: "450px" }}
        header="Lugar de Atención"
        modal
        className="p-fluid"
        footer={attentionPlaceDialogViewFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={"Cajas Tipuipaya"}
            onChange={(e) => onInputChange(e, "name")}
            disabled
            className={classNames({ "p-invalid": submitted && !table.name })}
          />
          {submitted && !table.name && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="city">Campus</label>
          <Dropdown
            value={dropdownCampusValues[0]}
            onChange={(e) => setDropdownValue(e.value)}
            options={dropdownCampusValues}
            optionLabel="name"
            placeholder="Seleccione el Lugar de Atención"
            disabled
          />
        </div>
        <div className="field">
          <label htmlFor="area">Area</label>
          <Dropdown
            value={dropdownAreaValues[0]}
            onChange={(e) => setDropdownValue(e.value)}
            options={dropdownAreaValues}
            optionLabel="name"
            placeholder="Seleccione el area"
            disabled
          />
        </div>
      </Dialog>
      <Dialog
        visible={attentionPlaceEditDialog}
        style={{ width: "450px" }}
        header="Editar Lugar de Atención"
        modal
        className="p-fluid"
        footer={attentionPlaceDialogEditFooter}
        onHide={hideDialog}
      >
        <div className="field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            value={table.name}
            onChange={(e) => onInputChange(e, "name")}
            required
            autoFocus
            className={classNames({ "p-invalid": submitted && !table.name })}
          />
          {submitted && !table.name && (
            <small className="p-invalid">El nombre es requerido.</small>
          )}
        </div>
        <div className="field">
          <label htmlFor="city">Campus</label>
          <Dropdown
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.value)}
            options={dropdownCampusValues}
            optionLabel="name"
            placeholder="Seleccione el campus"
          />
        </div>
        <div className="field">
          <label htmlFor="area">Area</label>
          <Dropdown
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.value)}
            options={dropdownAreaValues}
            optionLabel="name"
            placeholder="Seleccione el area"
            required
          />
        </div>
      </Dialog>
      <Dialog
        visible={attentionPlaceDeleteDialog}
        style={{ width: "450px" }}
        header="Confirm"
        modal
        footer={attentionPlaceDeleteDialogFooter}
        onHide={hideDialog}
      >
        <div className="flex align-items-center justify-content-center">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <span>Estás seguro de que desea elimiar el Lugar de Atención</span>
          {attentionPlace && (
            <span>
              Estás seguro de que desea elimiar el campus{" "}
              <b>{attentionPlace.name}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </div>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(AttentionPlaceTable, comparisonFn);
