import React from 'react';
import { Route } from 'react-router-dom';

import { AppTopBar } from './AppTopBar';
import { AppFooter } from './AppFooter';

import ReservacionEnLinea from '../paginas/ReservacionEnLinea';
import Informacion from '../paginas/Informacion';
import { Inicio } from '../paginas/Inicio';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';

const AppPublico = () => {


  return (
    <div className='usuario-pagina'>
      <AppTopBar />
      <div className='inicio-contenedor'>
        <div className="disenio-principal">
          <Route path="/" exact render={() => <Inicio/>} />
          <Route path="/reservacionEnLinea" component={ReservacionEnLinea} />
          <Route path="/informacion" component={Informacion} />
        </div>
      </div>
      <AppFooter/>
    </div>
  );

}

export default AppPublico;
