import React from 'react';
import '../assets/appBar.css';

export const AppBar = (props) => {

  const attention = 'CAJA';
  return (
    <div className="layout-bar">
      <img className="layout-bar-logo" src='assets/layout/images/uniticket-logo-white.svg' alt="logo" />

      <div className="layout-topbar-campus">
        <h1>ATENCIÓN EN {attention} </h1>
      </div>
    </div>
  );
}