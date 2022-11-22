import React, { useEffect } from 'react';
import { NavLink, useHistory, Route } from 'react-router-dom';
import '../recursos/css/TopBar.css';

export const TopBar = (props) => {
  let redirect = useHistory();

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

  useEffect(() => {
    let foto = document.querySelector('#foto')
    let perfil = document.getElementById('perfil');
    if (foto != null)
      foto.addEventListener('click', function () {
        perfil.classList.toggle('abrir-menu');
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps 

  useEffect(() => {
    let cerrar = document.querySelector('#cerrar');
    if (cerrar != null)
    cerrar.addEventListener('click', function () {
        sessionStorage.clear();
      });
  }, []); //

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
          <img src='assets/demo/images/avatar/annafali.png' alt="Foto de perfil" id='foto' />
        </div>

        <div className='perfil-opciones' id='perfil'>
          <div className='sub-menu'>
            <div className='informacion'>
              <img src='assets/demo/images/avatar/annafali.png' alt="Foto de perfil"></img>
              <div>
                <span>Susan Ahoria</span>
                <hr></hr>
                <span>Estudiante</span>
              </div>
            </div>
            <hr></hr>
            <button id='cerrar'>Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </div>
  );
}