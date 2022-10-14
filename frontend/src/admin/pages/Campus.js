import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { PickList } from 'primereact/picklist';
import { OrderList } from 'primereact/orderlist';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { CampusService } from '../service/CampusService';
import { CityService } from '../service/CityService';
import { InputTextarea } from 'primereact/inputtextarea';
import { GMap } from 'primereact/gmap';

const ListDemo = () => {

  let emptyCampus = {
    campusId: null,
    name: '',
    description: '',
    latitude: '',
    longitude: '',
    cityId: '',
    status: '',
    createDate: '',
    updateDate: '2022-05-05',
    userIdCreate: '',
    userIdMod: '',
  };

  const dropdownValues = [
    { name: 'Habilitado', code: '1' },
    { name: 'Inhabilitado', code: '0' }
  ];

  const listValue = [
    { name: 'San Francisco', code: 'SF' },
    { name: 'London', code: 'LDN' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Berlin', code: 'BRL' },
    { name: 'Barcelona', code: 'BRC' },
    { name: 'Rome', code: 'RM' },
  ];

  const [dataviewValue, setDataviewValue] = useState(null);
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [campuss, setCampuss] = useState(null);
  const [campusDialog, setCampusDialog] = useState(false);
  const [deleteCampusDialog, setDeleteCampusDialog] = useState(false);
  const [deleteCampussDialog, setDeleteCampussDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [campus, setCampus] = useState(emptyCampus);
  const [dropdownValue, setDropdownValue] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const sortOptions = [
    { label: 'Habilitado', value: '1' },
    { label: 'Deshabilitado', value: '0' }
  ];

  const sortCity = [
    { label: 'La Paz', value: '1' },
    { label: 'Cochabamba', value: '0' }
  ];

  useEffect(() => {
    const campusService = new CampusService();
    campusService.getCampuss().then(data => {
      console.log(data);
      setDataviewValue(data)} );
    const cityService = new CityService();
    cityService.getCities().then(data => setCities(data) );
     

  }, []);

  const onSortChange = (event) => {
    const value = event.value;
    setSelectedCities(value.name)
    console.log(value.name);
  };


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
        console.log("update");
        console.log(_campus);
      }
      else {
        console.log("create");
        console.log(_campus);
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
    const campusService = new CampusService();
    console.log(campus);
    campusService.deleteCampus(campus).then(data => {
      console.log(data);
      } );
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

  const citySelected = (e) => {
    let _campus = { ...campus };
    _campus[`cityId`] = e.target.value.cityId;
    console.log(_campus);
    setCampus(_campus);
  }  
  const dataviewHeader = (
    <div className="grid grid-nogutter">
      <div className="col-6">
        <div className="grid grid-nogutter">
          <div className='col-6' style={{ textAlign: 'left' }}>
            <Dropdown value={sortKey} options={sortOptions} optionLabel="label" placeholder="Seleccionar estado" onChange={onSortChange} />
          </div>
          <div className='col-6' style={{ textAlign: 'left' }}>
            <Dropdown value={selectedCities} onChange={citySelected} options={cities} optionLabel="name" placeholder="Seleccione la ciudad" />
          </div>
        </div>
      </div>
      <div className="col-6" style={{ textAlign: 'right' }}>
        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
      </div>
    </div>
  );

  const dataviewListItem = (data) => {
    return (
      <div className="col-12">
        <div className="flex flex-column md:flex-row align-items-center p-3 w-full">
          <img src={`assets/images/campusDef.jpg`} alt={data.name} className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
          <div className="flex-1 text-center md:text-left">
            <div className="font-bold text-2xl">{data.name}</div>
            <div className="mb-3">{data.description}</div>
          </div>
          <div className="flex flex-row md:flex-column justify-content-between w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0">
            <Button icon="pi pi-pencil" className="mb-2 align-self-center md:align-self-end action-dt" onClick={() => editCampus(data)} />
            <Button icon="pi pi-trash" className="action-dt mb-2" onClick={() => confirmDeleteCampus(data.id)} />
            <Button icon="pi pi-eye" className="action-dt" onClick={() => editCampus(data.id)} />
          </div>
        </div>
      </div>
    );
  };

  const dataviewGridItem = (data) => {
    return (
      <div className="col-12 md:col-4">
        <div className="card m-3 border-1 surface-border">
          <div className="text-center">
            <img src={`assets/layout/images/campusDef.jpg`} alt={data.name} className="w-9 shadow-2 my-3 mx-0" />
            <div className="text-2xl font-bold">{data.name}</div>
            <div className="mb-3">{data.description}</div>
          </div>
          <div className="actions">
            <Button icon="pi pi-pencil" className="action-dt" onClick={() => editCampus(data)} />
            <Button icon="pi pi-trash" className="action-dt" onClick={() => confirmDeleteCampus(data)} />
            <Button icon="pi pi-eye" className="action-dt" onClick={() => editCampus(data)} />
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (data, layout) => {
    if (!data) {
      return;
    }

    if (layout === 'list') {
      return dataviewListItem(data);
    }
    else if (layout === 'grid') {
      return dataviewGridItem(data);
    }
  };

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

  const chooseOptions = { icon: 'pi pi-fw pi-images', className: 'p-button-upload' };
  const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', className: 'p-button-upload' };
  const cancelOptions = { icon: 'pi pi-fw pi-times', className: 'p-button-upload' };

  return (
    <div className="grid list-demo">
      <div className="col-12">
        <div className="card">
          <h5>Administración de los Campus <i className='pi pi-plus icn' onClick={openNew}></i></h5>
          <Toast ref={toast} />
          <DataView value={dataviewValue} layout={layout} paginator rows={9} sortOrder={sortOrder} sortField={sortField} itemTemplate={itemTemplate} header={dataviewHeader}></DataView>

          <Dialog visible={campusDialog} style={{ width: '450px' }} header="Campus" modal className="p-fluid" footer={campusDialogFooter} onHide={hideDialog}>
            {campus.image && <img src={`assets/demo/images/campus/${campus.image}`} alt={campus.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
            <div className="grid">
              <div className="col-12">
                <div className="card">
                  <h5>Imagen</h5>
                  <FileUpload name="demo[]" url="./upload.php" onUpload={onUpload} accept="image/*" maxFileSize={10000000} chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                </div>
              </div>
            </div>
            <div className="field">
              <label htmlFor="name">Nombre</label>
              <InputText id="name" value={campus.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !campus.name })} />
              {submitted && !campus.name && <small className="p-invalid">El nombre es requerido.</small>}
            </div>
            <div className="field">
              <label htmlFor="description">Descripción</label>
              <InputTextarea id="description" value={campus.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
            </div>
            <div className="formgrid grid">
              AQUI TIENE QUE ESTAR EL MAPA
            </div>
            <div className="field">
              <label htmlFor="city">Ciudad</label>
              <Dropdown value={selectedCities} onChange={citySelected} options={cities} optionLabel="name" placeholder="Seleccione la ciudad" />
            </div>
          </Dialog>

          <Dialog visible={deleteCampusDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCampusDialogFooter} onHide={hideDeleteCampusDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {campus && <span>Estás seguro de que desea elimiar el campus <b>{campus.name}</b>?</span>}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(ListDemo, comparisonFn);