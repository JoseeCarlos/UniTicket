import React from 'react';
import logo from './logo.svg'
import './App.css';
import AppAdmin from './admin/components/AppAdmin';
import Login from './login/login';
import { Route, useLocation } from 'react-router-dom';

import EmployeeAttention from './employee/page/EmployeeAttention';

const rol = 'Admin';

function App(){

    // const [layoutColorMode, setLayoutColorMode] = useState('light')
    // const location = useLocation()
    // console.log(location);
    if(sessionStorage.getItem('role') == "admin")
    {
        return (
            <div className="App">
                <AppAdmin/>
            </div>
        );
    }
    if(sessionStorage.getItem('role') == "Estudiante")
    {
        return (
            <div className="App">
                <EmployeeAttention/>
            </div>
        );
    }
    // sessionStorage.setItem('userId', "1");
    // sessionStorage.setItem('name', "juan Perez");
    // sessionStorage.setItem('role', "admin");
    return (
        <div className="App">
            <Login/>
        </div>
    );
}

export default App;