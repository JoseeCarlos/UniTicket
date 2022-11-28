export class TicketServicio {
    obtenerLugarAtencion(idSitio) {
        return fetch('/api/lugarAtencion/lugarSito/' + idSitio).then(res => res.json()).then(data => data);
    }

    obtenerTiposUsuarios() {
        return fetch('/api/tipoUsuario/').then(res => res.json()).then(data => data);
    }

    obtenerTipoAtencion() {
        return fetch('/api/tipoAtencion/').then(res => res.json()).then(data => data);
    }

    obtenerLugarAtencionCodigo(codigo) {
        return fetch('/api/lugarAtencion/lugarAtencionCodigo/' + codigo).then(res => res.json()).then(data => data);
    }

    guardarTicket(ticket) {
        return fetch('/api/ticket/addPresencial', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        });
    }

}