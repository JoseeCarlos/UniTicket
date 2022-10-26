import React, { useState, useEffect } from 'react';
import { FotoServicio } from '../servicio/FotoServicio';
import { Galleria } from 'primereact/galleria';
import '../recursos/css/Reservacion.css';

const ReservationOnline = () => {
  const [images, setImages] = useState(null);

  const galleriaService = new FotoServicio();

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  useEffect(() => {
    galleriaService.getImages().then(data => setImages(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const itemTemplate = (item) => {
    return <div className='informacion-ticket'>Hola mundo</div>
  }

  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.alt} style={{ display: 'block' }} />
  }

  return (
    <div className='contenedor-reservacion'>
      <div className="galeria">
        <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={7} circular style={{ maxWidth: '600px' }}
          item={itemTemplate} thumbnail={thumbnailTemplate} />
      </div>
      <div className='nuevo-ticket'>
        Nuevo ticket
      </div>
      <div className='historial'>

      </div>
    </div >
  );
}
export default ReservationOnline;