import React, { useState, useEffect } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { ServicioMesa } from "../servicios/ServicioMesa";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
const TicketTransferencia = () => {
  let ticketVacio = {
    IdTicket: null,
    Codigo: "",
    Numero: null,
    TipoTicket: null,
    IdTipoAtencion: null,
    IdTipoUsuario: null,
    IdLugarAtencion: null,
    IdArea: null,
    Id_Sitio: null,
    Id_Sede_Academica: null,
    IdUsuarioRegistro: null,
    Estado: "",
    FechaRegistro: "",
    FechaModificacion: "",
  };
  let TicketEnLineaVacio = {
    IdTicket: null,
    FechaHoraReservacion: "",
    IdUsuario: null,
  };
  const [valorFiltroLugarAtencion, establecerValorFiltroLugarAtencion] = useState(null);
  const [valorFiltroEstado, establecerValorFiltroEstado] = useState(null);
  const [valorFiltroAtencion, establecerValorFiltroAtencion] = useState(null);
  const [valorFiltroTipoTicket, establecerValorFiltroTipoTicket] =
    useState(null);
  const [productos, establecerProducto] = useState([]);
  const [filasExpandidas, establecerFilasExpandidas] = useState(null);
  const servicioMesa = new ServicioMesa();
  useEffect(() => {
    servicioMesa
      .getProductsWithOrdersSmall()
      .then((dato) => establecerProducto(dato));
      establecerValorFiltroLugarAtencion([
        { id: 1, nombre: "Cajas tiquipaya" },
        { id: 2, nombre: "Bienestar tiquipaya" },
        { id: 3, nombre: "Tramites tiquipaya" },
      ]);
      establecerValorFiltroEstado([
        { id: 1, nombre: "Activo" },
        { id: 0, nombre: "Inactivo" },
      ]);
    establecerValorFiltroAtencion([
      { id: 1, nombre: "Atendido" },
      { id: 0, nombre: "No Atendido" },
    ]);
    establecerValorFiltroTipoTicket([
      { id: 1, nombre: "Presencial" },
      { id: 0, nombre: "En linea" },
    ]);
  }, []);
  const baseExpancionFilas = (dato) => {
    return (
      <div className="orders-subtable">
        <DataTable
          value={dato.orders}
          responsiveLayout="scroll"
          header={"Atenciones y transferencias de " + dato.name}
          emptyMessage={"No se encontraron atenciones al ticket "+dato.name}
        >
        <Column
          field="productCode"
          header="Empleado de atencion"
          sortable
          headerStyle={{ width: "4rem" }}
        ></Column>
        <Column
          field="id"
          header="Mesa de atencion"
          sortable
          headerStyle={{ width: "4rem" }}
        ></Column>
        <Column
          field="id"
          header="Lugar de atencion"
          sortable
          headerStyle={{ width: "4rem" }}
        ></Column>
        <Column
          field="id"
          header="Lugar de atencion de destino"
          sortable
          headerStyle={{ width: "4rem" }}
        ></Column>
        <Column
          field="id"
          header="Area de destino"
          sortable
          headerStyle={{ width: "4rem" }}
        ></Column>
        <Column
          field="estado"
          header="Estado"
          sortable
          headerStyle={{ width: "4rem" }}
        ></Column>
        <Column
          field="fechaRegistro"
          header="Fecha de registro"
          sortable
          headerStyle={{ width: "4rem" }}
        ></Column>
        <Column
          field="usuarioRegistro"
          header="Usuario"
          sortable
          headerStyle={{ width: "4rem" }}
        ></Column>
        </DataTable>
      </div>
    );
  };
  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5>Tickets</h5>
      <div className="filters">
        <span className="block mt-2 md:mt-0 p-input-icon-left">
          <Dropdown
            optionLabel="nombre"
            placeholder="Filtro por Lugar de Atencion"
            options={valorFiltroLugarAtencion}
            emptyMessage="Activo Inactivo"
          />
          <Dropdown
            optionLabel="nombre"
            placeholder="Filtro por Estado"
            options={valorFiltroEstado}
            emptyMessage="Activo Inactivo"
          />
          <Dropdown
            optionLabel="nombre"
            placeholder="Filtro por Atencion"
            options={valorFiltroAtencion}
            emptyMessage="Atendido No atendido"
          />
          <Dropdown
            optionLabel="nombre"
            placeholder="Filtro por tipo de ticket"
            options={valorFiltroTipoTicket}
            emptyMessage="Presencial Enlinea"
          />
        </span>
      </div>
    </div>
  );
  return (
    <div className="card">
      <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
        <h5>Tickets y Transferencias</h5>
      </div>
      <DataTable
        value={productos}
        expandedRows={filasExpandidas}
        onRowToggle={(e) => establecerFilasExpandidas(e.data)}
        responsiveLayout="scroll"
        rowExpansionTemplate={baseExpancionFilas}
        dataKey="id"
        header={header}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        className="datatable-responsive"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        emptyMessage="No hay lugares de atención."
      >
        <Column expander style={{ width: "1em" }} />
        <Column field="name" header="Codigo" sortable />
        <Column field="id" header="Numero" sortable />
        <Column field="lugaraAtencion" header="Lugar atencion" sortable />
        <Column field="reserva" header="Hora Reserva" sortable />
        <Column field="area" header="Area Origen" sortable />
        <Column field="estado" header="Estado" sortable />
        <Column field="fechaRegistro" header="Fecha Registro" sortable />
        <Column field="usuarioRegistro" header="Usuario" sortable />
      </DataTable>
    </div>
  );
};
const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(TicketTransferencia, comparisonFn);
