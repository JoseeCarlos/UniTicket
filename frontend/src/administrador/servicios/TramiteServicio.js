export class TramiteServicio{
    obtenerTramites(){
        return fetch('/api/tramite/').then(res => res.json()).then(data => data);
    }
    obtenerTramite(idTramite){
        return fetch('/api/tramite/'+idTramite).then(res => res.json()).then(data => data);
    }
    crearTramite(tramite){
        return fetch('/api/tramite/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tramite)
        });
    }
    actualizarTramite(tramite){
        return fetch('/api/tramite/update/'+tramite.idTramite, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tramite)
        });
    }
    eliminarTramite(idTramite){
        return fetch('/api/tramite/delete/'+idTramite, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}