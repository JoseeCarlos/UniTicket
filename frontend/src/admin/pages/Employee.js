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
    lastName: '',
    secondLastName: '',
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
        toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Empleado Actualizado', life: 3000 });
      }
      else {
        _employee.id = createId();
        _employee.image = 'employee-placeholder.svg';
        _employees.push(_employee);
        toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Empleado Creado', life: 3000 });
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
    toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Empleado Eliminado', life: 3000 });
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

  // const leftToolbarTemplate = () => {
  //   return (
  //     <React.Fragment>
  //       <div className="my-2">
  //         <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
  //         <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedEmployees || !selectedEmployees.length} />
  //       </div>
  //     </React.Fragment>
  //   )
  // }

  // const rightToolbarTemplate = () => {
  //   return (
  //     <React.Fragment>
  //       <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
  //       <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
  //     </React.Fragment>
  //   )
  // }

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Nombre</span>
        {rowData.firstName} {rowData.firstSurname} {rowData.secondSurname}
      </>
    );
  }

  const imageBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Imagen</span>
        <img src={`assets/layout/images/default.jpg`} className="shadow-2" width="100" />
      </>
    )
  }

  const phoneBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Celular</span>
        {rowData.phoneNumber}
      </>
    );
  }

  const emailBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Correo</span>
        {rowData.email}
      </>
    );
  }


  const roleBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Nombre</span>
        {rowData.role===1 ? 'Administrador' : 'Supervisor'}
      </>
    );
  }

  const areaBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Área</span>
        {rowData.area}
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
        <Button icon="pi pi-pencil" className="action-dt" onClick={() => editEmployee(rowData)} />
        <Button icon="pi pi-trash" className="action-dt" onClick={() => confirmDeleteEmployee(rowData)} />
        <Button icon="pi pi-eye" className="action-dt" onClick={() => editEmployee(rowData)} />
      </div>
    );
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Administración de empleados <i className='pi pi-plus icn' onClick={openNew}></i></h5>
      <div className='filters'>
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Estado del empleado" />
        </span>
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar empleado..." />
        </span>
      </div>
    </div>
  );

  const employeeDialogFooter = (
    <>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveEmployee} />
    </>
  );
  const deleteEmployeeDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteEmployeeDialog} />
      <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteEmployee} />
    </>
  );

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

          <DataTable ref={dt} value={employees} selection={selectedEmployees} onSelectionChange={(e) => setSelectedEmployees(e.value)}
            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} Empleados"
            globalFilter={globalFilter} emptyMessage="Empleado no encontrado." header={header} responsiveLayout="scroll">
            <Column field="name" header="Nombre Completo" sortable body={nameBodyTemplate} headerStyle={{ width: '50%', minWidth: '10rem' }}></Column>
            <Column header="Image" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
            <Column field="price" header="Celular" body={phoneBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '8rem' }}></Column>
            <Column field="email" header="Correo" sortable body={emailBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
            <Column field="role" header="Rol" body={roleBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
            <Column field="area" header="Area" body={areaBodyTemplate} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
            <Column body={actionBodyTemplate}></Column>
          </DataTable>

          <Dialog visible={employeeDialog} style={{ width: '450px' }} header="Empleado" modal className="p-fluid" footer={employeeDialogFooter} onHide={hideDialog}>
            {employee.image && <img src={`assets/demo/images/employee/${employee.image}`} alt={employee.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
            <div className="field">
              <label htmlFor="name">Nombre</label>
              <InputText id="name" value={employee.firstName} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !employee.name })} />
              {submitted && !employee.firstName && <small className="p-invalid">El nombre es requerido.</small>}
            </div>
            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="lastName">Apellido Paterno</label>
                <InputText id="lastName" value={employee.firstSurname} onChange={(e) => onInputChange(e, 'lastName')} required autoFocus className={classNames({ 'p-invalid': submitted && !employee.lastName })} />
                {submitted && !employee.firstSurname && <small className="p-invalid">El apellido paterno es requerido.</small>}
              </div>
              <div className="field col">
                <label htmlFor="secondLastName">Apellido Materno</label>
                <InputText id="secondLastName" value={employee.secondSurname} onChange={(e) => onInputChange(e, 'secondLastName')} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="phone">Celular</label>
              <InputText id="phone" value={employee.phoneNumber} onChange={(e) => onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': submitted && !employee.phone })} />
              {submitted && !employee.phoneNumber && <small className="p-invalid">El número de celular es requerido.</small>}
            </div>
            <div className="field">
              <label htmlFor="email">Correo</label>
              <InputText id="email" value={employee.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && !employee.email })} />
              {submitted && !employee.email && <small className="p-invalid">El correo es requerido.</small>}
            </div>
            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="role">Rol</label>
                <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="role" placeholder="Seleccione el rol" />
              </div>
              <div className="field col">
                <label htmlFor="area">Área</label>
                <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="area" placeholder="Seleccione la área" />
              </div>
            </div>
          </Dialog>

          <Dialog visible={deleteEmployeeDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteEmployeeDialogFooter} onHide={hideDeleteEmployeeDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {employee && <span>Estás seguro de que desea elimiar al empleado <b>{employee.name}</b>?</span>}
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