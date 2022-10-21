import React, { useState } from 'react';
import { AppBar } from '../../components/AppBar';
import '../assets/view.css';
import { Image } from 'primereact/image';
import { AppFooterView } from '../components/AppFooter';

const ViewAttention = () => {

  function clock() {
    let display_date = document.getElementById('date');
    let display_time = document.getElementById('time');

    let date_now = new Date();

    let day = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

    let month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    display_date.innerHTML = `${day[date_now.getDay()]}, ${date_now.getDate()} 
                              de ${month[date_now.getMonth()]} de ${date_now.getFullYear()}`;

    let hour = new Date();
    display_time.innerHTML = hour.toLocaleTimeString();
  }

  setInterval(clock, 1000);

  const rows = 3;
  return (
    <div className='container'>
      <AppBar></AppBar>
      <div className='container-view-attention'>
        <div className='video-attention'>
          <iframe className='video' src="https://www.youtube.com/embed/dWcwY8VWXf0?autoplay=1&controls=1" title="Patito Bailando" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <div className='section-attention'>
            <div className='title'><h1>EN ATENCIÓN</h1></div>
            <div className='list-attention'>
              <div className='col-1'>
                <div className='row' style={{ height: `calc(100% / ${rows})` }}>Caja 1</div>
                <div className='row' style={{ height: `calc(100% / ${rows})` }}>Caja 2</div>
                <div className='row' style={{ height: `calc(100% / ${rows})` }}>Caja 3</div>
              </div>
              <div className='col-2'>
                <div className='row animation' style={{ height: `calc(100% / ${rows})` }}>G-01</div>
                <div className='row animation' style={{ height: `calc(100% / ${rows})` }}>G-02</div>
                <div className='row animation' style={{ height: `calc(100% / ${rows})` }}>G-03</div>
              </div>
            </div>
          </div>
        </div>

        <div className='on-hold'>
          <div className='reservation'>
            <div className='title'><h1>RESERVACIÓN</h1></div>
            <div className='col-R' id='col-R'><h1>R-11 | 15:00</h1></div>
          </div>

          <div className='hour-title'>
            <div className='title'><h1>EN ESPERA</h1></div>
            <div className='hour'>
              <fieldset>
                <legend id='date'></legend>
                <h2 id='time'></h2>
              </fieldset>
            </div>
          </div>

          <div className='list-on-hold'>
            <div className='row-1'>
              <div className='col'>G-06</div>
              <div className='col'>G-07</div>
              <div className='col'>G-08</div>
              <div className='col'>G-09</div>
            </div>
            <div className='row-2'>
              <div className='col'>G-11</div>
              <div className='col'>G-12</div>
              <div className='col'>G-13</div>
              <div className='col'>G-14</div>
            </div>
          </div>
        </div>
      </div>
      <AppFooterView></AppFooterView>
    </div >
  );
}
export default ViewAttention;