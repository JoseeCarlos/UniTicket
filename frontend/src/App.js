import React from 'react';
import './App.css';
import Administrador from './administrador/componentes/Administrador';
import Principal from './cliente/componentes/PaginaPrincipal';


import { Route, useLocation } from 'react-router-dom';

import EmpleadoAtencion from './empleado/paginas/EmpleadoAtencion';
// import AppPublic from './cliente/componentes/AppPublico';

import InicioSesion from './inicio-sesion/InicioSesion';

function App(){
    if(sessionStorage.getItem('role') == "admin")
    {
        return (
            <div className="App">
                <Administrador/>
            </div>
        );
    }
    if (sessionStorage.getItem('role') == "Empleado") {
        return (
            <div className="App">
                <EmpleadoAtencion />
            </div>
        );
    }
    if(sessionStorage.getItem('role') == "Estudiante")
    {
        return (
            <div className="App">
                <Principal/>
            </div>
        );
    }
    return (
        <div className="App">
            <InicioSesion/>
        </div>
    );
}

export default App;