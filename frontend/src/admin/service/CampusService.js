import axios from 'axios';

export class CampusService {

    getCampusSmall() {
        return axios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }

    getCampuss() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }

    getCampusWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}