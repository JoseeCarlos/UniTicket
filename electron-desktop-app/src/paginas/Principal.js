import React, { useState } from 'react';
import '../recursos/Principal.css';
import { NavLink } from 'react-router-dom';
import Modal from './VentanaCodigo';

const Principal = () => {

  const [estadoDialogo, cambiarEstadoDialogo] = useState(true);
  
  return (
    <div className='contenedor-opciones'>
      <Modal estado={estadoDialogo} cambiarEstadoDialogo={cambiarEstadoDialogo}></Modal>
      <NavLink to="/generarTicket" className='opcion'>
        <div className='imagen'>
          <img src='assets/layout/images/ticket.jpg' alt='Ticket'></img>
        </div>
        <h3>GENERAR TICKET</h3>
      </NavLink>
      <NavLink to="/vistaAtencion" className='opcion'>
        <div className='imagen'>
          <img src='assets/layout/images/quejas.jpg' alt='Vista Atencion'></img>
        </div>
        <h3>VISTA PARA LA ATENCIÓN</h3>
      </NavLink>
      <NavLink to="/quejas" className='opcion'>
        <div className='imagen'>
          <img src='assets/layout/images/quejas.jpg' alt='Quejas'></img>
        </div>
        <h3>QUEJAS</h3>
      </NavLink>
    </div>
  );
}
export default Principal;