import React from 'react';

export const AppBar = (props) => {

  var campus = 'Tiquipaya';
  return (
    <div className="layout-bar">
      <img className="layout-bar-logo" src='assets/layout/images/uniticket-logo.svg' alt="logo" />

      <div className="layout-topbar-campus">
        <h3>Campus {campus}</h3>
      </div>
    </div>
  );
}