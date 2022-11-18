import React, { useState, useEffect } from 'react';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ServicioEmpleado } from '../administrador/servicios/ServicioEmpleado';
import { InicioSesionServicio } from '../servicios/InicioSesionServicio';
import '../recursos/InicioSesion.css';

function InicioSesion() {
  let usuarioVacio = {
    cuenta: '',
    pin: ''
  }

  const [usuarioSeleccion, usuarioSeleccionado] = useState(null);
  const [imagenes, establecerImagenes] = useState([]);
  const [usuarioIngresado, establecerUsuarioIngresado] = useState(usuarioVacio);

  const usuarios = [
    { usuario: 'Estudiante', code: '1' },
    { usuario: 'Empleado', code: '2' },
    { usuario: 'Padre', code: '3' }
  ];

  const setValueUser = (e, usuario) => {
    let _usuario = { ...usuarioIngresado };
    _usuario[usuario] = e.target.value;
    establecerUsuarioIngresado(_usuario);
  }

  const login = () => {
    const servicioEmpleado = new ServicioEmpleado();
    servicioEmpleado.loginEstudent(usuarioIngresado).then(data => {
      // eslint-disable-next-line array-callback-return
      data.map((elemento) => {
        if (elemento.Usuario === usuarioIngresado.cuenta && elemento.Contrasenia === usuarioIngresado.pin) {
          sessionStorage.setItem('userId', elemento.idEstudiante);
          sessionStorage.setItem('usuario', elemento.Nombres);
          if (elemento.Rol === "Administrador" || elemento.Rol === "Supervisor") {
            sessionStorage.setItem('role', "admin");
          } else if (elemento.Rol === "Empleado") {
            sessionStorage.setItem('role', "Empleado");
          } else {
            sessionStorage.setItem('role', "Estudiante");
          }
        } else {
          alert('Usuario y/o contrasenia no existen')
        }
      })
    });
  };

  const inicioSesionServicio = new InicioSesionServicio();

  useEffect(() => {
    inicioSesionServicio.obtenerImagenes().then(data => establecerImagenes(data.slice(0, 9)));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let cont = 0;
    let px = -700.0;

    let loop = function () {
      const carrusel = document.querySelector('#carrusel');
      let estilo = getComputedStyle(carrusel);
      let margenIzquierdo = 0;

      if (carrusel != null) {
        margenIzquierdo = parseFloat(estilo.marginLeft);
        if (cont === 6 || (margenIzquierdo * -1) > 4100) {
          carrusel.style.marginLeft = '0px';
          cont = 0;
        }
        else {
          carrusel.style.marginLeft = (px + margenIzquierdo) + 'px';
          cont++;
        }
      } else {
        alert('NO DEBERIAS DE ESTAR VIENDO ESTO, EN CASO DE QUE LO ESTE VIENDO INFORME A UN ENCARGADO DE NETVALLE, POR FAVOR')
      }
    }

    setInterval(loop, 3000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid divisor-img">
      <div className="tarjeta-inicio">
        <div className='logo-inicio-sesion-container'>
          <div className='logo-inicio-sesion'></div>
        </div>
        <div className="p-fluid tarjeta-divisor-inicio-sesion">
          <h3>Iniciar Sesión <br /> en UniTicket </h3>
          <div className='form'>
            <div className="field">
              <span className="p-float-label">
                <InputText type="text" id="usuario" onChange={(e) => { setValueUser(e, "cuenta") }} className="p-invalid" />
                <label htmlFor="usuario">Usuario</label>
              </span>
            </div>

            <div className="field">
              <span className="p-float-label">
                <Password inputId="pin" onChange={(e) => { setValueUser(e, "pin") }} className="p-invalid" feedback={false} />
                <label htmlFor="pin">Contraseña</label>
              </span>
            </div>

            <div className="field">
              <span className="p-float-label">
                <Dropdown value={usuarioSeleccion} onChange={(e) => usuarioSeleccionado(e.value)} options={usuarios} optionLabel="usuario" placeholder="Seleccione una opción" />
              </span>
            </div>

            <div className="field">
              <input type="checkbox" usuario='recuerdame'></input>
              <label htmlFor="recuerdame">Recuerdame</label>
            </div>

            <Button label="Ingresar" onClick={login} ></Button>
          </div>
        </div>
      </div>

      <div className="contenedor-divisor">
        <Divider layout="vertical" className='divisor'>
          <i className="pi pi-angle-double-right"></i>
        </Divider>
      </div>

      <div className="tarjeta-carrusel">
        <div className='contenedor-carrusel'>
          <ul class="carrusel" id="carrusel">
            {
              imagenes.map((elemento, index) => {
                return (
                  <li class="carrusel-imagen">
                    <img src={`images/univalle/${elemento.imagen}`} alt='Imagen de Univalle' className="imagen" />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default InicioSesion;