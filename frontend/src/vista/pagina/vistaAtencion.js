import React from 'react';
import { TopBar } from '../../componentes/TopBar';
import '../recursos/VistaAtencion.css';
import { Footer } from '../componentes/Footer';

const VistaAtencion = () => {

  function reloj() {
    let fecha = document.getElementById('fecha');
    let tiempo = document.getElementById('tiempo');

    let fecha_actual = new Date();

    let dia = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

    let mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    fecha.innerHTML = `${dia[fecha_actual.getDay()]}, ${fecha_actual.getDate()} 
                              de ${mes[fecha_actual.getMonth()]} de ${fecha_actual.getFullYear()}`;

    let hora = new Date();
    tiempo.innerHTML = hora.toLocaleTimeString();
  }

  setInterval(reloj, 1000);

  let filas  = 3;

  return (
    <div className='contenedor'>
      <TopBar></TopBar>
      <div className='contenedor-vista-atencion'>
        <div className='video-atencion'>
          <iframe className='video' src="https://www.youtube.com/embed/dWcwY8VWXf0?autoplay=1&controls=1" title="Patito Bailando" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          {/* <iframe className='video' src="https://www.youtube.com/embed/3J1O-vOa71s?autoplay=1&controls=1" title="Patito Bailando" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
          <div className='seccion-atencion'>
            <div className='titulo'><h1>EN ATENCIÓN</h1></div>
            <div className='lista-atencion'>
              <div className='col-1'>
                <div className='fila' style={{ height: `calc(100% / ${filas})` }}>Caja 1</div>
                <div className='fila' style={{ height: `calc(100% / ${filas})` }}>Caja 2</div>
                <div className='fila' style={{ height: `calc(100% / ${filas})` }}>Caja 3</div>
              </div>
              <div className='col-2'>
                <div className='fila animacion' style={{ height: `calc(100% / ${filas})` }}>G-01</div>
                <div className='fila animacion' style={{ height: `calc(100% / ${filas})` }}>G-02</div>
                <div className='fila animacion' style={{ height: `calc(100% / ${filas})` }}>G-03</div>
              </div>
            </div>
          </div>
        </div>

        <div className='en-espera'>
          <div className='reservacion'>
            <div className='titulo'><h1>RESERVACIÓN</h1></div>
            <div className='col-R' id='col-R'><h1>R-11 | 15:00</h1></div>
          </div>

          <div className='hora-titulo'>
            <div className='titulo'><h1>EN ESPERA</h1></div>
            <div className='hora'>
              <fieldset>
                <legend id='fecha'></legend>
                <h2 id='tiempo'>00:00:00</h2>
              </fieldset>
            </div>
          </div>

          <div className='lista-en-espera'>
            <div className='fila-1'>
              <div className='col'>G-06</div>
              <div className='col'>G-07</div>
              <div className='col'>G-08</div>
              <div className='col'>G-09</div>
            </div>
            <div className='fila-2'>
              <div className='col'>G-11</div>
              <div className='col'>G-12</div>
              <div className='col'>G-13</div>
              <div className='col'>G-14</div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div >
  );
}
export default VistaAtencion;