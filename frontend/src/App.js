import React from 'react';
import './App.css';
import AppAdmin from './administrador/components/AppAdmin';
import AppPublico from './cliente/componentes/AppPublico';

let rol = 'Admin';

function App(){

    return (
        <div className="App">
            { rol === 'Admin' ? <AppAdmin></AppAdmin> : <AppPublico></AppPublico> } 
        </div>
    );
}

export default App;