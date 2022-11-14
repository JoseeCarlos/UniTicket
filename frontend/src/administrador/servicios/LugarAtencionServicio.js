export class LugarAtencionServicio{

    obtenerLugarAtencionArea(){
        return fetch('/api/lugarAtencionArea/').then(res => res.json()).then(data => data);
    }
}