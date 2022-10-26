import React, { useState, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { ToggleButton } from 'primereact/togglebutton';
import { Rating } from 'primereact/rating';
import { CustomerService } from '../service/CustomerService';
import { ProductService } from '../service/ProductService';
import { ComplaintService } from '../service/ComplaintService';

const TableDemo = () => {
    const [customers1, setCustomers1] = useState(null);
    const [customers2, setCustomers2] = useState([]);
    const [customers3, setCustomers3] = useState([]);
    const [filters1, setFilters1] = useState(null);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [idFrozen, setIdFrozen] = useState(false);
    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);

    const representatives = [
        { name: "Amy Elsner", image: 'amyelsner.png' },
        { name: "Anna Fali", image: 'annafali.png' },
        { name: "Asiya Javayant", image: 'asiyajavayant.png' },
        { name: "Bernardo Dominic", image: 'bernardodominic.png' },
        { name: "Elwin Sharvill", image: 'elwinsharvill.png' },
        { name: "Ioni Bowcher", image: 'ionibowcher.png' },
        { name: "Ivan Magalhaes", image: 'ivanmagalhaes.png' },
        { name: "Onyama Limba", image: 'onyamalimba.png' },
        { name: "Stephen Shaw", image: 'stephenshaw.png' },
        { name: "XuXue Feng", image: 'xuxuefeng.png' }
    ];

    const statuses = [
        'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
    ];

    const customerService = new CustomerService();
    const productService = new ProductService();
    const [complains, setComplains] = useState([]);
    const complaintService = new ComplaintService();

    useEffect(() => {
        setLoading2(true);

        customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        customerService.getCustomersLarge().then(data => { setCustomers2(getCustomers(data)); setLoading2(false); });
        customerService.getCustomersMedium().then(data => setCustomers3(data));
        productService.getProductsWithOrdersSmall().then(data => setProducts(data));
        complaintService.getComplaints().then(data => {
            console.log(data)
            setComplains(data)
        });


        initFilters1();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const balanceTemplate = (rowData) => {
        return (
            <span className="text-bold">
                {formatCurrency(rowData.balance)}
            </span>
        )
    }

    const getCustomers = (data) => {
        return [...data || []].map(d => {
            d.date = new Date(d.date);
            return d;
        });
    }

    const formatDate = (value) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const initFilters1 = () => {
        setFilters1({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'representative': { value: null, matchMode: FilterMatchMode.IN },
            'date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            'balance': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'status': { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            'activity': { value: null, matchMode: FilterMatchMode.BETWEEN },
            'verified': { value: null, matchMode: FilterMatchMode.EQUALS }
        });
    }


    const countryBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <img alt="flag" src="assets/demo/images/flags/flag_placeholder.png" className={`flag flag-${rowData.country.code}`} width={30} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">{rowData.country.name}</span>
            </React.Fragment>
        );
    }

    const filterClearTemplate = (options) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} className="p-button-secondary"></Button>;
    }

    const filterApplyTemplate = (options) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} className="p-button-success"></Button>
    }

    const representativeBodyTemplate = (rowData) => {
        const representative = rowData.representative;
        return (
            <React.Fragment>
                <img alt={representative.name} src={`images/avatar/${representative.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} width={32} style={{ verticalAlign: 'middle' }} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">{representative.name}</span>
            </React.Fragment>
        );
    }

    const representativeFilterTemplate = (options) => {
        return (<>
            <div className="mb-3 text-bold">Agent Picker</div>
            <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />
        </>
        )
    }

    const representativesItemTemplate = (option) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`assets/demo/images/avatar/${option.image}`} width={32} style={{ verticalAlign: 'middle' }} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }} className="image-text">{option.name}</span>
            </div>
        );
    }

    const dateBodyTemplate = (rowData) => {
        return formatDate(rowData.date);
    }

    const dateFilterTemplate = (options) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />
    }

    const balanceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.balance);
    }

    const balanceFilterTemplate = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} mode="currency" currency="USD" locale="en-US" />
    }


    const statusFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={statusItemTemplate} placeholder="Select a Status" className="p-column-filter" showClear />;
    }

    const statusItemTemplate = (option) => {
        return <span className={`customer-badge status-${option}`}>{option}</span>;
    }

    const activityBodyTemplate = (rowData) => {
        return <ProgressBar value={rowData.activity} showValue={false} style={{ height: '.5rem' }}></ProgressBar>;
    }

    const activityFilterTemplate = (options) => {
        return (
            <React.Fragment>
                <Slider value={options.value} onChange={(e) => options.filterCallback(e.value)} range className="m-3"></Slider>
                <div className="flex align-items-center justify-content-between px-2">
                    <span>{options.value ? options.value[0] : 0}</span>
                    <span>{options.value ? options.value[1] : 100}</span>
                </div>
            </React.Fragment>
        )
    }

    const verifiedBodyTemplate = (rowData) => {
        return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.verified, 'text-pink-500 pi-times-circle': !rowData.verified })}></i>;
    }

    const verifiedFilterTemplate = (options) => {
        return <TriStateCheckbox value={options.value} onChange={(e) => options.filterCallback(e.value)} />
    }

    const expandAll = () => {
        let _expandedRows = {};
        products.forEach(p => _expandedRows[`${p.id}`] = true);

        setExpandedRows(_expandedRows);
    }

    const collapseAll = () => {
        setExpandedRows(null);
    }

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    }

    const statusOrderBodyTemplate = (rowData) => {
        return <span className={`order-badge order-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
    }

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />;
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={`images/product/${rowData.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="shadow-2" width={100} />;
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    const statusBodyTemplate2 = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                <h5>{data.userName}</h5>
                <p>{data.name}</p>
                <p>{data.description}</p>
                {/* Poner la razon */}
                {data.complainType == '1' ? <Button type="button" icon="pi pi-check">Habilitar Tickect</Button> : ''  }
            </div>
        );
    }

    const header = (
        <div className="table-header-container">
            <Button icon="pi pi-plus" label="Mostrar todo" onClick={expandAll} className="mr-2 mb-2" />
            <Button icon="pi pi-minus" label="Ocultar todo" onClick={collapseAll} className="mb-2" />
        </div>
    );

    const headerTemplate = (data) => {
        return (
            <React.Fragment>
                <img alt={data.representative.name} src={`images/avatar/${data.representative.image}`} width="32" style={{ verticalAlign: 'middle' }} />
                <span className="image-text font-bold">{data.representative.name}</span>
            </React.Fragment>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return (
          <>
            <span className="p-column-title">Status</span>
            <span className={`provider-badge status-${ rowData.status === 0 ?  'outofstock' : 'instock' }`}>{ rowData.status === 0 ? 'Inactivo' : 'Activo' }</span>
          </>
        );
      }

    const footerTemplate = (data) => {
        return (
            <React.Fragment>
                <td colSpan="4" style={{ textAlign: 'right' }} className="text-bold pr-6">Total Customers</td>
                <td>{calculateCustomerTotal(data.representative.name)}</td>
            </React.Fragment>
        );
    }
    const emailBodyTemplate = (rowData) => {
        return (
          <>
            <span className="p-column-title">Status</span>
            <span className={`provider-badge status-${ rowData.complainType === 0 ?  'outofstock' : 'instock' }`}>{ rowData.complainType === 0 ? 'OFFLINE' : 'ONLINE' }</span>
          </>
        );
      }

      const attentionTypeTemplate = (rowData) => {
        return (
          <>
            <span className="p-column-title">AttentionType</span>
            <span className={`provider-badge status-${ rowData.attentionType === 0 ?  'outofstock' : 'instock' }`}>{ rowData.attentionType === 0 ? 'NORMAL' : 'TRANSFERENCIA' }</span>
          </>
        );
      }
    


    const calculateCustomerTotal = (name) => {
        let total = 0;

        if (customers3) {
            for (let customer of customers3) {
                if (customer.representative.name === name) {
                    total++;
                }
            }
        }

        return total;
    }

    return (
        <div className="grid table-demo">
            <div className="col-12">
                <div className="card">
                    <h5>Administración de Quejas</h5>
                    <DataTable value={complains} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)} responsiveLayout="scroll"
                        rowExpansionTemplate={rowExpansionTemplate} dataKey="id" header={header} paginator rows={10} rowsPerPageOptions={[5, 10, 25]} 
                        className="datatable-responsive" paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} al {last} de {totalRecords} Quejas" emptyMessage="No hay quejas :D.">
                        <Column expander style={{ width: '3em' }} />
                        <Column field="userName" header="Name" sortable />
                        <Column field="complainType" header="Tipo de Queja" sortable body={emailBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="attentionType" header="Tipo de Atencion " sortable body={attentionTypeTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="tableName" header="Lugar de atención" sortable />
                        <Column field="startTime" header="Inicio" sortable />
                        <Column field="finishTime" header="Fin" sortable />
                        <Column field="employeeName" header="Encargado" sortable />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(TableDemo, comparisonFn);
