import axios from 'axios';

export class CampusService {

    getCampusSmall() {
        return fetch('/api/campus/').then(res => res.json()).then(data => data);
    }

    getCampuss() {
        return fetch('/api/campus/').then(res => res.json()).then(data => data);
    }

    getCampusWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}