import React from 'react';

export const AppBar = (props) => {

  var campus = 'Tiquipaya';

  return (
    <div className="disenio-bar">
      <img className="disenio-bar-logo" src='assets/layout/images/uniticket-logo.svg' alt="logo" />

      <div className="disenio-topbar-campus">
        <h3>Campus {campus}</h3>
      </div>
    </div>
  );
}