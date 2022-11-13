export class TicketServicio {
    obtenerTicketsUsuario(idUsuario){
        return fetch('/api/ticket/ticketUsuario/'+idUsuario).then(res => res.json()).then(data => data);
    }

    obtenerHistorialTicket(idUsuario){
        return fetch('/api/ticket/historial/'+idUsuario).then(res => res.json()).then(data => data);
    }
}