import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider'
import '../recursos/css/Tramites.css'

const Tramites = () => {


  const [area, establecerArea] = useState(null);
  const [lugar, establecerLugar] = useState(false);

  const areaAtencion = [
    { label: 'New York', value: 'NY' },
    { label: 'Rome', value: 'RM' },
    { label: 'London', value: 'LDN' },
    { label: 'Istanbul', value: 'IST' },
    { label: 'Paris', value: 'PRS' }
  ];

  return (
    <div className='contenedor-tramites'>

      <div className='seleccionar-tramite'>
        <Dropdown className='seleccionar-lugar' value={area} options={areaAtencion} onChange={(e) => establecerArea(e.value)} placeholder="Seleccione un Área" />
        <Dropdown className='seleccionar-lugar' value={lugar} options={areaAtencion} onChange={(e) => establecerLugar(e.value)} placeholder="Seleccione un Lugar de Atención" />
      </div>

      <Divider type='dashed'/>

      <div className='tarjetas-tramites'>
        <Card className='tarjeta-tramite' header={<img alt="Card" src={`assets/layout/images/${Math.floor(Math.random() * 3) + 1}.jpg`} />} title='Certificado de estudiante regular'>
          <p>El tramite es un tramite que mas pues xd xdxdxdxxd</p>
          <ol> <span>Requisitos</span>
            <li>Fotocopia de carnet de identidad</li>
            <li>Extracto economico</li>
          </ol>
        </Card>
       
        <Card className='tarjeta-tramite' header={<img alt="Card" src={`assets/layout/images/${Math.floor(Math.random() * 3) + 1}.jpg`} />} title='Certificado de estudiante regular'>
          <p>El tramite es un tramite que mas pues xd xdxdxdxxd</p>
          <ol> <span>Requisitos</span>
            <li>Fotocopia de carnet de identidad</li>
            <li>Extracto economico</li>
          </ol>
        </Card>

        <Card className='tarjeta-tramite' header={<img alt="Card" src={`assets/layout/images/${Math.floor(Math.random() * 3) + 1}.jpg`} />} title='Certificado de estudiante regular'>
          <p>El tramite es un tramite que mas pues xd xdxdxdxxd</p>
          <ol> <span>Requisitos</span>
            <li>Fotocopia de carnet de identidad</li>
            <li>Extracto economico</li>
          </ol>
        </Card>
      </div>
    </div >
  );
}
export default Tramites;