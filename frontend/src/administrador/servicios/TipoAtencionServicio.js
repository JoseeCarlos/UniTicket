export class TipoAtencionServicio {
    obtenerTipoAtencion() {
        return fetch('/api/tipoAtencion/').then(res => res.json()).then(data => data);
    }
    crearTipoAtencion(tipoAtencion) {
        return fetch('/api/tipoAtencion/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tipoAtencion)
        });
    }
    actualizarTipoAtencion(tipoAtencion){
        return fetch('/api/tipoAtencion/update/'+tipoAtencion.IdTipoAtencion, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tipoAtencion)
        });
    }

    eliminarTipoAtencion(idTipoAtencion){
        return fetch('/api/tipoAtencion/delete/'+idTipoAtencion, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

}