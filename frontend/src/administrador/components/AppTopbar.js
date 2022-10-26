import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Avatar } from 'primereact/avatar';

export const AppTopbar = (props) => {

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/uniticket-logo.svg' : 'assets/layout/images/uniticket-logo.svg'} alt="logo" />
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <div className="layout-topbar-photo">
                <span>{sessionStorage.getItem('name').toUpperCase()}</span>
                <Avatar image='assets/demo/images/avatar/annafali.png' className={classNames("layout-topbar-photo", { 'layout-topbar-menu-mobile-active': props.mobileTopbarMenuActive })} alt="Foto de perfil" />
            </div>
        </div>
    );
}
