import React, { useState, useRef, useEffect } from 'react';
import { TopBar } from '../../componentes/TopBar';
import '../recursos/Empleados.css';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';


const EmpleadoAtencion = () => {
  let emptyTransfer = {
    id: null,
    id_2: ''
  };

  const citySelectItems = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ];

  let fechaHoy = new Date();
  const [ticket, establecerTransferenciaTicket] = useState(emptyTransfer);
  const [ticketOtroDia, establecerTransferenciaTicketOtroDia] = useState(emptyTransfer);
  const [ticketDialogo, establecerTransferenciaTicketDialogo] = useState(false);
  const [ticketDialogoOtroDia, establecerTransferenciaTicketDialogoOtroDia] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [horaSeleccionada, establecerHoraSeleccionada] = useState(null);
  const [enviado, establecerEnvio] = useState(false);
  const [seleccionArea, establecerSeleccionArea] = useState(null);
  const [fecha, establecerFecha] = useState(new Date(fechaHoy.setDate(fechaHoy.getDate() + 1)));
  const toast = useRef(null);
  const dt = useRef(null);

  const dropdownValues = [
    { nombre: 'Habilitado', code: '1' },
    { nombre: 'Inhabilitado', code: '0' }
  ];

  console.log(fecha)

  const transferirTicket = () => {
    establecerTransferenciaTicket(ticket);
    establecerTransferenciaTicketDialogo(false);
    toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Ticket Transferido', life: 3000 });
  }

  const transferirTicketOtroDia = () => {
    establecerTransferenciaTicketOtroDia(ticketOtroDia);
    establecerTransferenciaTicketDialogoOtroDia(false);
    toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Ticket transferido al siguiente día', life: 3000 });
  }

  const onInputChange = (e, nombre) => {
    /* Buscador */
  }

  const ocultarDialogo = () => {
    establecerEnvio(false);
    establecerTransferenciaTicketDialogo(false);
    establecerTransferenciaTicketDialogoOtroDia(false);
  }

  const abrirDialogo = (ticket) => {
    establecerTransferenciaTicket({ ...ticket });
    establecerTransferenciaTicketDialogo(true);
  }

  const abrirDialogoTransferir = (ticket) => {
    establecerTransferenciaTicket({ ...ticket });
    establecerTransferenciaTicketDialogoOtroDia(true);
  }

  const transferirTicketDialogoFooter = (
    <>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={ocultarDialogo} />
      <Button label="Transferir" icon="pi pi-check" className="p-button" onClick={transferirTicket} />
    </>
  );

  useEffect(() => {
    let hora = document.querySelectorAll('#hora');
    console.log(hora)
    if (hora !== null) {
      hora.forEach(function (elemento) {
        elemento.addEventListener('click', function () {
          cambiarClases();
          elemento.classList.add('hora-seleccionada');
          let horaSelec = elemento.innerHTML;
        });
      });

      function cambiarClases() {
        if (hora.classList.contains('hora-seleccionada')) {
          hora.classList.remove('hora-seleccionada');
          hora.classList.add('hora-no-seleccionada');
        } else {
          hora.classList.add('hora-seleccionada');
          hora.classList.remove('hora-no-seleccionada');
        }
      }
    } else alert('NO DEBERIAS ESTAR VIENDO ESTO, EN CASO DE QUE ASI SEA INFORMA DE ESTE ERROR A NETVALLE')
  }, []);

  function habilitarHoras() {
    
  }

  return (
    <div className='contenedor-empleado'>
      <TopBar></TopBar>
      <div className='contenedor-atencion'>
        <div className='actual-ticket'>
          <h1>G-24</h1>
          <Image src='assets/layout/images/logo.svg' alt="logo" />
        </div>
        <div className='en-atencion'>
          <h1>Ticket Actual</h1>
          <div className='detalle-acciones'>
            <div className='detalle'>
              <table>
                <tbody>
                  <tr>
                    <td>Ticket Generado el: <span>19/07/2022 : 14:05</span></td>
                  </tr>
                  <tr>
                    <td>Generación de Ticket: <span>Presencial</span></td>
                  </tr>
                  <tr>
                    <td>Tipo de atención: <span>General</span></td>
                  </tr>
                  <tr>
                    <td>Usuario: <span>Estudiante</span></td>
                  </tr>
                  <tr>
                    <td>Transferencia: <span>No</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='acciones'>
              {/* <h1>Acciones</h1> */}
              <Button className='btn' type="button" onClick={() => abrirDialogoTransferir()}>Transferir Mañana</Button>
              <Button className='btn' type="button">Atendido</Button>
              <Button className='btn' type="button">Siguiente</Button>
              <Button className='btn' type="button" onClick={() => abrirDialogo()}>Transferir</Button> {/*MANDAR LOS IDs Para la transferencia.... supongo.*/}
              <Button className='btn' type="button">Cancelar</Button>
            </div>
          </div>
        </div>
        <div className='historial'>
          <div className='buscar'>
            <h1>Historial de atención</h1>
            <div className="campo">
              <i className="pi pi-angle-left paginacion" style={{ fontSize: '2rem', marginRight: '4px' }} />
              <i className="pi pi-angle-right paginacion" style={{ fontSize: '2rem', marginRight: '4px' }} />
              <i className="pi pi-search" style={{ fontSize: '2rem', marginRight: '4px' }} />
              <InputText id="nombre" className='buscar-entrada' onChange={(e) => onInputChange(e, 'nombre')} autoFocus placeholder='Ingrese un nombre' />
            </div>
          </div>

          <div className='historial-acciones'>
            <table>
              <tbody>
                {/* 
                  Llenar datos en bucle 
                  
                  -- EJEMPLO:
                
                      <tr>
                        <td className='content'>{ ticket.detail }</td>
                        <td className='action'><Button className='btn' type="button" onclick=habilitar(ticket.id)>Habilitar</Button></td>
                      </tr>
          
                */}
                <tr>
                  <td className='contenido'>Juan Perez</td>
                  <td className='accion'><Button className='btn' type="button">Habilitar</Button></td>
                </tr>
              </tbody>
            </table>
            {/* <div className='historial'>

            </div>
            <div className='acciones'>
              
              <Button className='btn' type="button">Habilitar</Button>
            </div> */}
          </div>
        </div>
      </div>

      <Dialog visible={ticketDialogo} style={{ width: '450px' }} header="Transferencia de Ticket" modal className="p-fluid" footer={transferirTicketDialogoFooter} onHide={ocultarDialogo}>
        <div className="campo">
          <label htmlFor="transferir">Nuevo lugar de atención</label>
          <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="transferir" placeholder="Seleccione el lugar de atención" />
        </div>
      </Dialog>

      <Dialog visible={ticketDialogoOtroDia} style={{ width: '450px' }} header="Transferencia de Ticket" modal className="p-fluid" footer={transferirTicketDialogoFooter} onHide={ocultarDialogo}>
        <div className="campo dialogo-ticket">
          <div className='agrupar'>
            <label>Sitio: </label>
            <Dropdown className='dropdown' value={seleccionArea} options={citySelectItems} onChange={(e) => establecerSeleccionArea(e.value)} placeholder="Seleccione un Sitio" />
          </div>

          <div className='agrupar'>
            <label>Área: </label>
            <Dropdown className='dropdown' value={seleccionArea} options={citySelectItems} onChange={(e) => establecerSeleccionArea(e.value)} placeholder="Seleccione un Área" />
          </div>

          <div className="agrupar">
            <label htmlFor="range">Fecha:</label>
            <Calendar id="range" value={fecha} minDate={fechaHoy} onChange={(e) => establecerFecha(e.value)} className='calendario' />
          </div>

          <div className="agrupar">
            <label htmlFor="range">Hora:</label>
            <InputText value={horaSeleccionada} readOnly/>
          </div>

          <div className="agrupar">
            <label htmlFor="time24">Horas disponibles: </label>
            <div className='horas'>
              <span className='hora llena' onClick={() => establecerHoraSeleccionada('08:00')}>08:00</span>
              <span className='hora vacia' onClick={() => establecerHoraSeleccionada('09:00')}>08:00</span>
              <span className='hora casilleno' onClick={() => establecerHoraSeleccionada('09:00')}>08:00</span>
              <span className='hora llena' onClick={() => establecerHoraSeleccionada('09:00')}>08:00</span>
              <span className='hora llena' onClick={() => establecerHoraSeleccionada('09:00')}>08:00</span>
              <span className='hora casilleno' onClick={() => establecerHoraSeleccionada('09:00')}>08:00</span>
              <span className='hora llena' onClick={() => establecerHoraSeleccionada('09:00')}>08:00</span>
              <span className='hora casilleno' onClick={() => establecerHoraSeleccionada('09:00')}>08:00</span>
              <span className='hora llena' onClick={() => establecerHoraSeleccionada('09:00')}>08:00</span>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
export default EmpleadoAtencion;