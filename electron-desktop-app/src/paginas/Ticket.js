import React,{useEffect, useState} from 'react';
import { TopBar } from '../componentes/TopBar';
import '../recursos/ticket.css';
import { TicketServicio } from "../servicio/TicketServicio";


const Ticket = () => {

  var tipoAtencion = true;

  const [typeUser, setTypeUser] = React.useState(false);
  const [typoAttention, setTypoAttention] = React.useState(true);
  const [vistaInformacion,establecerVistaInformacion]= React.useState(false)
  const [tiposAtentiones,establecerTiposAtenciones] = React.useState([]);
  const [lugaresAtention,establecerLugaresAtencion] = React.useState([]);
  const [tiposUsuarios,establecerTiposUsuarios] = React.useState([]);

  const emptyTicket = {
    IdTicket : '',
    Codigo: 'C',
    Numero : '',
    TipoTicket : 0,
    IdTipoAtencion : '',
    IdTipoUsuario : '',
    IdLugarAtencion : 2,
    IdArea : 1,
    Id_Sitio : 1,
    Id_Sede_Academica:1,
    Estado: '',
    FechaRegistro : '',
    FechaModificacion : ''
  }
  const [ticket, setTicket] = useState(emptyTicket);


  useEffect(() => {
    console.log(ticket)
    const ticketServicio = new TicketServicio();
    ticketServicio.obtenerTipoAtencion().then(datos => {
      establecerTiposAtenciones(datos);
      console.log(datos);
    }
    );

    ticketServicio.obtenerLugarAtencion('1').then(datos => {
      establecerLugaresAtencion(datos);
      console.log(datos);
    }
    );

    ticketServicio.obtenerTiposUsuarios().then(datos => {
      establecerTiposUsuarios(datos);
      console.log(datos);
    }
    );    
  }, []);

  
  const onChangeTipoAtencion = (item, name) => {
    const val = item.IdTipoAtencion
    let _ticket = { ...ticket };
    _ticket[name] = val;
    _ticket['Codigo'] = _ticket['Codigo'] + item.Nombre.slice(0,1);
    console.log(_ticket);
    setTicket(_ticket);
  };

  const onChangeTipoUsuario = (item, name) => {
    const val = item.idTipoUsuario
    let _ticket = { ...ticket };
    _ticket[name] = val;
    console.log(_ticket);
    setTicket(_ticket);
  };

  const guardarTicket = () => {
    const ticketServicio = new TicketServicio();
    ticketServicio.guardarTicket(ticket).then(datos => {
      console.log(datos);
      if (datos.status === 200) {
        alert("Ticket registrado correctamente");
      }
      else {
        alert("Error al registrar el ticket");
      }
    }
    );
  }


  return (
    <div className='contenedor-ticket'>
      <TopBar></TopBar>
      <div className={`tarjetas-ticket col-${tiposAtentiones.length >= 4 ? true :false }`}>

        { 
          typoAttention &&
          <div className={`tarjeta-ticket ${tipoAtencion}`} onClick={()=>{
            console.log('tipoAtencion');
          }}>
            <h2>¿TIPO DE ATENCIÓN?</h2>
              <div className='tarjeta-opciones'>
                {
                  tiposAtentiones.map((item, index) => {
                    return (
                      <div className='opcion' onClick={()=>{ 
                        onChangeTipoAtencion(item, 'IdTipoAtencion');
                        setTypeUser(true)
                        setTypoAttention(false)
                        console.log(item)
                      }} >
                        <img src="assets/layout/images/prov.jpg" />
                        <h3>{item.Nombre}</h3>
                      </div>
                    )
                  })
                }
              </div>
          </div>
        }

        {
          typeUser &&
          <div className={`tarjeta-ticket`}>
          <h2>¿QUÉ USUARIO ES?</h2>
          <div className='tarjeta-opciones'>
            {
              tiposUsuarios.map((item, index) => {
                return (
                  <div className='opcion' onClick={()=>{
                    onChangeTipoUsuario(item, 'IdTipoUsuario');
                    setTypeUser(false)
                    establecerVistaInformacion(true)
                   }}>
                    <img src="assets/layout/images/prov.jpg" />
                    <h3>{item.Nombre}</h3>
                  </div>
                )
              })
            }
          </div>
        </div>
        }

        {
          vistaInformacion &&
          <div className={`tarjeta-ticket`}>
          <h2>¿QUÉ USUARIO ES?</h2>
          <div className='tarjeta-opciones'>
            <label>Tipo de Atencion</label>
            <label>{ticket.IdTipoAtencion}</label>
            <label>Area de Atencion</label>
            <label>{ticket.IdLugarAtencion}</label>
            <label>Tipo de Usuario</label>
            <label>{ticket.IdLugarAtencion}</label>
          </div>
          <button onClick={()=>{
            console.log(ticket);
            guardarTicket();
          }} >enviar</button>
        </div>
        }
      </div>
    </div >
  );
}
export default Ticket;