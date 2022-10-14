import axios from 'axios';

export class CampusService {

    getCampusSmall() {
        return fetch('/api/campus/').then(res => res.json()).then(data => data);
    }

    getCampuss() {
        return fetch('/api/campus/').then(res => res.json()).then(data => data);
    }
    addCampus(campus) {
        return fetch('/api/campus/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campus)
        });
    }

    deleteCampus(campus) {
        return fetch('/api/campus/delete/'+campus.campusId,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campus.campusId)
        }).then(res => res.json()).then(data => data);
    }
    updateCampus(campus) {
        return fetch('/api/campus/update', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(campus)
        });
    }

    getCampusWithOrdersSmall() {
        return axios.get('assets/demo/data/products-orders-small.json').then(res => res.data.data);
    }
}