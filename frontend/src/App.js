import React from 'react';
import logo from './logo.svg'
import './App.css';
import AppAdmin from './admin/components/AppAdmin';
import Login from './login/login';
import { Route, useLocation } from 'react-router-dom';

import EmployeeAttention from './employee/page/EmployeeAttention';
import AppPublic from './client/components/AppPublic';

const rol = 'Admin';

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
            <Login/>
        </div>
    );
}

export default App;