import React, { useState, useEffect } from 'react';
import { TopBar } from '../componentes/TopBar';
import '../recursos/Quejas.css'; 
import '../recursos/App.css'
import { RazonQuejaServicio } from '../servicio/RazonQuejaServicio';

const App = () => {

  const quejaPresencialVacia = {
    IdQueja: '',
    TipoQueja: '',
    IdRazonQueja: '',
    IdAtencion: '',
    Estado: '',
    FechaRegistro: '',
    FechaModificacion: '',
    Nombre: '',
    Contacto: ''
  }
  const [quejaPresencial, establecerQuejaPresencial] = useState(quejaPresencialVacia);
  const [razonesQueja, establecerRazonesQueja] = React.useState([]);
  const [razonQueja, establecerRazonQueja] = useState(null);


  const razonQuejaServicio = new RazonQuejaServicio()
  useEffect(() => {
    razonQuejaServicio.obtenerRazonesQueja().then(datos => {
      console.log(datos);
      establecerRazonesQueja(datos);
    }
    );


  }, []);


  const onChangeContacto = (e, name) => {
    let _quejaPresencial = { ...quejaPresencial };
    _quejaPresencial[name] = e.target.value;
    establecerQuejaPresencial(_quejaPresencial);
    console.log(e.target.value);
  }

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
            <input type='text' placeholder=' ' onChange={(e) => onChangeContacto(e, 'Contacto')} name='contacto' className='inpt' />
            <label htmlFor='contacto' className='inpt_label'>Contacto</label>
          </div>
          <div className='campo'>
            <select className='inpt' name='razon' onChange={event => {
              establecerRazonQueja(event.target.value);
              console.log(event.target.value)
            }}>
              {
                razonesQueja.map((razon, index) => {
                  return <option key={index} value={razon.Nombre}>{razon.Nombre}</option>
                }
                )
              }
            </select>
            <label htmlFor='razon' className='inpt_label'>Razón de la queja</label>
          </div>
        </div>
        <div className='resumen'>
          <fieldset>
            <legend>RESUMEN DE LA QUEJA</legend>
            <label>Contacto</label>
            <p>{quejaPresencial.Contacto}</p>
            <label>Razón</label>
            <label> {razonQueja} </label>
          </fieldset>
        </div>
        <button onClick={() => {
          console.log(quejaPresencial);
        }} >ENVIAR QUEJA</button>
      </div>
    </div>
  );
}

export default App;
