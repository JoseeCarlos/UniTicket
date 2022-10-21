import React, { useState } from 'react';
import { AppBar } from '../components/AppBar';
import '../assets/ticket.css';
import { Image } from 'primereact/image';

const Ticket = () => {

  var typeAttention = true;
  var typeArea = false;
  var typeUser = false;
  var columns = false;

  return (
    <div className='container-ticket'>
      <AppBar></AppBar>
      <div className={`cards-ticket col-${columns}`}>

        <div className={`card-ticket ${typeAttention}`}>
          <h2>¿TIPO DE ATENCIÓN?</h2>
          <div className='card-options'>
            <div className='option'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>GENERAL</h3>
            </div>

            <div className='option'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>3RA EDAD</h3>
            </div>
          </div>
        </div>

        <div className={`card-ticket ${typeArea}`}>
          <h2>¿ÁREA DE ATENCIÓN?</h2>
          <div className={`card-options`}>
            <div className='option'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>CAJAS</h3>
            </div>

            <div className='option'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>PLATAFORMA</h3>
            </div>
          </div>
        </div>

        <div className={`card-ticket ${typeUser}`}>
          <h2>¿QUÉ USUARIO ES?</h2>
          <div className='card-options'>
            <div className='option'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>ESTUDIANTE</h3>
            </div>

            <div className='option'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>FAMILIAR</h3>
            </div>

            <div className='option'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>USUARIO COMUN</h3>
            </div>

            <div className='option'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>PADRE O TUTOR</h3>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
export default Ticket;