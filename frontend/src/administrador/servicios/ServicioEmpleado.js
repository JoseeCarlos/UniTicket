import axios from 'axios';

export class ServicioEmpleado {

    getEmployeesSmall() {
        return axios.get('assets/demo/data/customers-medium.json').then(res => res.data.data);
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

    updateEmployee(employee) {
        return fetch('/api/employee/update/'+employee.userId,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        }).then(res => res.json()).then(data => data);
    }

    deleteEmployee(id) {
        return fetch('/api/employee/delete/'+id,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }).then(res => res.json()).then(data => data);
    }

    sentEmail(email,username,password) {
        //create metod
        
    }

    getEmployeessWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
    login(user) {
        return fetch('/api/employee/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(data => data);
    }

    loginEstudent (user) {
        return axios.get('assets/demo/data/Estudiantes.json').then(res => res.data.data);
        // return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);

        // return data;
    
    }

    loginFather (user) {
        return fetch('/api/employee/loginFather',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(data => data);
    }

    loginEmployee (user) {
        return fetch('/api/employee/loginEmployee',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => res.json()).then(data => data);
    }
}