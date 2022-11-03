import React from 'react';
import '../recursos/css/Footer.css';

export const Footer = (props) => {

    return (
        <div className="layout-footer">
            <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logo.svg' : 'assets/layout/images/logo.svg'} alt="Logo" height="30" className="mr-2" />
            by
            <span className="font-medium ml-2">Uni-Ticket</span>
        </div>
    );
}
