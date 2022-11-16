import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ServicioQueja } from '../servicios/ServicioQueja';

const Quejas = () => {
    
    const [quejas, setQuejas] = useState([])
    const servicioQueja = new ServicioQueja()
    
    useEffect(() => {
        // setLoading2(true);

        // customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        // customerService.getCustomersLarge().then(data => { setCustomers2(getCustomers(data)); setLoading2(false); });
        // customerService.getCustomersMedium().then(data => setCustomers3(data));
        // productService.getProductsWithOrdersSmall().then(data => setProducts(data));
        console.log('sdasd')
        servicioQueja.getComplaints().then(data=>{
            console.log(data)
            setQuejas(data)
        })
        // servicioMesa.getComplaints().then(data => {
        //     console.log('holaa')
        //     console.log(data)
        //     // setComplains(data)
        // });


        // initFilters1();
    }, []);

    const [filasExpandidas, establecerFilasExpandidas] = useState(null);
    const expandirTodo = () => {
        let _filasExpandidas = {};
        quejas.forEach(p => _filasExpandidas[`${quejas.id}`] = true);

        establecerFilasExpandidas(_filasExpandidas);
    }
    const colapsarTodo = () => {
        establecerFilasExpandidas(null);
    }
    const baseExpansionFilas = (datos) => {
        return (
            <div className="orders-subtable">
                <h5>{datos.name} {datos.price}</h5>
                <p>{datos.description}</p>
                <p>Mucho me retaron *inserte carita triste*</p>
                {/* Poner la razon */}
                {datos.name === 'Bracelet' ? <Button type="button" icon="pi pi-check">Habilitar Tickect</Button> : ''  }
            </div>
        );
    }

    const encabezado = (
        <div className="table-header-container">
            <Button icon="pi pi-plus" label="Mostrar todo" onClick={expandirTodo} className="mr-2 mb-2" />
            <Button icon="pi pi-minus" label="Ocultar todo" onClick={colapsarTodo} className="mb-2" />
        </div>
    );
    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Administración de Quejas</h5>
                    <DataTable value={quejas} expandedRows={filasExpandidas} onRowToggle={(e) => establecerFilasExpandidas(e.data)} responsiveLayout="scroll"
                        rowExpansionTemplate={baseExpansionFilas} dataKey="id" header={encabezado} paginator rows={10} rowsPerPageOptions={[5, 10, 25]} 
                        className="datatable-responsive" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} Quejas" emptyMessage="No hay quejas :D.">
                        <Column expander style={{ width: '3em' }} />
                        <Column field="NombreUsuario" header="nombre" sortable />
                        <Column field="TipoQueja" header="Tipo" sortable />
                        <Column field="TipoAtencion" header="Tipo de atención" sortable />
                        <Column field="LugarAtencion" header="Lugar de atención" sortable />
                        <Column field="FechaInicio" header="Inicio" sortable />
                        <Column field="FechaFin" header="Fin" sortable />
                        <Column field="NombreEmpleado" header="Encargado" sortable />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Quejas, comparisonFn);