import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import '../assets/Home.css'
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';

export const Home = (props) => {

  const footer1 = <span> Como primer paso, ingresa al link llamado "MIS RESERVAS" que esta ubicado en la parte superior da la barra de navegación. </span>;
  const footer2 = <span> Haz click en el simbolo de "+" para generar un nuevo ticket. </span>;
  const footer3 = <span> Llena el siguiente formulario con información del lugar de atención donde quieres el ticket. </span>;
  const footer4 = <span> Haz click en "GENERAR TICKET" ¡y listo! ya tienes tu ticket de reserva. </span>;

  return (
    <div className="home">
      <div className='banner'>
        <h1>UNITICKET</h1>
        <span>Juntos para toda la vida</span>
      </div>
      <div className='steps'>
        <h2>Pasos para generar tu Ticket</h2>
        <div className='cards-steps'>
          <Card className='card' footer={footer1} header='PASO 1'>
            <div className='img-step'>
            </div>
          </Card>
          <Card className='card' footer={footer2} header='PASO 2'>
            <div className='img-step'>
            </div>
          </Card>
          <Card className='card' footer={footer3} header='PASO 3'>
            <div className='img-step'>
            </div>
          </Card>
          <Card className='card' footer={footer4} header='PASO 4'>
            <div className='img-step'>
            </div>
          </Card>
        </div>
      </div>

      <div className='section-information'>
        <h2>Obtén <a href='/information'>Información</a> sobre los trámites.</h2>
        <div className='description'>
          <p>
            En esta página encontraras información sobre algunos tipos de tramites que hay en la Universidad.
            <ul>
              <li>Lista de tramites que puedes realizar.</li>
              <li>Requisitos para tus tramites.</li>
              <li>Descripción de los tramites a realizar.</li>
            </ul>
          </p>
          <button className='p-button'> VER AHORA </button>
        </div>
        <div className='container-img'>
          <img src='assets/layout/images/logo-uni.jpg' />
        </div>
      </div>
    </div>
  );
}