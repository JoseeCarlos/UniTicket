import React, { useState } from 'react';
import '../recursos/VentanaCodigo.css';
import { TicketServicio } from "../servicio/TicketServicio";

const Modal = ({ estado, cambiarEstadoDialogo }) => {
  const [estadoLabel, cambiarEstadoLabel] = useState(false);
  const [codigo, cambiarCodigo] = useState(" ");

  const handleInput = event => {
    cambiarCodigo(event.target.value);
  }

  const validarCodigo = () => {
    const ticketServicio = new TicketServicio();
    ticketServicio.obtenerLugarAtencionCodigo(codigo).then(datos => {
      if (datos.IdLugarAtencion != null) {
        sessionStorage.setItem('lugarAtencion', datos.IdLugarAtencion)
        sessionStorage.setItem('nombre', datos.Nombre)
        sessionStorage.setItem('sitioId', datos.Id_Sitio)
        sessionStorage.setItem('sedeAcademicaId', datos.Id_Sede_Academica);
        sessionStorage.setItem('areaId', datos.IdArea);
        cambiarEstadoDialogo(false);
      } else cambiarEstadoLabel(true);
      
    });
  }

  return (
    <>
      {
        estado &&
        <div className='overlay'>
          <div className='contenedor-dialogo'>
            <div className='encabezado'>
              <img src='assets/layout/images/logo.svg' alt='Uniticket' />
              <h2>INGRESE EL CÓDIGO DE ACCESO</h2>
            </div>
            <div className='contenido'>
              <input className='codigo-acceso' type='text' placeholder='Ingrese el código de acceso' onChange={handleInput} />
              {estadoLabel && <label>Código incorrecto</label>}
              <button onClick={validarCodigo}>VALIDAR CÓDIGO</button>
            </div>

          </div>
        </div>
      }
    </>
  )
}

export default Modal;