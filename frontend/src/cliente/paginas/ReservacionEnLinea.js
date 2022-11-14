import React, { useState, useEffect, useRef } from 'react';
import { FotoServicio } from '../servicio/FotoServicio';
import { Galleria } from 'primereact/galleria';
import '../recursos/css/Reservacion.css';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { ReservaServicio } from '../servicio/ReservacionEnLineaServicio';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

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

  const citySelectItems = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ];

  const [imagenes, establecerImagenes] = useState(null);
  const [reservacionDialogo, establecerReservacionDialogo] = useState(false);
  const [reserva, establecerReserva] = useState(reservaVacia);
  const [reservas, establecerReservas] = useState(null);
  const [reservaSeleccionada, establecerReservaSeleccionada] = useState(null);
  const [envio, establecerEnvio] = useState(false);
  const [horaSeleccionada, comprobarHoraSeleccionada] = useState(null);
  const [seleccionArea, establecerSeleccionArea] = useState(null);
  const toast = useRef(null);


  useEffect(() => {
    fotoServicio.getImages().then(datos => establecerImagenes(datos));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    const reservaServicio = new ReservaServicio();
    reservaServicio.getProductsSmall().then(datos => establecerReservas(datos));
  }, []);

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
          <h1>CR-1</h1>
        </div>

        <div className='detalle-ticket'>
          <h3>Datos de la reserva</h3>
          <label>Lugar de atención: <span>Tiquipaya</span> </label>
          <label>Área: <span>Tiquipaya</span></label>
          <label>Fecha y Hora: <span>Tiquipaya</span></label>
          <label>Sitio: <span>Tiquipaya</span></label>
        </div>
      </div>
    );
  }

  const titulo = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Reservación de Ticket</h5>
    </div>
  );

  const botones = (
    <>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={ocultarDialogo} />
      <Button label="Reservar" icon="pi pi-check" className="p-button" onClick={reservarTicket} />
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

  return (
    <div className='contenedor-reservacion'>
      <div className="galeria">
        <Galleria value={imagenes} responsiveOptions={opcionesResponsivas} numVisible={7} circular style={{ maxWidth: '650px' }}
          item={elementoTemplate} thumbnail={carrusel} />
      </div>
      <div className='nuevo-ticket' onClick={abrirDialogo}>
        <img src='assets/layout/images/logo.svg' alt='Nuevo ticket' />
        <i className='pi pi-plus'></i>
      </div>
      <h2>HISTORIAL DE TICKETS RESERVADOS</h2>
      <div className='historial-enLinea-ticket'>
        <Toast ref={toast} />
        <DataTable value={reservas} selectionMode="single"
          selection={reservaSeleccionada} onSelectionChange={e => establecerReservaSeleccionada(e.value)}
          dataKey="id" responsiveLayout="stack" breakpoint="960px" paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
          <Column field="ticket" header="Ticket"></Column>
          <Column field="fecha" header="Fecha"></Column>
          <Column field="area" header="Área"></Column>
          <Column field="atencion" header="Lugar de atención"></Column>
        </DataTable>
      </div>

      <Dialog visible={reservacionDialogo} style={{ width: '450px' }} header={titulo} modal className="p-fluid" footer={botones} onHide={ocultarDialogo}>

        <div className='contenedor-dialogo'>
          <div className='numero-ticket-reserva'>
            <img src='assets/layout/images/logo.svg' alt='Número de ticket' />
            <h5>R-06</h5>
          </div>

          <div className='datos-nueva-reserva'>
            <div className='agrupar'>
              <label>Sitio: </label>
              <Dropdown className='dropdown' value={seleccionArea} options={citySelectItems} onChange={(e) => establecerSeleccionArea(e.value)} placeholder="Seleccione un Sitio" />
            </div>

            <div className='agrupar'> 
              <label>Área: </label>
              <Dropdown className='dropdown' value={seleccionArea} options={citySelectItems} onChange={(e) => establecerSeleccionArea(e.value)} placeholder="Seleccione un Área" />
            </div>

            <div className='agrupar'>
              <label>Fecha y Hora: </label>
              <h5>12/21/2343 17:34</h5>
            </div>
          </div>

          <DataTable className='datatable-horas' selectionMode="multiple" cellSelection 
                     selection={horaSeleccionada} onSelectionChange={e => comprobarHoraSeleccionada(e.value)} 
                     dataKey="id" responsiveLayout="scroll"
                     emptyMessage="Sin atención.">
            <Column field="lunes" header="Lunes"></Column>
            <Column field="martes" header="Martes"></Column>
            <Column field="miercoeles" header="Miercoles"></Column>
            <Column field="jueves" header="Jueves"></Column>
            <Column field="viernes" header="Viernes"></Column>
            <Column field="sabado" header="Sabado"></Column>
          </DataTable>
        </div>

      </Dialog>
    </div >
  );
}
export default ReservacionEnLinea;