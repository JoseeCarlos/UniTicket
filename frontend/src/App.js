import React from 'react';
import './App.css';
import AppAdmin from './administrador/components/AppAdmin';

import Inicio_Sesion from './inicio-sesion/inicio-sesion';
import { Route, useLocation } from 'react-router-dom';

import EmployeeAttention from './employee/paginas/EmpleadoAtencion';
import AppPublic from './cliente/componentes/AppPublico';

function App(){
    if(sessionStorage.getItem('role') == "admin")
    {
        return (
            <div className="App">
                <AppAdmin/>
            </div>
        );
    }
    if (sessionStorage.getItem('role') == "Empleado") {
        return (
            <div className="App">
                <EmployeeAttention />
            </div>
        );
    }
    if(sessionStorage.getItem('role') == "Estudiante")
    {
        return (
            <div className="App">
                <AppPublic/>
            </div>
        );
    }
    return (
        <div className="App">
            <Inicio_Sesion/>
        </div>
    );
}

export default App;