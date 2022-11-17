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
  let emptyUser = {
    userName: '',
    password: ''
  }

  const [dropdownValue, setDropdownValue] = useState(null);
  const [imagenes, establecerImagenes] = useState([]);
  const [userSeleted, setUserSeleted] = useState(emptyUser);

  const dropdownValues = [
    { name: 'Estudiante', code: '1' },
    { name: 'Empleado', code: '2' },
    { name: 'Padre', code: '3' }
  ];

  const setValueUser = (e, name) => {
    let _user = { ...userSeleted };
    _user[name] = e.target.value;
    setUserSeleted(_user);
  }

  const login = () => {
    const employeeService = new ServicioEmpleado();
    employeeService.loginEstudent(userSeleted).then(data => {
      // eslint-disable-next-line array-callback-return
      data.map((item) => {
        if (item.Usuario === userSeleted.userName && item.Contrasenia === userSeleted.password) {
          sessionStorage.setItem('userId', item.idEstudiante);
          sessionStorage.setItem('name', item.Nombres);
          if (item.Rol === "Administrador" || item.Rol === "Supervisor") {
            sessionStorage.setItem('role', "admin");
          } else if (item.Rol === "Empleado") {
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

  let anchoPantalla = window.innerWidth;

  useEffect(() => {
    let cont = 0;
    let px = -700.0;

    let loop = function () {
      const carrusel = document.querySelector('#carrusel');
      let style = getComputedStyle(carrusel);
      let mLeft = 0;

      if (carrusel != null) {
        mLeft = parseFloat(style.marginLeft);
        console.log('LEFT ANTES DE ENTRAR AL IF: ' + mLeft + ' CONTADOR ' + cont)
        if (cont === 6 || (mLeft * -1) > 4100) {
          carrusel.style.marginLeft = '0px';
          cont = 0;
        }
        else {
          console.log('pixels a sumar ' + px)
          carrusel.style.marginLeft = (px + mLeft) + 'px';
          cont++;
          console.log('mleft: ' + mLeft + ' ---- sdf: ' + carrusel.style.marginLeft)
        }
      } else {
        alert('NO DEBERIAS DE ESTAR VIENDO ESTO, EN CASO DE QUE LO ESTE VIENDO INFORME A UN ENCARGADO DE NETVALLE, POR FAVOR')
      }
    }

    setInterval(loop, 3000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (anchoPantalla > 700) {
    return (
      <div className="rejilla-inicio-sesion">
        <div className="col-12">
          <div className="tarjeta-inicio-sesion divisor-img">
            <div className="grid">
              <div className="col-5 flex align-items-center justify-content-center">
                <div className="p-fluid tarjeta-divisor-inicio-sesion">
                  <h3>Iniciar Sesión <br /> en UniTicket </h3>
                  <div className='form'>
                    <div className="field">
                      <span className="p-float-label">
                        <InputText type="text" id="user" onChange={(e) => { setValueUser(e, "userName") }} className="p-invalid" />
                        <label htmlFor="user">Usuario</label>
                      </span>
                    </div>

                    <div className="field">
                      <span className="p-float-label">
                        <Password inputId="password" onChange={(e) => { setValueUser(e, "password") }} className="p-invalid" feedback={false} />
                        <label htmlFor="password">Contraseña</label>
                      </span>
                    </div>

                    <div className="field">
                      <span className="p-float-label">
                        <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Seleccione una opción" />
                      </span>
                    </div>

                    <div className="field">
                      <input type="checkbox" name='recuerdame'></input>
                      <label htmlFor="recuerdame">Recuerdame</label>
                    </div>

                    <Button label="Ingresar" onClick={login} ></Button>

                    <p className="forgot-password text-right">
                      <a href="#">Olvidaste tu contraseña?</a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-1">
                <Divider layout="vertical" className='divisor'>
                  <i className="pi pi-angle-double-right"></i>
                </Divider>
              </div>

              <div className="col-5">
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
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="inicio-sesion">
        <div className="logo"></div>

        <div className="contenedor-inicio-sesion">
          <h3>Iniciar Sesion <br /> en UniTicket </h3>

          <div className="field">
            <span className="p-float-label">
              <InputText type="text" id="user" onChange={(e) => { setValueUser(e, "userName") }} className="p-invalid" />
              <label htmlFor="usuario">Usuario</label>
            </span>
          </div>

          <div className="field">
            <span className="p-float-label">
              <Password inputId="password" onChange={(e) => { setValueUser(e, "password") }} className="p-invalid" feedback='false' />
              <label htmlFor="contrasenia">Contraseña</label>
            </span>
          </div>

          <div className="field">
            <span className="p-float-label">
              <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Seleccione una opción" />
            </span>
          </div>

          <div className="field">
            <input type="checkbox" name='recuerdame'></input>
            <label htmlFor="recuerdame">Recuerdame</label>
          </div>

          <Button label="Ingresar" onClick={login} ></Button>

          <p className="forgot-password text-right">
            <a href="#">Olvidaste tu contraseña?</a>
          </p>

        </div>
      </div >
    );
  }
}

export default InicioSesion;