import axios from 'axios';

export class ServicioMesa {

    getProductsSmall() {
        return axios.get('assets/demo/data/products-small.json').then(res => res.data.data);
    }

    obtenerMesas() {
        return axios.get('assets/demo/data/products.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }

    obtenerMesasLugar(idLugarAtencion){
        return fetch('/api/mesa/lugar/'+idLugarAtencion).then(res => res.json()).then(data => data);
    }
}