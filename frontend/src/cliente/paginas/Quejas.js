import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider'
import '../recursos/css/Quejas.css'
import { Galleria } from 'primereact/galleria';
import { FotoServicio } from '../servicio/FotoServicio';
import { InputTextarea } from 'primereact/inputtextarea';


const Quejas = () => {

  const [value1, setValue1] = useState('');
  const [imagenes, establecerImagenes] = useState(null);
  const [razonQueja, establecerArea] = useState(null);
  const [antencionTicket, establecerLugar] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [value2, setValue2] = useState('');

  const fotoServicio = new FotoServicio();

  useEffect(() => {
    fotoServicio.getImages().then(datos => establecerImagenes(datos));
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

  const carrusel = (elemento) => {
    return (
      <div className='numero-ticket-lista'>
        <img src='assets/layout/images/logo.svg' alt='Número de ticket' />
        <h5>{elemento.title}</h5>
      </div>
    );
  }

  return (
    <div className='contenedor-quejas'>
      <h1>QUEJAS</h1>

      <p>
        Mandanos tu queja y un encargado se asegurara de responderte lo más antes posible. <br></br>
        Tus comentarios nos ayudan a ser mejores.  UwU
      </p>

      <div className="galeria-queja">
        <Galleria value={imagenes} responsiveOptions={opcionesResponsivas} numVisible={3} circular style={{ maxWidth: '300px' }} thumbnail={carrusel} />
      </div>

      <Dropdown className='seleccionar-opcion razon' value={dropdownValue} onChange={(e) => establecerArea(e.value)} options={listaRazon} placeholder="Razon de la queja" />

      <div className='field descripcion'>
        <span className='p-float-label'>
          <InputTextarea id='descripcion' rows={5} cols={60} value={value2} onChange={(e) => setValue2(e.target.value)} autoResize />
          <label htmlFor="descripcion">Descripcion de la queja</label>
        </span>
      </div>

      <Dropdown className='seleccionar-opcion tipo-atencion' value={antencionTicket} options={listaRazon} onChange={(e) => establecerLugar(e.value)} placeholder="Seleccione un Lugar de Atención" />

      <div className='resumen-atencion'>
        <h4>Resumen de la atencion</h4>
        <label><span>Area:</span> Cajas</label>
        <label><span>Lugar de Atencion:</span> Cajas tiquipaya</label>
        <label><span>Numero de Mesa:</span> 1</label>
        <label><span>Empleado:</span> Juan perez</label>
        <label><span>Tipo de atencion:</span> Transferencia</label>
      </div>

      <div className='resumen-queja'>
        <h4>Resumen de la Queja</h4>
        <label><span>Contacto:</span> juanperez@gmail.com</label>
        <label><span>Razon de la queja:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit.</label>
        <label><span>Descripcion:</span> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</label>
      </div>
      <Button label="ENVIAR QUEJA"></Button>
    </div >
  );
}
export default Quejas;