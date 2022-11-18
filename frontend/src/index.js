import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
// import VistaAtencion from './vista/pagina/VistaAtencion';
import Principal from './cliente/componentes/PaginaPrincipal';
// import Inicio from './inicio-sesion/InicioSesion';
// import Empleado from './empleado/paginas/EmpleadoAtencion';
// import Administrador from './administrador/componentes/Administrador';

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <App></App>
        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
);
