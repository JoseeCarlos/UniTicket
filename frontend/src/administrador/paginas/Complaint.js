import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

const Quejas = () => {
    const [filasExpandidas, establecerFilasExpandidas] = useState(null);
    const expandirTodo = () => {
        let _filasExpandidas = {};
        quejas.forEach(p => _filasExpandidas[`${q.id}`] = true);

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
                {datos.name == 'Bracelet' ? <Button type="button" icon="pi pi-check">Habilitar Tickect</Button> : ''  }
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
                        <Column field="nombre" header="nombre" sortable />
                        <Column field="tipo" header="Tipo" sortable />
                        <Column field="tipoAtencion" header="Tipo de atención" sortable />
                        <Column field="lugarAtencion" header="Lugar de atención" sortable />
                        <Column field="fechaIncio" header="Inicio" sortable />
                        <Column field="fechaFin" header="Fin" sortable />
                        <Column field="empleado" header="Encargado" sortable />
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