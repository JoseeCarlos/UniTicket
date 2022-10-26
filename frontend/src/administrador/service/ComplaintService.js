import axios from 'axios';

export class ComplaintService {

    getComplaintsSmall() {
        return axios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }

    getComplaints() {
        return fetch('/api/complain/').then(res => res.json()).then(data => data);
    }

    getComplaintsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}