import React from 'react';
import { HashRouter, Route, Routes } from "react-router-dom";

import GenerarTicket from '../paginas/Ticket';
import VistaAtencion from '../paginas/VistaAtencion';
import Principal from '../paginas/Principal';
import Quejas from '../paginas/Quejas';
import '../recursos/App.css'

const App = () => {

  return (
    <HashRouter>
          <div>
            <Routes>
              <Route exact path="/" element={<Principal />} />
              <Route exact path="/generarTicket" element={<GenerarTicket />} />
              <Route exact path="/vistaAtencion" element={<VistaAtencion />} />
              <Route exact path="/quejas" element={<Quejas />} />
            </Routes>
          </div>
    </HashRouter>
  );
}

export default App;
