import axios from 'axios';

export class ReservaServicio {

    getProductsSmall() {
        return axios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }

    obtenerHora() {
        return axios.get('assets/demo/data/horas.json').then(res => res.data.data);
    }
}