import React from 'react';
import logo from './logo.svg'
import './App.css';
import AppAdmin from './admin/components/AppAdmin';
import Login from './login/login';

const rol = 'Admin';

function App(){

    return (
        <div className="App">
            { rol == 'Admin' ? <AppAdmin></AppAdmin> : '<AppPublic></AppPublic>' } 
        </div>
    );
}

export default App;