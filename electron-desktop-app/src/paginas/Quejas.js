import React from 'react';
import { TopBar } from '../componentes/TopBar';
import '../recursos/Quejas.css';

const Quejas = () => {

  return (
    <div className='contenedor'>
      <TopBar></TopBar>
      <div className='contenedor-queja'>
        <h2>QUEJA</h2>
        <div className='texto-informativo'>
          <p>
            Mandanos tu queja y un encargado se asegurara de responderte lo más antes posible.
            Tus comentarios nos ayudan a ser mejores.  UwU
          </p>
        </div>
        <div className='campos'>
          <div className='grupo'>
            <div className='campo'>
              <input type='text' placeholder=' ' name='ticket' className='inpt' />
              <label htmlFor='ticket' className='inpt_label'>Número de Ticket</label>
            </div>
            <div className='campo'>
              <select className='inpt' name='tipo_atencion'>
                <option>2</option>
                <option>4</option>
              </select>
              <label htmlFor='tipo_atencion' className='inpt_label'>Atenciones del Ticket</label>
            </div>
          </div>
          <div className='campo'>
            <input type='text' placeholder=' ' name='contacto' className='inpt' />
            <label htmlFor='contacto' className='inpt_label'>Contacto</label>
          </div>
          <div className='campo'>
            <select className='inpt' name='razon'>
              <option>2</option>
              <option>4</option>
            </select>
            <label htmlFor='razon' className='inpt_label'>Razón de la queja</label>
          </div>
        </div>
        <div className='resumen'>
          <fieldset>
            <legend>RESUMEN DE LA QUEJA</legend>
            <label>Contacto</label>
            <label>Razón</label>
          </fieldset>
        </div>
        <button>ENVIAR QUEJA</button>
      </div>
    </div >
  );
}
export default Quejas;