import React from 'react';
import { TopBar } from '../componentes/TopBar';
import '../recursos/ticket.css';
import { Image } from 'primereact/image';

const Ticket = () => {

  var tipoAtencion = true;
  var tipoArea = false;
  var tipoUsuario = false;
  var columnas = false;

  return (
    <div className='contenedor-ticket'>
      <TopBar></TopBar>
      <div className={`tarjetas-ticket col-${columnas}`}>

        <div className={`tarjeta-ticket ${tipoAtencion}`}>
          <h2>¿TIPO DE ATENCIÓN?</h2>
          <div className='tarjeta-opciones'>
            <div className='opcion'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>GENERAL</h3>
            </div>

            <div className='opcion'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>3RA EDAD</h3>
            </div>
          </div>
        </div>

        <div className={`tarjeta-ticket ${tipoArea}`}>
          <h2>¿ÁREA DE ATENCIÓN?</h2>
          <div className={`tarjeta-opciones`}>
            <div className='opcion'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>CAJAS</h3>
            </div>

            <div className='opcion'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>PLATAFORMA</h3>
            </div>
          </div>
        </div>

        <div className={`tarjeta-ticket ${tipoUsuario}`}>
          <h2>¿QUÉ USUARIO ES?</h2>
          <div className='tarjeta-opciones'>
            <div className='opcion'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>ESTUDIANTE</h3>
            </div>

            <div className='opcion'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>FAMILIAR</h3>
            </div>

            <div className='opcion'>
              <Image src="assets/layout/images/prov.jpg" />
              <h3>USUARIO COMUN</h3>
            </div>

            <div className='opcion'>
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