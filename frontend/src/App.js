import React from 'react';
import logo from './logo.svg'
import './App.css';
import AppAdmin from './admin/components/AppAdmin';
import Login from './login/login';
import { Route, useLocation } from 'react-router-dom';
import Employee from './admin/pages/Employee';


const rol = 'Admin';

function App(){

    // const [layoutColorMode, setLayoutColorMode] = useState('light')
    // const location = useLocation()
    // console.log(location);
    // if(sessionStorage.getItem('role'))
    // {
    //     return (
    //         <div className="App">
    //             <AppAdmin/>
    //         </div>
    //     );
    // }
    sessionStorage.setItem('userId', "1");
    sessionStorage.setItem('name', "juan Perez");
    sessionStorage.setItem('role', "admin");
    return (
        <div className="App">
            <AppAdmin/>
        </div>
    );
}

export default App;