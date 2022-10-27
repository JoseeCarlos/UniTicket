import React from 'react';
import { Route } from 'react-router-dom';

import { TopBar } from './TopBar';
import { Footer } from './Footer';

import ReservacionEnLinea from '../paginas/ReservacionEnLinea';
import Informacion from '../paginas/Informacion';
import { Inicio } from '../paginas/Inicio';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';

const PaginaPrincipal = () => {


  return (
    <div className='usuario-pagina'>
      <TopBar />
      <div className='inicio-contenedor'>
        <div className="disenio-principal">
          <Route path="/" exact render={() => <Inicio/>} />
          <Route path="/reservacionEnLinea" component={ReservacionEnLinea} />
          <Route path="/informacion" component={Informacion} />
        </div>
      </div>
      <Footer/>
    </div>
  );

}

export default PaginaPrincipal;
