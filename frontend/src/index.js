import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import VistaAtencion from './vista/pagina/vistaAtencion';
import AppPublico from './cliente/componentes/AppPublico';
import Inicio from './inicio-sesion/inicio-sesion'

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <Inicio></Inicio>
        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
