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
import { CampusService } from '../service/CampusService';
import { Dropdown } from 'primereact/dropdown';

const Campus = () => {
  let emptyCampus = {
    id: null,
    name: '',
    latitude: '',
    longitude: '',
    image: null,
    city: '',
    state: null,
    create_date: 0
  };

  const [campuss, setCampuss] = useState(null);
  const [campusDialog, setCampusDialog] = useState(false);
  const [deleteCampusDialog, setDeleteCampusDialog] = useState(false);
  const [deleteCampussDialog, setDeleteCampussDialog] = useState(false);
  const [campus, setCampus] = useState(emptyCampus);
  const [selectedCampuss, setSelectedCampuss] = useState(null);
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
    const campusService = new CampusService();
    campusService.getCampuss().then(data => setCampuss(data));
  }, []);

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  const openNew = () => {
    setCampus(emptyCampus);
    setSubmitted(false);
    setCampusDialog(true);
  }

  const hideDialog = () => {
    setSubmitted(false);
    setCampusDialog(false);
  }

  const hideDeleteCampusDialog = () => {
    setDeleteCampusDialog(false);
  }

  const saveCampus = () => {
    setSubmitted(true);

    if (campus.name.trim()) {
      let _campuss = [...campuss];
      let _campus = { ...campus };
      if (campus.id) {
        const index = findIndexById(campus.id);

        _campuss[index] = _campus;
        toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Campus Actualizado', life: 3000 });
      }
      else {
        _campus.id = createId();
        _campus.image = 'product-placeholder.svg';
        _campuss.push(_campus);
        toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Campus Creado', life: 3000 });
      }

      setCampuss(_campuss);
      setCampusDialog(false);
      setCampus(emptyCampus);
    }
  }

  const editCampus = (campus) => {
    setCampus({ ...campus });
    setCampusDialog(true);
  }

  const confirmDeleteCampus = (campus) => {
    setCampus(campus);
    setDeleteCampusDialog(true);
  }

  const deleteCampus = () => {
    let _campuss = campuss.filter(val => val.id !== campus.id);
    setCampuss(_campuss);
    setDeleteCampusDialog(false);
    setCampus(emptyCampus);
    toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Campus Eliminado', life: 3000 });
  }

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < campuss.length; i++) {
      if (campuss[i].id === id) {
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
    setDeleteCampussDialog(true);
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _campus = { ...campus };
    _campus[`${name}`] = val;

    setCampus(_campus);
  }

  // const leftToolbarTemplate = () => {
  //   return (
  //     <React.Fragment>
  //       <div className="my-2">
  //         <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
  //         <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedCampuss || !selectedCampuss.length} />
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

  const cityBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Ciudad</span>
        {rowData.city}
      </>
    );
  }

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="actions">
        <Button icon="pi pi-pencil" className="action-dt" onClick={() => editCampus(rowData)} />
        <Button icon="pi pi-trash" className="action-dt" onClick={() => confirmDeleteCampus(rowData)} />
        <Button icon="pi pi-eye" className="action-dt" onClick={() => editCampus(rowData)} />
      </div>
    );
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Administración de los campus <i className='pi pi-plus icn' onClick={openNew}></i></h5>
      <div className='filters'>
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Estado del campus" />
        </span>
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar campus..." />
        </span>
      </div>
    </div>
  );

  const campusDialogFooter = (
    <>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveCampus} />
    </>
  );
  const deleteCampusDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCampusDialog} />
      <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={deleteCampus} />
    </>
  );

  const onUpload = () => {
    toast.current.show({ severity: 'info', summary: 'Success', detail: 'Archivo subido', life: 3000 });
  }

  const chooseOptions = { icon: 'pi pi-fw pi-images', className:'p-button-upload' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', className: 'p-button-upload' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', className: 'p-button-upload' };

  return (
    <div className="grid crud-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}

          <DataTable ref={dt} value={campuss} selection={selectedCampuss} onSelectionChange={(e) => setSelectedCampuss(e.value)}
            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} Campus"
            globalFilter={globalFilter} emptyMessage="Campus no encontrado." header={header} responsiveLayout="scroll">
            <Column field="name" header="Campus" sortable body={nameBodyTemplate} headerStyle={{ width: '40%', minWidth: '10rem' }}></Column>
            <Column header="Image" body={imageBodyTemplate} headerStyle={{ width: '20%', minWidth: '10rem' }}></Column>
            <Column field="city" header="Ciudad" body={cityBodyTemplate} sortable headerStyle={{ width: '20%', minWidth: '8rem' }}></Column>
            <Column body={actionBodyTemplate} headerStyle={{ width: '20%', minWidth: '8rem' }}></Column>
          </DataTable>

          <Dialog visible={campusDialog} style={{ width: '450px' }} header="Campus" modal className="p-fluid" footer={campusDialogFooter} onHide={hideDialog}>
            {campus.image && <img src={`assets/demo/images/campus/${campus.image}`} alt={campus.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
            <div className="grid">
              <div className="col-12">
                <div className="card">
                  <h5>Imagen</h5>
                  <FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} accept="image/*" maxFileSize={10000000} chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions}/>
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="name">Nombre</label>
              <InputText id="name" value={campus.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !campus.name })} />
              {submitted && !campus.name && <small className="p-invalid">El nombre es requerido.</small>}
            </div>
            <div className="formgrid grid">
              AQUI TIENE QUE ESTAR EL MAPA
            </div>
            <div className="field">
              <label htmlFor="city">Ciudad</label>
              <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="city" placeholder="Seleccione la ciudad" />
            </div>
          </Dialog>

          <Dialog visible={deleteCampusDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCampusDialogFooter} onHide={hideDeleteCampusDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {campus && <span>Estás seguro de que desea elimiar al empleado <b>{campus.name}</b>?</span>}
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

export default React.memo(Campus, comparisonFn);