import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { TopBar } from './TopBar';
import { Footer } from './Footer';
import { Menu } from './Menu';
import { AppConfig } from './AppConfig';

import Quejas from '../pages/Quejas';
import ReporteGeneral from '../pages/ReporteGeneral';
import GenerarReporte from '../pages/GenerarReporte';
import LugarAtencionMesa from '../pages/LugarAtencionMesa';
import Area from '../pages/Area';
import Asignacion from '../pages/Asignacion';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '../assets/demo/flags/flags.css';
import '../assets/demo/Demos.scss';
import '../assets/layout/layout.scss';

const Administrador = () => {
    const [modoDisenio, establecerModoDisenio] = useState('static');
    const [disenioColorModo, establecerDisenioColorModo] = useState('light')
    const [estiloEntrada, establecerEstiloEntrada] = useState('outlined');
    const [multiplicador, establecerMultiplicador] = useState(true);
    const [menuEstaticoInactivo, establecerMenuEstaticoInactivo] = useState(false);
    const [sobreponerMenuActivo, establecerSobreponerMenuActivo] = useState(false);
    const [menuMovilActivo, establecerMenuMovilActivo] = useState(false);
    const [topbarMenuMovilActivo, establecerTopbarMenuMovilActivo] = useState(false);
    const copyTooltipRef = useRef();
    const ubicacion = useLocation();

    PrimeReact.multiplicador = true;

    let menuClic = false;
    let topbarMovilMenuClic = false;

    useEffect(() => {
        if (menuMovilActivo) {
            aniadirClase(document.body, "body-overflow-hidden");
        } else {
            removerClase(document.body, "body-overflow-hidden");
        }
    }, [menuMovilActivo]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [ubicacion]);

    const cambioEstiloEntrada = (estiloEntrada) => {
        establecerEstiloEntrada(estiloEntrada);
    }

    const enMultiplicador = (e) => {
        PrimeReact.multiplicador = e.value;
        establecerMultiplicador(e.value)
    }

    const cambioDisenioModo = (mode) => {
        establecerModoDisenio(mode)
    }

    const cambioColorModo = (mode) => {
        establecerDisenioColorModo(mode)
    }

    const contenedorClic = (event) => {
        if (!menuClic) {
            establecerSobreponerMenuActivo(false);
            establecerMenuMovilActivo(false);
        }

        if (!topbarMovilMenuClic) {
            establecerTopbarMenuMovilActivo(false);
        }

        topbarMovilMenuClic = false;
        menuClic = false;
    }

    const alternarMenuClic = (event) => {
        menuClic = true;

        if (esEscritorio()) {
            if (modoDisenio === 'overlay') {
                if (menuMovilActivo === true) {
                    establecerSobreponerMenuActivo(true);
                }

                establecerSobreponerMenuActivo((prevState) => !prevState);
                establecerMenuMovilActivo(false);
            }
            else if (modoDisenio === 'static') {
                establecerMenuEstaticoInactivo((prevState) => !prevState);
            }
        }
        else {
            establecerMenuMovilActivo((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const enBarraLateralClic = () => {
        menuClic = true;
    }

    const enMovilTopbarMenuClic = (event) => {
        topbarMovilMenuClic = true;

        establecerTopbarMenuMovilActivo((prevState) => !prevState);
        event.preventDefault();
    }

    const enMovilSubTopbarMenuClic = (event) => {
        topbarMovilMenuClic = true;

        event.preventDefault();
    }

    const enMenuElementoClic = (event) => {
        if (!event.item.items) {
            establecerSobreponerMenuActivo(false);
            establecerMenuMovilActivo(false);
        }
    }
    const esEscritorio = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'ADMINISTRACIÓN', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Empleados', icon: 'pi pi-fw pi-id-card', to: '/employee' },
                { label: 'Campus', icon: 'pi pi-fw pi-home', to: '/campus' },
                { label: 'Quejas', icon: 'pi pi-fw pi-comments', to: '/quejas' },
                { label: 'Areas', icon: 'pi pi-fw pi-table', to: '/area' },
                { label: 'Lugares de Atencion', icon: 'pi pi-fw pi-check-square', to: '/lugarAtencionMesa' },
                { label: 'Asignaciones', icon: "pi pi-fw pi-bookmark", to: "/asignacion" },
                { label: 'Reportes', icon: "pi pi-fw pi-exclamation-circle", to: "invalidstate" },
                {
                    label: 'Reportes', icon: 'pi pi-fw pi-exclamation-circle',
                    items: [

                        { label: 'General', icon: 'pi pi-fw pi-chart-bar', to: '/reporteGeneral' },
                        { label: 'Generar', icon: 'pi pi-fw pi-book', to: '/generarReporte' },
                    ]
                }
            ]
        }
    ];

    const aniadirClase = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removerClase = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const claseContenedor = classNames('layout-wrapper', {
        'layout-overlay': modoDisenio === 'overlay',
        'layout-static': modoDisenio === 'static',
        'layout-static-sidebar-inactive': menuEstaticoInactivo && modoDisenio === 'static',
        'layout-overlay-sidebar-active': sobreponerMenuActivo && modoDisenio === 'overlay',
        'layout-mobile-sidebar-active': menuMovilActivo,
        'p-input-filled': estiloEntrada === 'filled',
        'p-multiplicador-disabled': multiplicador === false,
        'layout-theme-light': disenioColorModo === 'light'
    });

    return (
        <div className={claseContenedor} onClick={contenedorClic}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <TopBar alternarMenuClic={alternarMenuClic} disenioColorModo={disenioColorModo}
                topbarMenuMovilActivo={topbarMenuMovilActivo} enMovilTopbarMenuClic={enMovilTopbarMenuClic} enMovilSubTopbarMenuClic={enMovilSubTopbarMenuClic} />

            <div className="layout-sidebar" onClick={enBarraLateralClic}>
                <Menu model={menu} enMenuElementoClic={enMenuElementoClic} disenioColorModo={disenioColorModo} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact render={() => <ReporteGeneral colorMode={disenioColorModo} ubicacion={ubicacion} />} />
                    <Route path="/quejas" component={Quejas} />
                    <Route path="/reporteGeneral" component={ReporteGeneral} />
                    <Route path="/generarReporte" component={GenerarReporte} />
                    <Route path="/lugarAtencionMesa" component={LugarAtencionMesa} />
                    <Route path="/area" component={Area} />
                    <Route path="/asignacion" component={Asignacion} />
                </div>

                <Footer disenioColorModo={disenioColorModo} />
            </div>

            <AppConfig rippleEffect={multiplicador} onRippleEffect={enMultiplicador} estiloEntrada={estiloEntrada} cambioEstiloEntrada={cambioEstiloEntrada}
                modoDisenio={modoDisenio} cambioDisenioModo={cambioDisenioModo} disenioColorModo={disenioColorModo} cambioColorModo={cambioColorModo} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={menuMovilActivo} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );

}

export default Administrador;
