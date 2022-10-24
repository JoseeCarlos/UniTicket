import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/AppTopBar.css';
import { Avatar } from 'primereact/avatar';
import classNames from 'classnames';

export const AppTopBar = (props) => {

  return (
    <div className="layout-bar">
      <img className="layout-bar-logo" src='assets/layout/images/uniticket-logo-white.svg' alt="logo" />

      <div className='links-photo'>
        <div className='links'>
        <NavLink to="/">
            INICIO
          </NavLink>
          <NavLink to="/reservationOnline">
            MIS RESERVAS
          </NavLink>
          <NavLink to="/information">
            TRÁMITES
          </NavLink>
          <NavLink to="/information">
            INFORMACIÓN
          </NavLink>
        </div>

        <div className="layout-bar-photo">
          <span>Ana contreras</span>
          <Avatar image='assets/demo/images/avatar/annafali.png' alt="Foto de perfil" />
        </div>
      </div>
    </div>
  );
}