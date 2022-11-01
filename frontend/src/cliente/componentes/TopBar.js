import React  from 'react';
import { NavLink } from 'react-router-dom';
import '../recursos/css/TopBar.css';
import { Avatar } from 'primereact/avatar';

export const TopBar = (props) => {

  return (
    <div className="disenio-bar">
      <img className="disenio-bar-logo" src='assets/layout/images/uniticket-logo-white.svg' alt="logo" />

      <div className='enlaces-foto'>
        <div className='enlaces'>
        <NavLink to="/">
            INICIO
          </NavLink>
          <NavLink to="/reservacionEnLinea">
            MIS RESERVAS
          </NavLink>
          <NavLink to="/tramites">
            TRÁMITES
          </NavLink>
          <NavLink to="/informacion">
            INFORMACIÓN
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