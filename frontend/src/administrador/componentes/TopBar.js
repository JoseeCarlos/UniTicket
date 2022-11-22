import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

export const TopBar = (props) => {

    useEffect(() => {
        let foto = document.querySelector('#foto')
        let perfil = document.getElementById('perfil');
        if (foto != null)
          foto.addEventListener('click', function () {
            perfil.classList.toggle('abrir-menu');
          });
      }, []); // eslint-disable-line react-hooks/exhaustive-deps 
    
      useEffect(() => {
        let cerrar = document.querySelector('#cerrar');
        if (cerrar != null)
        cerrar.addEventListener('click', function () {
            sessionStorage.clear();
          });
      }, []);

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src='assets/layout/images/uniticket-logo.svg' alt="Logo UniTicket" />
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <div className="layout-topbar-photo">
                <img src='assets/demo/images/avatar/annafali.png' className={classNames("layout-topbar-photo", { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })} alt="Foto de perfil" id='foto' />
            </div>

            <div className='perfil-opciones' id='perfil'>
                <div className='sub-menu'>
                    <div className='informacion'>
                        <img src='assets/demo/images/avatar/annafali.png' alt="Foto de perfil"></img>
                        <div>
                            <span>{sessionStorage.getItem('usuario').toUpperCase()}</span>
                            <hr></hr>
                            <span>Estudiante</span>
                        </div>
                    </div>
                    <hr></hr>
                    <button id='cerrar'>Cerrar Sesión</button>
                </div>
            </div>
        </div>
    );
}
