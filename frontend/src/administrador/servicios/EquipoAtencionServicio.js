export class EquipoAtencionServicio {

    obtenerEquipoAtencion(){
        return fetch('/api/equipoAtencion/').then(res => res.json()).then(data => data);
    }

    agregarEquipoAtencioon(EquipoAtencion){
        return fetch('/api/equipoAtencion/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(EquipoAtencion)
        });
    }

    modificarEquipoAtencion(EquipoAtencion){
        return fetch('/api/equipoAtencion/update/'+EquipoAtencion.IdEquipoAtencion, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(EquipoAtencion)
        });
    }

    eliminarEquipoAtencion(idEquipoAtencion){
        return fetch('/api/equipoAtencion/delete/'+idEquipoAtencion, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}