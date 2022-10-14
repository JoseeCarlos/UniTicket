import React, { useState } from 'react';
import { AppBar } from '../components/AppBar';
import '../assets/ticket.css';
import { Image } from 'primereact/image';

const Ticket = () => {

  const typeAttention = false;
  const typeArea = true;
  const typeUser = false;
  const columns = false;

  const typeAttentionChanged = () => {
    typeAttention = false;
    typeArea = true;
  };

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
              <h3>GENERAL</h3>
            </div>

            <div className='option'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>3RA EDAD</h3>
            </div>

            
            

          </div>
        </div>

        <div className={`card-ticket ${typeUser}`}>
          <h2>¿QUÉ USUARIO ES?</h2>
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


      </div>
    </div >
  );
}
export default Ticket;