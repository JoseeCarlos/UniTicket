import React from 'react';
import '../recursos/TopBar.css';

export const TopBar = (props) => {

  let atencion = 'CAJA';

  return (
    <div className="disenio-bar">
      <img className="disenio-bar-logo" src='assets/layout/images/uniticket-logo-white.svg' alt="logo" />

      <div className="disenio-topbar-campus">
        <h1>ATENCIÓN EN {atencion} </h1>
      </div>
    </div>
  );
}