export class LugarAtencionServicio{

    obtenerLugarAtencionArea(){
        return fetch('/api/lugarAtencionArea/').then(res => res.json()).then(data => data);
    }
    obtenerLugarAtencion(){
        return fetch('/api/lugarAtencion/').then(res => res.json()).then(data => data);
    }

    agregarLugarAtencion(LugarAtencion){
        return fetch('/api/lugarAtencion/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(LugarAtencion)
        });
    }
}