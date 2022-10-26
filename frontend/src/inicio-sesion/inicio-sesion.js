import React, { useState } from 'react';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

function Inicio_Sesion() {

  const [value1, setValue1] = useState('');
  const [value10, setValue10] = useState('');
  const [dropdownValue, setDropdownValue] = useState(null);

  const dropdownValues = [
    { name: 'Estudiante', code: '1' },
    { name: 'Empleado', code: '2' },
    { name: 'Padre', code: '3' }
  ];

  return (
    <div className="rejilla-inicio-sesion">
      <div className="col-12">
        <div className="tarjeta-inicio-sesion divisor-img">
          <div className="grid">
            <div className="col-5 flex align-items-center justify-content-center">
              <div className="p-fluid tarjeta-divisor-inicio-sesion">
                <h3>Iniciar Sesion <br /> en UniTicket </h3>
                <form>
                  <div className="field">
                    <span className="p-float-label">
                      <InputText type="text" id="usuario" value={value1} onChange={(e) => setValue1(e.target.value)} className="p-invalid" />
                      <label htmlFor="usuario">Usuario</label>
                    </span>
                  </div>

                  <div className="field">
                    <span className="p-float-label">
                      <Password inputId="contrasenia" value={value10} onChange={(e) => setValue10(e.target.value)} className="p-invalid" />
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

                  <Button label="Ingresar"></Button>

                  <p className="forgot-password text-right">
                    <a href="#">Olvidaste tu contraseña?</a>
                  </p>
                </form>
              </div>
            </div>

            <div className="col-1">
              <Divider layout="vertical" className='divisor'>
                <i className="pi pi-angle-double-right"></i>
              </Divider>
            </div>

            <div className="col-5 flex flex-column align-items-center justify-content-center">
              <div className='tarjeta-divisor'>
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

export default Inicio_Sesion;