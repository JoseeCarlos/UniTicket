import React, { useState, useRef } from 'react';
import { AppBar } from '../../components/AppBar';
import '../assets/employee.css';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';

const EmployeeAttention = () => {
  let emptyTransfer = {
    id: null,
    id_2: ''
  };

  const [ticket, setTransferTicket] = useState(emptyTransfer);
  const [ticketDialog, setTransferTicketDialog] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  const dropdownValues = [
    { name: 'Habilitado', code: '1' },
    { name: 'Inhabilitado', code: '0' }
  ];

  const transferTicker = () => {
    setTransferTicket(ticket);
    setTransferTicketDialog(true);
    toast.current.show({ severity: 'success', summary: '¡Éxito!', detail: 'Ticket Transferido', life: 3000 });
  }

  const onInputChange = (e, name) => {
    /* Buscador */
  }

  const hideDialog = () => {
    setSubmitted(false);
    setTransferTicketDialog(false);
  }

  const openDialog = (ticket) => {
    setTransferTicket({ ...ticket });
    setTransferTicketDialog(true);
  }

  const transferTicketDialogFooter = (
    <>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
      <Button label="Transferir" icon="pi pi-check" className="p-button-text" onClick={transferTicker} />
    </>
  );

  return (
    <div className='container-employee'>
      <AppBar></AppBar>
      <div className='container-attention'>
        <div className='current-ticket'>
          <h1>G-24</h1>
          <Image src='assets/layout/images/logo.svg' alt="logo" />
        </div>
        <div className='in-attention'>
          <h1>Ticket Actual</h1>
          <div className='detail-actions'>
            <div className='detail'>
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
            <div className='actions'>
              <h1>Acciones</h1>
              <Button className='btn' type="button">Atendido</Button>
              <Button className='btn' type="button">Siguiente</Button>
              <Button className='btn' type="button" onClick={() => openDialog()}>Transferir</Button> {/*MANDAR LOS IDs Para la transferencia.... supongo.*/}
              <Button className='btn' type="button">Cancelar</Button>
            </div>
          </div>
        </div>
        <div className='record'>
          <div className='search'>
            <h1>Historial de atención</h1>
            <div className="field">
              <i className="pi pi-angle-left pagination" style={{ fontSize: '2rem', marginRight: '4px' }} />
              <i className="pi pi-angle-right pagination" style={{ fontSize: '2rem', marginRight: '4px' }} />
              <i className="pi pi-search" style={{ fontSize: '2rem', marginRight: '4px' }} />
              <InputText id="name" className='search-input' onChange={(e) => onInputChange(e, 'name')} autoFocus placeholder='Ingrese un nombre' />
            </div>
          </div>

          <div className='record-actions'>
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
                  <td className='content'>Juan Perez</td>
                  <td className='action'><Button className='btn' type="button">Habilitar</Button></td>
                </tr>
              </tbody>
            </table>
            {/* <div className='record'>

            </div>
            <div className='actions'>
              
              <Button className='btn' type="button">Habilitar</Button>
            </div> */}
          </div>
        </div>
      </div>

      <Dialog visible={ticketDialog} style={{ width: '450px' }} header="Transferencia de Ticket" modal className="p-fluid" footer={transferTicketDialogFooter} onHide={hideDialog}>
        <div className="field">
          <label htmlFor="transfer">Nuevo lugar de atención</label>
          <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="transfer" placeholder="Seleccione el lugar de atención" />
        </div>
      </Dialog>

    </div >
  );
}
export default EmployeeAttention;