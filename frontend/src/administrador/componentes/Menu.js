import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import {Ripple} from "primereact/ripple";
import { Badge } from 'primereact/badge';

const Submenu = (props) => {

    const [indiceActivo, establecerIndiceActivo] = useState(null)

    const enMenuElementoClic = (evento, elemento, indice) => {
        //avoid processing disabled elementos
        if (elemento.disabled) {
            evento.preventDefault();
            return true;
        }

        //execute command
        if (elemento.command) {
            elemento.command({ eventoOriginal: evento, elemento: elemento });
        }

        if (indice === indiceActivo)
            establecerIndiceActivo(null);
        else
            establecerIndiceActivo(indice);

        if (props.enMenuElementoClic) {
            props.enMenuElementoClic({
                eventoOriginal: evento,
                elemento: elemento
            });
        }
    }

    const enTeclaAbajo = (evento) => {
        if (evento.code === 'Enter' || evento.code === 'Space'){
            evento.preventDefault();
            evento.target.click();
        }
    }

    const renderizarContenidoEnlace = (elemento) => {
        let submenuIcono = elemento.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>;
        let badge = elemento.badge && <Badge value={elemento.badge} />

        return (
            <React.Fragment>
                <i className={elemento.icon}></i>
                <span>{elemento.label}</span>
                {submenuIcono}
                {badge}
                <Ripple/>
            </React.Fragment>
        );
    }

    const renderizarEnlace = (elemento, i) => {
        let contenido = renderizarContenidoEnlace(elemento);

        if (elemento.to) {
            return (
                <NavLink aria-label={elemento.label} enTeclaAbajo={enTeclaAbajo} role="menuitem" className="p-ripple" activeClassName="router-link-active router-link-exact-active" to={elemento.to} onClick={(e) => enMenuElementoClic(e, elemento, i)} exact target={elemento.target}>
                    {contenido}
                </NavLink>
            )
        }
        else {
            return (
                <a tabIndex="0" aria-label={elemento.label} enTeclaAbajo={enTeclaAbajo} role="menuitem" href={elemento.url} className="p-ripple" onClick={(e) => enMenuElementoClic(e, elemento, i)} target={elemento.target}>
                    {contenido}
                </a>
            );
        }
    }

    let elementos = props.elementos && props.elementos.map((elemento, i) => {
        let active = indiceActivo === i;
        let styleClass = classNames(elemento.badgeStyleClass, {'layout-menuitem-category': props.root, 'active-menuitem': active && !elemento.to });

        if(props.root) {
            return (
                <li className={styleClass} key={i} role="none">
                    {props.root === true && <React.Fragment>
                        <div className="layout-menuitem-root-text" aria-label={elemento.label}>{elemento.label}</div>
                        <Submenu elementos={elemento.elementos} enMenuElementoClic={props.enMenuElementoClic} />
                    </React.Fragment>}
                </li>
            );
        }
        else {
            return (
                <li className={styleClass} key={i} role="none">
                    {renderizarEnlace(elemento, i)}
                    <CSSTransition classNames="layout-submenu-wrapper" timeout={{ enter: 1000, exit: 450 }} in={active} unmountOnExit>
                        <Submenu elementos={elemento.elementos} enMenuElementoClic={props.enMenuElementoClic} />
                    </CSSTransition>
                </li>
            );
        }
    });

    return elementos ? <ul className={props.className} role="menu">{elementos}</ul> : null;
}

export const Menu = (props) => {

    return (
        <div className="layout-menu-container">
            <Submenu items={props.model} className="layout-menu"  enMenuElementoClic={props.enMenuElementoClic} root={true} role="menu" />
        </div>
    );
}
