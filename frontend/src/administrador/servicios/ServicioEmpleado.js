import axios from 'axios';

export class ServicioEmpleado {

    getEmployeesSmall() {
        return axios.get('assets/demo/data/customers-medium.json').then(res => res.data.data);
    }

    getEmployees() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }

    getEmployeessWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}