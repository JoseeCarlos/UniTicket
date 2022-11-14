import React, { useState } from 'react';
import '../recursos/VentanaCodigo.css';

const Modal = ({ estado, cambiarEstadoDialogo }) => {
  const [estadoLabel, cambiarEstadoLabel] = useState(false);
  const [codigo, cambiarCodigo] = useState(" ");

  const handleInput = event => {
    cambiarCodigo(event.target.value);
  }

  const validarCodigo = () => codigo === "123" ? cambiarEstadoDialogo(false) : cambiarEstadoLabel(true);

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