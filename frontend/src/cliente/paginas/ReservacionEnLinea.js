import React, { useState, useEffect, useRef } from 'react';
import { Galleria } from 'primereact/galleria';
import '../recursos/css/Reservacion.css';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { ReservaServicio } from '../servicio/ReservacionEnLineaServicio';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { TicketServicio } from '../servicio/TicketServicio';
import { Calendar } from 'primereact/calendar';

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
  const [historial, establecerHistorial] = useState([]);
  const [horario, establecerHorario] = useState([]);
  const [dates2, setDates2] = useState(null);
  const [date7, setDate7] = useState(null);

  const ticketServicio = new TicketServicio();

  useEffect(() => {
    ticketServicio.obtenerTicketsUsuario(parseInt(sessionStorage.getItem('userId'))).then(datos => {
      console.log(datos)
      establecerImagenes(datos)
    });

    ticketServicio.obtenerHistorialTicket(sessionStorage.getItem('userId')).then(datos => {
      console.log(datos)
      establecerHistorial(datos)
    });
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
          <h1>{elemento.Codigo}-{elemento.Numero}</h1>
        </div>

        <div className='detalle-ticket'>
          <h3>Datos de la reserva <span>Ticket {elemento.Codigo}-{elemento.Numero}</span> </h3>
          <label>Lugar de atención: <span>{elemento.NombreLugar}</span> </label>
          <label>Área: <span>{elemento.Nombre}</span></label>
          <label>Fecha y Hora: <span>{elemento.FechaHoraReservacion}</span></label>
          <label>Sitio: <span>{elemento.Id_Sitio}</span></label>
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
    console.log(elemento)
    return (
      <div className='numero-ticket-lista'>
        <img src='assets/layout/images/logo.svg' alt='Número de ticket' />
        <h5>{elemento.Codigo}-{elemento.Numero}</h5>
      </div>
    );
  }

  return (
    <div className='contenedor-reservacion'>
      <div className="galeria">
        <Galleria value={imagenes} responsiveOptions={opcionesResponsivas} numVisible={3} circular style={{ maxWidth: '650px' }}
          item={elementoTemplate} thumbnail={carrusel} />
      </div>
      <div className='nuevo-ticket' onClick={abrirDialogo}>
        <img src='assets/layout/images/logo.svg' alt='Nuevo ticket' />
        <i className='pi pi-plus'></i>
      </div>
      <div className='nuevo-ticket-flotante'>
        <button onClick={abrirDialogo}>
          <i className='pi pi-plus'></i>
        </button>
      </div>
      <h2>HISTORIAL DE TICKETS RESERVADOS</h2>
      <div className='historial-enLinea-ticket'>
        <Toast ref={toast} />
        <DataTable value={historial} selection={reservaSeleccionada} onSelectionChange={e => establecerReservaSeleccionada(e.value)}
          dataKey="id" responsiveLayout="stack" breakpoint="760px" paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
          <Column field="Codigo" header="Ticket"></Column>
          <Column field="FechaHoraReservacion" header="Fecha"></Column>
          <Column field="Nombre" header="Área"></Column>
          <Column field="NombreLugar" header="Lugar de atención"></Column>
        </DataTable>
      </div>

      <Dialog visible={reservacionDialogo} style={{ width: '550px' }} header={titulo} modal className="p-fluid" footer={botones} onHide={ocultarDialogo}>
        <div className='contenedor-dialogo'>
          <div className='numero-ticket-reserva'>
            <img className='imagen-ticket' src='assets/layout/images/logo.svg' alt='Número de ticket' />
            <h5>R-06</h5>
          </div>

          <div className='datos-nueva-reserva'>
            <div className='agrupar'>
              <label>Sede Académica: </label>
              <Dropdown className='dropdown' value={seleccionArea} options={citySelectItems} onChange={(e) => establecerSeleccionArea(e.value)} placeholder="Seleccione una sede" />
            </div>

            <div className='agrupar'>
              <label>Sitio: </label>
              <Dropdown className='dropdown' value={seleccionArea} options={citySelectItems} onChange={(e) => establecerSeleccionArea(e.value)} placeholder="Seleccione un Sitio" />
            </div>

            <div className='agrupar'>
              <label>Área: </label>
              <Dropdown className='dropdown' value={seleccionArea} options={citySelectItems} onChange={(e) => establecerSeleccionArea(e.value)} placeholder="Seleccione un Área" />
            </div>

            <div className="agrupar">
              <label htmlFor="range">Fecha y Hora:</label>
              <Calendar id="range" value={dates2} onChange={(e) => setDates2(e.value)} className='calendario' />
            </div>

            <div className="agrupar">
              <label htmlFor="time24">Hora de reserva: </label>
              <Calendar id="time24" value={date7} onChange={(e) => setDate7(e.value)} timeOnly hourFormat="12" className='calendario' />
            </div>
          </div>
        </div>
      </Dialog>
    </div >
  );
}
export default ReservacionEnLinea;