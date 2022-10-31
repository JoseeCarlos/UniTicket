import React, { useState, useEffect, useRef } from 'react';
import { FotoServicio } from '../servicio/FotoServicio';
import { Galleria } from 'primereact/galleria';
import '../recursos/css/Reservacion.css';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { ProductService } from '../servicio/ReservacionEnLineaServicio';
import { Button } from 'primereact/button';

const ReservacionEnLinea = () => {
  const [imagenes, establecerImagenes] = useState(null);

  const fotoServicio = new FotoServicio();

  const opcionesResponsivas = [
    {
      anchoMaximo: '1024px',
      numVisible: 5
    },
    {
      anchoMaximo: '960px',
      numVisible: 4
    },
    {
      anchoMaximo: '768px',
      numVisible: 3
    },
    {
      anchoMaximo: '560px',
      numVisible: 1
    }
  ];

  useEffect(() => {
    fotoServicio.getImages().then(datos => establecerImagenes(datos));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const elementoTemplate = (elemento) => {
    return (
      <div className='informacion-ticket'>
        <div className='numero-ticket'>
          <img src='assets/layout/images/logo.svg' alt='Número de ticket' />
          <h1>{elemento.title}</h1>
        </div>

        <div className='detalle-ticket'>
          s
        </div>
      </div>
    );
  }

  const carrusel = (elemento) => {
    return (
      <div className='numero-ticket-lista'>
        <img src='assets/layout/images/logo.svg' alt='Número de ticket' />
        <h5>{elemento.title}</h5>
      </div>
    );
  }

  /* DATA TABLE */

  const [products, setProducts] = useState([]);
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const toast = useRef(null);


  useEffect(() => {
    const productService = new ProductService();
    productService.getProductsSmall().then(data => setProducts(data));
  }, []);

  return (
    <div className='contenedor-reservacion'>
      <div className="galeria">
        <Galleria value={imagenes} responsiveOptions={opcionesResponsivas} numVisible={7} circular style={{ maxWidth: '650px' }}
          item={elementoTemplate} thumbnail={carrusel} />
      </div>
      <div className='nuevo-ticket'>
        <img src='assets/layout/images/logo.svg' alt='Nuevo ticket' />
        <i className='pi pi-plus'></i>
      </div>
      <h2>HISTORIAL DE TICKETS RESERVADOS</h2>
      <div className='historial-enLinea-ticket'>
        <Toast ref={toast} />
        <DataTable value={products} selectionMode="single"
                  selection={selectedProduct1} onSelectionChange={e => setSelectedProduct1(e.value)}
                  dataKey="id" responsiveLayout="stack" breakpoint="960px" paginator
                  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}>
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </div>
    </div >
  );
}
export default ReservacionEnLinea;