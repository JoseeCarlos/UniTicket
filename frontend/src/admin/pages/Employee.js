import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { EmployeeService } from '../service/EmployeeService';
import { Dropdown } from 'primereact/dropdown';

const Employee = () => {
  let emptyEmployee = {
    id: null,
    name: '',
    image: null,
    description: '',
    category: null,
    price: 0,
    quantity: 0,
    rating: 0,
    inventoryStatus: 'INSTOCK'
  };

  const [employees, setEmployees] = useState(null);
  const [employeeDialog, setEmployeeDialog] = useState(false);
  const [deleteEmployeeDialog, setDeleteEmployeeDialog] = useState(false);
  const [deleteEmployeesDialog, setDeleteEmployeesDialog] = useState(false);
  const [employee, setEmployee] = useState(emptyEmployee);
  const [selectedEmployees, setSelectedEmployees] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [dropdownValue, setDropdownValue] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  const dropdownValues = [
    { name: 'Habilitado', code: '1' },
    { name: 'Inhabilitado', code: '0' }
  ];

  useEffect(() => {
    const employeeService = new EmployeeService();
    employeeService.getEmployees().then(data => setEmployees(data));
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  const openNew = () => {
    setEmployee(emptyEmployee);
    setSubmitted(false);
    setEmployeeDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setEmployeeDialog(false);
  }

  const hideDeleteEmployeeDialog = () => {
    setDeleteEmployeeDialog(false);
  }

  const hideDeleteEmployeesDialog = () => {
    setDeleteEmployeesDialog(false);
  }

  const saveEmployee = () => {
    setSubmitted(true);

    if (employee.name.trim()) {
      let _employees = [...employees];
      let _employee = { ...employee };
      if (employee.id) {
        const index = findIndexById(employee.id);

        _employees[index] = _employee;
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
      }
      else {
        _employee.id = createId();
        _employee.image = 'employee-placeholder.svg';
        _employees.push(_employee);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
      }

      setEmployees(_employees);
      setEmployeeDialog(false);
      setEmployee(emptyEmployee);
    }
  }

  const editEmployee = (employee) => {
    setEmployee({ ...employee });
    setEmployeeDialog(true);
  }

  const confirmDeleteEmployee = (employee) => {
    setEmployee(employee);
    setDeleteEmployeeDialog(true);
  }

  const deleteEmployee = () => {
    let _employees = employees.filter(val => val.id !== employee.id);
    setEmployees(_employees);
    setDeleteEmployeeDialog(false);
    setEmployee(emptyEmployee);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
  }

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  const createId = () => {
    let id = '';
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  const exportCSV = () => {
    dt.current.exportCSV();
  }

  const confirmDeleteSelected = () => {
    setDeleteEmployeesDialog(true);
  }

  const deleteSelectedEmployees = () => {
    let _employees = employees.filter(val => !selectedEmployees.includes(val));
    setEmployees(_employees);
    setDeleteEmployeesDialog(false);
    setSelectedEmployees(null);
    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
  }

  const onCategoryChange = (e) => {
    let _employee = { ...employee };
    _employee['category'] = e.value;
    setEmployee(_employee);
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _employee = { ...employee };
    _employee[`${name}`] = val;

    setEmployee(_employee);
  }

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _employee = { ...employee };
    _employee[`${name}`] = val;

    setEmployee(_employee);
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
          <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedEmployees || !selectedEmployees.length} />
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
        <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
      </React.Fragment>
    )
  }

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.name}
      </>
    );
  }

  const imageBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Image</span>
        <img src={`assets/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
      </>
    )
  }

  const priceBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Price</span>
        {formatCurrency(rowData.price)}
      </>
    );
  }

  const categoryBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Category</span>
        {rowData.category}
      </>
    );
  }

  const ratingBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Reviews</span>
        <Rating value={rowData.rating} readonly cancel={false} />
      </>
    );
  }

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Status</span>
        <span className={`employee-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
      </>
    )
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editEmployee(rowData)} />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteEmployee(rowData)} />
      </div>
    );
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Lista de empleados</h5>
      <div className='filters'>
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Estado del empleado" />
        </span>
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
        </span>
      </div>
    </div>
  );

  const employeeDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveEmployee} />
    </>
  );
  const deleteEmployeeDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEmployeeDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteEmployee} />
    </>
  );
  const deleteEmployeesDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEmployeesDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedEmployees} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

          <DataTable ref={dt} value={employees} selection={selectedEmployees} onSelectionChange={(e) => setSelectedEmployees(e.value)}
            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} employees"
            globalFilter={globalFilter} emptyMessage="No employees found." header={header} responsiveLayout="scroll">
            <Column selectionMode="single" headerStyle={{ width: '3rem' }}></Column>
            <Column field="name" header="Nombre Completo" sortable body={nameBodyTemplate} headerStyle={{ width: '50%', minWidth: '10rem' }}></Column>
            <Column header="Image" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
            <Column field="price" header="Celular" body={priceBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
            <Column field="category" header="Correo" sortable body={categoryBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
            <Column field="rating" header="Rol" body={ratingBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
            <Column field="rating" header="Area" body={ratingBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>

          <Dialog visible={employeeDialog} style={{ width: '450px' }} header="Employee Details" modal className="p-fluid" footer={employeeDialogFooter} onHide={hideDialog}>
            {employee.image && <img src={`assets/demo/images/employee/${employee.image}`} alt={employee.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText id="name" value={employee.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !employee.name })} />
              {submitted && !employee.name && <small className="p-invalid">Name is required.</small>}
            </div>
            <div className="field">
              <label htmlFor="description">Description</label>
              <InputTextarea id="description" value={employee.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
            </div>

            <div className="field">
              <label className="mb-3">Category</label>
              <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                  <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={employee.category === 'Accessories'} />
                  <label htmlFor="category1">Accessories</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={employee.category === 'Clothing'} />
                  <label htmlFor="category2">Clothing</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={employee.category === 'Electronics'} />
                  <label htmlFor="category3">Electronics</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={employee.category === 'Fitness'} />
                  <label htmlFor="category4">Fitness</label>
                </div>
              </div>
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price">Price</label>
                <InputNumber id="price" value={employee.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
              </div>
              <div className="field col">
                <label htmlFor="quantity">Quantity</label>
                <InputNumber id="quantity" value={employee.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
              </div>
            </div>
          </Dialog>

          <Dialog visible={deleteEmployeeDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeeDialogFooter} onHide={hideDeleteEmployeeDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {employee && <span>Are you sure you want to delete <b>{employee.name}</b>?</span>}
            </div>
          </Dialog>

          <Dialog visible={deleteEmployeesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeesDialogFooter} onHide={hideDeleteEmployeesDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {employee && <span>Are you sure you want to delete the selected employees?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Employee, comparisonFn);