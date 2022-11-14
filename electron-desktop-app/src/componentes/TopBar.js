import React from 'react';

export const TopBar = (props) => {

  var campus = 'Tiquipaya';
  var lugarAtencion = 'Cajas';

  return (
    <div className="disenio-bar">
      <img className="disenio-bar-logo" src='assets/layout/images/uniticket-logo-white.svg' alt="logo" />

      <div className="disenio-topbar-campus">
        <h3>{lugarAtencion} {campus}</h3>
      </div>
    </div>
  );
}