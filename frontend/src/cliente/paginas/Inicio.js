import React from 'react';
import '../recursos/css/Inicio.css'
import { Card } from 'primereact/card';

export const Inicio = (props) => {

  const footer1 = <span> Como primer paso, ingresa al link llamado "MIS RESERVAS" que esta ubicado en la parte superior da la barra de navegación. </span>;
  const footer2 = <span> Haz click en el simbolo de "+" para generar un nuevo ticket. </span>;
  const footer3 = <span> Llena el siguiente formulario con información del lugar de atención donde quieres el ticket. </span>;
  const footer4 = <span> Haz click en "GENERAR TICKET" ¡y listo! ya tienes tu ticket de reserva. </span>;

  return (
    <div className="inicio">
      <div className='pancarta'>
        <h1>UNITICKET</h1>
        <span>Juntos para toda la vida</span>
      </div>
      <div className='pasos'>
        <h2>Pasos para generar tu Ticket</h2>
        <div className='tarjetas-pasos'>
          <Card className='tarjeta' footer={footer1} header='PASO 1'>
            <div className='img-paso'>
            </div>
          </Card>
          <Card className='tarjeta' footer={footer2} header='PASO 2'>
            <div className='img-paso'>
            </div>
          </Card>
          <Card className='tarjeta' footer={footer3} header='PASO 3'>
            <div className='img-paso'>
            </div>
          </Card>
          <Card className='tarjeta' footer={footer4} header='PASO 4'>
            <div className='img-paso'>
            </div>
          </Card>
        </div>
      </div>

      <div className='seccion-informacion'>
        <h2>Obtén Información sobre los <a href='/informacion'>trámites.</a></h2>
        <div className='descripcion'>
          <p>
            En UNITICKET, también encontrarás información sobre algunos tramites que hay en la Universidad.
            <ul>
              <li>Lista de tramites que puedes realizar.</li>
              <li>Requisitos para tus tramites.</li>
              <li>Descripción de los tramites a realizar.</li>
            </ul>
          </p>
          <button className='p-button'> VER AHORA </button>
        </div>
        <div className='contenedor-img'>
          <img src='assets/layout/images/logo-uni.jpg' alt='Logo Univalle'/>
        </div>
      </div>
    </div>
  );
}