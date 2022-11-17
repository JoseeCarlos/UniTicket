from flask import Blueprint, jsonify, request
from models.TicketModelo import TicketModelo
from models.UEntidades.Ticket import Ticket
from models.UEntidades.TicketUsuario import TicketUsuario

ticket = Blueprint('ticket', __name__)

@ticket.route('/', methods=['GET'])
def get_ticket():
    try:
        ticket = TicketModelo.obtener_Tickets()
        return jsonify(ticket)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@ticket.route('/<int:id>', methods=['GET'])
def get_ticket_id(id):
    try:
        ticket = TicketModelo.obtener_Ticket(id)
        return jsonify(ticket)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@ticket.route('/add', methods=['POST'])
def create_ticket():
    try:
        ticket = Ticket(IdTicket=request.json['IdTicket'], IdUsuario=request.json['IdUsuario'], IdTipoAtencion=request.json['IdTipoAtencion'], IdEstado=request.json['IdEstado'], Fecha=request.json['Fecha'], Descripcion=request.json['Descripcion'])
        filas_afectadas = TicketModelo.crearTicket(ticket)
        if filas_afectadas == 0:
            return jsonify({'error': 'Ticket no registrado'}), 500
        return jsonify({'message': 'Ticket registrado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@ticket.route('/update/<int:id>', methods=['PUT'])
def update_ticket(id):
    try:
        ticket = Ticket(IdTicket=id, IdUsuario=request.json['IdUsuario'], IdTipoAtencion=request.json['IdTipoAtencion'], IdEstado=request.json['IdEstado'], Fecha=request.json['Fecha'], Descripcion=request.json['Descripcion'])
        filas_afectadas = TicketModelo.actualizarTicket(ticket)
        if filas_afectadas == 0:
            return jsonify({'error': 'Ticket no actualizado'}), 500
        return jsonify({'message': 'Ticket actualizado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@ticket.route('/delete/<int:id>', methods=['DELETE'])
def delete_ticket(id):
    try:
        filas_afectadas = TicketModelo.eliminarTicket(id)
        if filas_afectadas == 0:
            return jsonify({'error': 'Ticket no eliminado'}), 500
        return jsonify({'message': 'Ticket eliminado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@ticket.route('/ticketUsuario/<id>', methods=['GET'])
def get_ticket_usuario(id):
    try:
        ticket = TicketModelo.obtener_TicketsPorUsuario(id)
        return jsonify(ticket)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@ticket.route('/historial/<id>', methods=['GET'])
def get_historial(id):
    try:
        ticket = TicketModelo.obtener_historialTickets(id)
        return jsonify(ticket)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@ticket.route('/admin', methods=['GET'])
def get_ticket_admin():
    try:
        ticket = TicketModelo.obtener_TicketsAdmin()
        return jsonify(ticket)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500