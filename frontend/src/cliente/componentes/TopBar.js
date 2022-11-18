import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../recursos/css/TopBar.css';
import { Avatar } from 'primereact/avatar';

export const TopBar = (props) => {

  useEffect(() => {
    let btn = document.querySelector('#boton');
    let enlaces = document.querySelector('#enlaces');
    let enlace = document.querySelectorAll('#enlace');
    if (btn !== null || enlace !== null) {
      btn.addEventListener('click', function () {
        cambiarClases();
      });

      enlace.forEach(function (elemento) {
        elemento.addEventListener('click', function () {
          cambiarClases();
        });
      });

      function cambiarClases() {
        if (btn.classList.contains('activo')) {
          btn.classList.remove('activo');
          btn.classList.add('no-activo');
        } else {
          btn.classList.add('activo');
          btn.classList.remove('no-activo');
        }

        if (enlaces.classList.contains('enlaces-activo')) {
          enlaces.classList.remove('enlaces-activo');
          enlaces.classList.add('enlaces-no-activo');
        } else {
          enlaces.classList.add('enlaces-activo');
          enlaces.classList.remove('enlaces-no-activo');
        }
      }
    } else alert('NO DEBERIAS ESTAR VIENDO ESTO, EN CASO DE QUE ASI SEA INFORMA DE ESTE ERROR A NETVALLE')
  }, []); // eslint-disable-line react-hooks/exhaustive-deps 

  return (
    <div className="disenio-bar">
      <img className="disenio-bar-logo" src='assets/layout/images/uniticket-logo-white.svg' alt="logo" />

      <div className='menu'>
        <div id='boton' className='btn no-activo'>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id='enlaces' className='enlaces-foto enlaces-no-activo'>
        <div className='enlaces'>
          <NavLink id='enlace' to="/">
            INICIO
          </NavLink>
          <NavLink id='enlace' to="/reservacionEnLinea">
            MIS RESERVAS
          </NavLink>
          <NavLink id='enlace' to="/tramites">
            TRÁMITES
          </NavLink>
          <NavLink id='enlace' to="/informacion">
            INFORMACIÓN
          </NavLink>
          <NavLink id='enlace' to="/quejas">
            QUEJAS
          </NavLink>
        </div>

        <div className="disenio-bar-foto">
          <span>Ana contreras</span>
          <Avatar image='assets/demo/images/avatar/annafali.png' alt="Foto de perfil" />
        </div>
      </div>
    </div>
  );
}