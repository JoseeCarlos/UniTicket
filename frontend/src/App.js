import React from 'react';
import './App.css';
import Administrador from './administrador/componentes/Administrador';
import Principal from './cliente/componentes/PaginaPrincipal';

let rol = 'Admin';

function App(){

    return (
        <div className="App">
            { rol === 'Admin' ? <Principal></Principal> : <Principal></Principal> } 
        </div>
    );
}

export default App;