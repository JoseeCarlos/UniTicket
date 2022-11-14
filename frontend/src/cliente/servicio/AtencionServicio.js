export class AtencionServicio{
    obtenerAtencionesTicket(idTicket){
        return fetch('/api/atencion/transferencias/'+idTicket).then(res => res.json()).then(data => data);
    }

    obtenerTipoAtencion(idAtencion){
        return fetch('/api/atencion/tipoAtencion/'+idAtencion).then(res => res.json()).then(data => data);
    }
}