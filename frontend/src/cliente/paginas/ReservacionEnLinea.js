import React, { useState, useEffect, useRef } from 'react';
import { FotoServicio } from '../servicio/FotoServicio';
import { Galleria } from 'primereact/galleria';
import '../recursos/css/Reservacion.css';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { reservaService } from '../servicio/ReservacionEnLineaServicio';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const ReservacionEnLinea = () => {
  let reservaVacia = {
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

  const [imagenes, establecerImagenes] = useState(null);
  const [reservacionDialogo, establecerReservacionDialogo] = useState(false);
  const [reserva, establecerReserva] = useState(reservaVacia);
  const [selectedreserva1, setSelectedreserva1] = useState(null);
  const [envio, establecerEnvio] = useState(false);
  const toast = useRef(null);


  useEffect(() => {
    fotoServicio.getImages().then(datos => establecerImagenes(datos));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const abrirDialogo = () => {
    establecerEnvio(false);
    establecerReservacionDialogo(true);
  }

  const ocultarDialogo = () => {
    establecerEnvio(false);
    establecerReservacionDialogo(false);
  }

  const reservarTicket = () => {
    establecerEnvio(true);

    if (reserva.name.trim()) {
      toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Reservación exitosa', life: 3000 });

      establecerReservacionDialogo(false);
      establecerReserva(reservaVacia);
    }
  }

  const fotoServicio = new FotoServicio();

  const opcionesResponsivas = [
    {
      anchoMaximo: '1024px',
      numVisible: 5
    },
    {
      anchoMaximo: '960px',
      numVisible: 4
    },
    {
      anchoMaximo: '768px',
      numVisible: 3
    },
    {
      anchoMaximo: '560px',
      numVisible: 1
    }
  ];


  const elementoTemplate = (elemento) => {
    return (
      <div className='informacion-ticket'>
        <div className='numero-ticket'>
          <img src='assets/layout/images/logo.svg' alt='Número de ticket' />
          <h1>{elemento.title}</h1>
        </div>

        <div className='detalle-ticket'>
          s
        </div>
      </div>
    );
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Reservación de Ticket</h5>
    </div>
  );

  const reservaDialogFooter = (
    <>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={ocultarDialogo} />
      <Button label="Reservar" icon="pi pi-check" className="p-button-text" onClick={reservarTicket} />
    </>
  );

  const carrusel = (elemento) => {
    return (
      <div className='numero-ticket-lista'>
        <img src='assets/layout/images/logo.svg' alt='Número de ticket' />
        <h5>{elemento.title}</h5>
      </div>
    );
  }

  /* DATA TABLE */




  useEffect(() => {
    const reservaService = new reservaService();
    reservaService.getreservasSmall().then(data => setreservas(data));
  }, []);

  return (
    <div className='contenedor-reservacion'>
      <div className="galeria">
        <Galleria value={imagenes} responsiveOptions={opcionesResponsivas} numVisible={7} circular style={{ maxWidth: '650px' }}
          item={elementoTemplate} thumbnail={carrusel} />
      </div>
      <div className='nuevo-ticket'>
        <img src='assets/layout/images/logo.svg' alt='Nuevo ticket' />
        <i className='pi pi-plus'></i>
      </div>
      <h2>HISTORIAL DE TICKETS RESERVADOS</h2>
      <div className='historial-enLinea-ticket'>
        <Toast ref={toast} />
        <DataTable value={reservas} selectionMode="single"
          selection={selectedreserva1} onSelectionChange={e => setSelectedreserva1(e.value)}
          dataKey="id" responsiveLayout="stack" breakpoint="960px" paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </div>

      <Dialog visible={reservacionDialogo} style={{ width: '450px' }} header="reserva Details" modal className="p-fluid" footer={reservaDialogFooter} onHide={hideDialog}>
        {reserva.image && <img src={`assets/demo/images/reserva/${reserva.image}`} alt={reserva.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />}
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText id="name" value={reserva.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !reserva.name })} />
          {submitted && !reserva.name && <small className="p-invalid">Name is required.</small>}
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <InputTextarea id="description" value={reserva.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
        </div>

        <div className="field">
          <label className="mb-3">Category</label>
          <div className="formgrid grid">
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={reserva.category === 'Accessories'} />
              <label htmlFor="category1">Accessories</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={reserva.category === 'Clothing'} />
              <label htmlFor="category2">Clothing</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={reserva.category === 'Electronics'} />
              <label htmlFor="category3">Electronics</label>
            </div>
            <div className="field-radiobutton col-6">
              <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={reserva.category === 'Fitness'} />
              <label htmlFor="category4">Fitness</label>
            </div>
          </div>
        </div>

        <div className="formgrid grid">
          <div className="field col">
            <label htmlFor="price">Price</label>
            <InputNumber id="price" value={reserva.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
          </div>
          <div className="field col">
            <label htmlFor="quantity">Quantity</label>
            <InputNumber id="quantity" value={reserva.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly />
          </div>
        </div>
      </Dialog>
    </div >
  );
}
export default ReservacionEnLinea;