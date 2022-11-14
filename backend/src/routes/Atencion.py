from flask import Blueprint, jsonify, request 
from models.UEntidades.Atencion import Atencion
from models.AtencionModelo import AtencionModelo
from datetime import datetime

atencion = Blueprint('atencion', __name__)

@atencion.route('/', methods=['GET'])
def get_areas():
    try:
        areas = AtencionModelo.obtener_areas()
        return jsonify(areas)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@atencion.route('/<id>', methods=['GET'])
def get_area(id):
    try:
        area = AtencionModelo.get_area(id)
        return jsonify(area)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@atencion.route('/add', methods=['POST'])
def create_area():
    try:
        area = Atencion(Nombre=request.json['Nombre'],Descripcion=request.json['Descripcion'],NumeroMaximoTicketsParaEstudiantes=request.json['NumeroMaximoTicketsParaEstudiantes'], IdUsuarioRegistro=request.json['IdUsuarioRegistro'] ,FechaModificacion=datetime.now())
        affected_rows = AtencionModelo.crear_area(area)
        if affected_rows == 0:
            return jsonify({'error': 'Area no registrado'}), 500
        return jsonify({'message': 'Area registrado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@atencion.route('/update/<id>', methods=['PUT'])
def update_area(id):
    try:
        area = Atencion(IdArea=id,Nombre=request.json['Nombre'],Descripcion=request.json['Descripcion'], FechaModificacion=datetime.now())
        affected_rows = AtencionModelo.modificar_area(area)
        if affected_rows == 0:
            return jsonify({'error': 'Area no actualizado'}), 500
        return jsonify({'message': 'Area actualizado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@atencion.route('/delete/<id>', methods=['DELETE'])
def delete_area(id):
    try:
        affected_rows = AtencionModelo.eliminar_area(id)
        if affected_rows == 0:
            return jsonify({'error': 'Area no eliminado'}), 500
        return jsonify({'message': 'Area eliminado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@atencion.route('/transferencias/<id>', methods=['GET'])
def get_transferencias(id):
    try:
        transferencias = AtencionModelo.obtener_AtencionesTicket(id)
        return jsonify(transferencias)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@atencion.route('/tipoAtencion/<id>', methods=['GET'])
def get_tipoAtencion(id):
    try:
        tipoAtencion = AtencionModelo.obtenerTipoAtencion(id)
        return jsonify(tipoAtencion)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500