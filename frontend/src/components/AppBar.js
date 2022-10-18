import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Avatar } from 'primereact/avatar';

export const AppBar = (props) => {

  const attention = 'CAJA';
  return (
    <div className="layout-bar">
      <img className="layout-bar-logo" src='assets/layout/images/uniticket-logo-white.svg' alt="logo" />

      <div className="layout-topbar-campus">
        <h1>ATENCION EN {attention} </h1>
      </div>
    </div>
  );
}