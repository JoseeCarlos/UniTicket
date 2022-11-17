export class LugarAtencionServicio{

    obtenerLugarAtencionArea(){
        return fetch('/api/lugarAtencionArea/').then(res => res.json()).then(data => data);
    }
    obtenerLugarAtencion(){
        return fetch('/api/lugarAtencion/').then(res => res.json()).then(data => data);
    }
}