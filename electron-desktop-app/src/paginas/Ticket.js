import React from 'react';
import { TopBar } from '../componentes/TopBar';
import '../recursos/ticket.css';

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
              <img src="assets/layout/images/prov.jpg" alt='Atención General' />
              <h3>GENERAL</h3>
            </div>

            <div className='opcion'>
              <img src="assets/layout/images/prov.jpg" alt='Atención 3ra Edad' />
              <h3>3RA EDAD</h3>
            </div>
          </div>
        </div>

        <div className={`tarjeta-ticket ${tipoArea}`}>
          <h2>¿ÁREA DE ATENCIÓN?</h2>
          <div className={`tarjeta-opciones`}>
            <div className='opcion'>
              <img src="assets/layout/images/prov.jpg" alt='Atención Cajas'/>
              <h3>CAJAS</h3>
            </div>

            <div className='opcion'>
              <img src="assets/layout/images/prov.jpg" alt='Atención Plataforma' />
              <h3>PLATAFORMA</h3>
            </div>
          </div>
        </div>

        <div className={`tarjeta-ticket ${tipoUsuario}`}>
          <h2>¿QUÉ USUARIO ES?</h2>
          <div className='tarjeta-opciones'>
            <div className='opcion'>
              <img src="assets/layout/images/prov.jpg" alt='Estudiante' />
              <h3>ESTUDIANTE</h3>
            </div>

            <div className='opcion'>
              <img src="assets/layout/images/prov.jpg" alt='Familiar'/>
              <h3>FAMILIAR</h3>
            </div>

            <div className='opcion'>
              <img src="assets/layout/images/prov.jpg" alt='Usuario común'/>
              <h3>USUARIO COMUN</h3>
            </div>

            <div className='opcion'>
              <img src="assets/layout/images/prov.jpg" alt='Padre o tutor'/>
              <h3>PADRE O TUTOR</h3>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
export default Ticket;