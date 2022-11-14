import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider'
import '../recursos/css/Tramites.css'
import { TramiteServicio } from '../servicio/TramiteServicio';
import { RequisitoServicio } from '../servicio/RequisitoServicio';

const Tramites = () => {


  const [area, establecerArea] = useState(null);
  const [lugar, establecerLugar] = useState(false);
  const [tramites,establecerTramites] = useState([]);
  const [requisitos, establecerRequisitos] = useState([]);
  

  const areaAtencion = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ];
  
  const tramiteServicio = new TramiteServicio();
  const requisitoServicio = new RequisitoServicio();
  useEffect(() => {
    tramiteServicio.obtenerTramites().then((data) => {
      console.log(data);
      establecerTramites(data);
    } ); 
  }, []);

  return (
    <div className='contenedor-tramites'>

      <div className='seleccionar-tramite'>
        <Dropdown className='seleccionar-lugar' value={area} options={areaAtencion} onChange={(e) => establecerArea(e.value)} placeholder="Seleccione un Área" />
        <Dropdown className='seleccionar-lugar' value={lugar} options={areaAtencion} onChange={(e) => establecerLugar(e.value)} placeholder="Seleccione un Lugar de Atención" />
      </div>
      <Divider type='dashed'/>
      <div className='tarjetas-tramites'>
        {tramites.map((item, index) => {
          
          return (
            <Card className='tarjeta-tramite' header={<img alt="Card" src={`assets/layout/images/${Math.floor(Math.random() * 3) + 1}.jpg`} />} title={ item.Nombre }>
              <p>{item.Descripcion}</p>
              <ol> <span>Requisitos</span>
              {
                item.Requisitos.map((item, index)=>{
                  return(
                    <li>{item.Nombre}</li>
                  )
                })
              }
              </ol>
            </Card>
          )
        } )

        }

      </div>
    </div >
  );
}
export default Tramites;