import axios from 'axios';

export class EmployeeService {

    getEmployeesSmall() {
        return fetch('/api/employee/').then(res => res.json()).then(data => data);
    }

    getEmployees() {
        return fetch('/api/employee/').then(res => res.json()).then(data => data);


    }

    getEmployeessWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}