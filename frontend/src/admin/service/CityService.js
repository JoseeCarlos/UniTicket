export class CityService{

    getCities(){
        return fetch('/api/city/').then(res => res.json()).then(data => data);
    }
}