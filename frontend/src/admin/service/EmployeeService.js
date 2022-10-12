import axios from 'axios';

export class EmployeeService {

    getEmployeesSmall() {
        return fetch('/api/employee/').then(res => res.json()).then(data => data);
    }

    getEmployees() {
        return fetch('/api/employee/').then(res => res.json()).then(data => data);


    }

    setEmployee(employee) {
        return fetch('/api/employee/add',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        }).then(res => res.json()).then(data => data);
    }

    getEmployeessWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}