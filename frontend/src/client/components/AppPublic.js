import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopBar } from './AppTopBar';
import { AppFooter } from './AppFooter';

import ReservationOnline from '../pages/ReservationOnline';
import Information from '../pages/Information';
import { Home } from '../pages/Home';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';

const AppPublic = () => {


  return (
    <div className='user-page'>
      <AppTopBar />
      <div className='home-container'>
        <div className="layout-main">
          <Route path="/" exact render={() => <Home/>} />
          <Route path="/reservationOnline" component={ReservationOnline} />
          <Route path="/information" component={Information} />
        </div>
      </div>
      <AppFooter/>
    </div>
  );

}

export default AppPublic;
