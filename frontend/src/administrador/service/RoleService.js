export class RoleService {

    getEmployeesSmall() {
        return fetch('/api/employee/').then(res => res.json()).then(data => data);
    }

    getRoles() {
        return fetch('/api/roles/').then(res => res.json()).then(data => data);


    }

    getEmployeessWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}