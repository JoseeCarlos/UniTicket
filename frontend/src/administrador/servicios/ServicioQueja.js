import axios from 'axios';
export class ServicioQueja {

    getComplaintsSmall() {
        return axios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }

    getComplaints() {
        return fetch('/api/queja/').then(res => res.json()).then(data => data);
    }

    getComplaintsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}