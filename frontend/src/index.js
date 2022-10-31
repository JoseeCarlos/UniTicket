import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import VistaAtencion from './vista/pagina/VistaAtencion';
import Principal from './cliente/componentes/PaginaPrincipal';
import Inicio from './inicio-sesion/Inicio-sesion';
import Empleado from './empleado/paginas/EmpleadoAtencion';
import Administrador from './administrador/componentes/Administrador'; /* Hola */

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <Principal></Principal>
        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
