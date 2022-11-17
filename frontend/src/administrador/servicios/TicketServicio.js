export class TicketServicio{
    obtenerTicketsAdmin(){
        return fetch('/api/ticket/admin').then(res => res.json()).then(data => data);
    } 
}