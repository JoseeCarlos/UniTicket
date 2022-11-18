import React, { useState, useEffect, useRef } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider'
import '../recursos/css/Quejas.css'
import { Galleria } from 'primereact/galleria';
import { FotoServicio } from '../servicio/FotoServicio';
import { InputTextarea } from 'primereact/inputtextarea';
import { TicketServicio } from '../servicio/TicketServicio';
import { AtencionServicio } from '../servicio/AtencionServicio';
import { QuejasServicio } from '../servicio/QuejasServicio';
import { Toast } from "primereact/toast";

const Quejas = () => {

  const [value1, setValue1] = useState('');
  const [imagenes, establecerImagenes] = useState(null);
  const [razonQueja, establecerArea] = useState(null);
  const [antencionTicket, establecerLugar] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [value2, setValue2] = useState('');

  const fotoServicio = new FotoServicio();
  const ticketServicio = new TicketServicio();
  const atencionServicio = new AtencionServicio();
  const quejasServicio = new QuejasServicio();

  const [ticketSeleccionado, establecerTicketSeleccionado] = useState([]);
  const [atenciones, establecerAtenciones] = useState([]);
  const [atencion, establecerAtencion] = useState([]);
  const [razonesQuejas, establecerRazonesQuejas] = useState([]);
  const [razonQuejas, establecerRazonQuejas] = useState([]);
  const toast = useRef(null);
  const [tipoAtencion, establecerTipoAtencion] = useState([]);

  const quejaVacia = {
    IdQueja: null,
    TipoQueja: 0,
    IdRazonQueja: 0,
    IdAtencion: 0,
    Estado: 0,
    FechaRegistro: 0,
    FechaModificacion: 0,
    Descripcion: '',
    IdUsuarioRegistro: 1
  }

  const [queja, establecerQueja] = useState(quejaVacia);

  useEffect(() => {
    ticketServicio.obtenerTicketsUsuario(parseInt(sessionStorage.getItem('userId'))).then(datos => {
      console.log(datos)
      establecerImagenes(datos)
    });

    quejasServicio.obtenerRazonQuejas().then(datos => {
      console.log(datos);
      establecerRazonesQuejas(datos);
    })
  }, []);

  const listaRazon = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ];

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

  const guardarQueja = () => {
    console.log(queja);
    quejasServicio.crearQueja(queja).then(datos => {
      if (datos.status === 200) {
        toast.current.show({ severity: 'success', summary: 'Queja', detail: 'Queja registrada', life: 3000 });
      }
      else {
        toast.current.show({ severity: 'error', summary: 'Queja', detail: 'Error al registrar queja', life: 3000 });
      }
    });
  }

  const selecionarRazonQueja = (e) => {
    let _queja = queja;

    queja.IdRazonQueja = e.value.IdRazonQueja;
    establecerQueja(_queja);
  }

  const selecionarAtencion = (e) => {
    let _queja = queja;
    queja.IdAtencion = e.value.IdAtencion;
    establecerQueja(_queja);
  }

  const guardarDescripcion = (e) => {
    let _queja = queja;
    queja.Descripcion = e.target.value;
    establecerQueja(_queja);
  }


  const carrusel = (elemento) => {
    establecerTicketSeleccionado(elemento);
    // console.log(elemento.idTicket)

    return (
      <div className='numero-ticket-lista' onClick={() => {
        atencionServicio.obtenerAtencionesTicket(elemento.idTicket).then(datos => {

          console.log(datos + "Hola")
          establecerAtenciones(datos);
        });
      }} >
        <img src='assets/layout/images/logo.svg' alt='Número de ticket' />
        <h5>{elemento.Codigo}-{elemento.Numero}</h5>
      </div>
    );
  }

  return (
    <div className='contenedor-quejas'>
      <Toast ref={toast} />
      <h1>QUEJAS</h1>

      <p>
        Mandanos tu queja y un encargado se asegurara de responderte lo más antes posible. <br></br>
        Tus comentarios nos ayudan a ser mejores.  UwU
      </p>

      <div className="galeria-queja">
        <Galleria value={imagenes} responsiveOptions={opcionesResponsivas} numVisible={2} circular style={{ maxWidth: '300px' }}
          thumbnail={carrusel} />
      </div>

      <Dropdown className='seleccionar-opcion razon'
        value={razonQuejas}
        options={razonesQuejas}
        optionLabel="Nombre"
        placeholder="Razon de la queja"
        onChange={(e) => {
          establecerRazonQuejas(e.value);
          selecionarRazonQueja(e);
          // console.log(e.value.IdAtencion)
          // atencionServicio.obtenerTipoAtencion(e.value.IdAtencion).then(datos =>{
          //   console.log(datos)
          //   establecerTipoAtencion(datos)
          // })
        }}
      />

      {/* <Dropdown className='seleccionar-opcion razon' value={dropdownValue} onChange={(e) => establecerArea(e.value)} options={listaRazon} placeholder="Razon de la queja" /> */}

      <div className='field descripcion'>
        <span className='p-float-label'>
          <InputTextarea id='descripcion' rows={5} cols={60} value={value2} onChange={(e) => {
            setValue2(e.target.value)
            guardarDescripcion(e);
          }} autoResize />
          <label htmlFor="descripcion">Descripcion de la queja</label>
        </span>
      </div>
      <Dropdown className='seleccionar-opcion tipo-atencion'
        value={atencion}
        options={atenciones}
        optionLabel="Atenciones"
        placeholder="Lugares de atencion de un ticket"
        onChange={(e) => {
          establecerAtencion(e.value);
          selecionarAtencion(e);
          console.log(e.value.IdAtencion)
          atencionServicio.obtenerTipoAtencion(e.value.IdAtencion).then(datos => {
            console.log(datos)
            establecerTipoAtencion(datos)
          })
        }}
      />

      {/* <Dropdown className='seleccionar-opcion tipo-atencion'  options={listaRazon}  label='Atenciones' placeholder="Seleccione un Lugar de Atención" /> */}


      <div className='resumen-atencion'>
        <h4>Resumen de la atencion</h4>
        <label><span>Area:</span> {tipoAtencion.NombreArea} </label>
        <label><span>Lugar de Atencion:</span> {tipoAtencion.NombreLugarAtencion}</label>
        <label><span>Numero de Mesa:</span> {tipoAtencion.Numero}</label>
        <label><span>Empleado:</span> {tipoAtencion.IdEmpleado}</label>
        <label><span>Tipo de atencion:</span> {tipoAtencion.TipoAtencion}</label>
      </div>

      <div className='resumen-queja'>
        <h4>Resumen de la Queja</h4>
        <label><span>Contacto:</span> juanperez@gmail.com</label>
        <label><span>Razon de la queja: </span>{razonQuejas.Nombre} </label>
        <label><span>Descripcion: </span>{value2}</label>
      </div>
      <Button label="ENVIAR QUEJA" onClick={() => {
        console.log(queja)
        guardarQueja()
      }}></Button>
    </div >
  );
}
export default Quejas;