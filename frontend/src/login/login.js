import React, { useState } from 'react';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { EmployeeService } from '../admin/service/EmployeeService';
import { useHistory } from "react-router-dom";
function Login() {

  const [value1, setValue1] = useState('');
  const [value10, setValue10] = useState('');
  const [dropdownValue, setDropdownValue] = useState(null);

  const dropdownValues = [
    { name: 'Estudiante', code: '1' },
    { name: 'Empleado', code: '2' },
    { name: 'Padre', code: '3' }
  ];

  const history = useHistory();

  let emptyUser = {
    userName: '',
    password: ''
  }
  const [userSeleted, setUserSeleted] = useState(emptyUser);


  const setValueUser = (e, name) => {
    let _user = { ...userSeleted };
    _user[name] = e.target.value;
    setUserSeleted(_user);
    console.log(e.target.value);

  }
  const nextPath = (path)=> {
    this.props.history.push(path);
  }


  const login = () => {
    console.log("hola");
    console.log(userSeleted);
    const employeeService = new EmployeeService();
    employeeService.loginEstudent(userSeleted).then(data => {
      data.map((item) => {
        // console.log(item);
        if (item.Usuario == userSeleted.userName && item.Contrasenia == userSeleted.password) {
          sessionStorage.setItem('userId', item.idEstudiante);
          sessionStorage.setItem('name', item.Nombres);
          if (item.Rol == "Administrador" || item.Rol == "Supervisor") {
            sessionStorage.setItem('role', "admin");
          }
          else {
            sessionStorage.setItem('role', "Estudiante");
          }
          // sessionStorage.setItem('role', "estudiante");
          history.push("/admin");
          console.log(item);
        }
      }
      )
    });
  
    // employeeService.login(userSeleted).then(data => {
    //   console.log(data);
    //   sessionStorage.setItem('userId', data.userId);
    //   sessionStorage.setItem('name', data.firstName+" "+data.firstSurname);
    //   sessionStorage.setItem('role', data.role);
    //   console.log(sessionStorage.getItem('userId'), sessionStorage.getItem('name'), sessionStorage.getItem('role'));
    // }
    // );
  }

  return (
    <div className="grid-login">
      <div className="col-12">
        <div className="card-login divider-img">
          <div className="grid">
            <div className="col-5 flex align-items-center justify-content-center">
              <div className="p-fluid card-divider-login">
                <h3>Iniciar Sesion <br /> en UniTicket </h3>
                <form>
                  <div className="field">
                    <span className="p-float-label">
                      <InputText type="text" id="user" onChange={(e)=>{setValueUser(e,"userName")}} className="p-invalid" />
                      <label htmlFor="user">Usuario</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Password inputId="password" onChange={(e)=>{setValueUser(e,"password")}} className="p-invalid" />
                      <label htmlFor="password">Password</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Seleccione una opción" />
                    </span>
                  </div>

                  <div className="field">
                    <input type="checkbox" name='remeber'></input>
                    <label htmlFor="remeber">Recuerdame</label>
                  </div>

                  <Button label="Ingresar" onClick={login} ></Button>

                  <p className="forgot-password text-right">
                    <a href="#">Olvidaste tu contraseña?</a>
                  </p>
                </form>
              </div>
            </div>

            <div className="col-1">
              <Divider layout="vertical" className='divider'>
                <i className="pi pi-angle-double-right"></i>
              </Divider>
            </div>

            <div className="col-5 flex flex-column align-items-center justify-content-center">
              <div className='card-divider'>
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                  aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                  voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.</p>

                <Divider layout="horizontal" align="center">
                  <span className="p-tag">Badge</span>
                </Divider>

                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                  deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                  cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est
                  laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                  Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.</p>

                <Divider align="right">
                  <Button label="Button" icon="pi pi-search" className="p-button-outlined"></Button>
                </Divider>

                <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
                  voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur
                  a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis
                  doloribus asperiores repellat.
                  Donec vel volutpat ipsum. Integer nunc magna, posuere ut tincidunt eget, egestas vitae sapien.
                  Morbi dapibus luctus odio.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Login;