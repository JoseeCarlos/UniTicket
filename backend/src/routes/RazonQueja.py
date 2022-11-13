from flask import Blueprint, jsonify, request
from models.RazonQuejaModelo import RazonQuejaModelo
from models.UEntidades.RazonQueja import RazonQueja
from datetime import datetime

razonQueja = Blueprint('razonQueja', __name__)

@razonQueja.route('/', methods=['GET'])
def get_reasonComplain():
    try:
        reasonComplain = RazonQuejaModelo.obtener_razones_queja()
        return jsonify(reasonComplain)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@razonQueja.route('/<int:id>', methods=['GET'])
def get_reasonComplain_id(id):
    try:
        reasonComplain = RazonQuejaModelo.obtener_RazonQueja(id)
        return jsonify(reasonComplain)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@razonQueja.route('/add', methods=['POST'])
def create_reasonComplain():
    try:
        reasonComplain = RazonQueja(Nombre=request.json['Nombre'], Descripcion=request.json['Descripcion'], IdUsuarioRegistro=request.json['IdUsuarioRegistro'])
        filas_afectadas = RazonQuejaModelo.crear_razon_queja(reasonComplain)
        if filas_afectadas == 0:
            return jsonify({'error': 'RazonQueja no registrado'}), 500
        return jsonify({'message': 'RazonQueja registrado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@razonQueja.route('/update/<int:id>', methods=['PUT'])
def update_reasonComplain(id):
    try:
        reasonComplain = RazonQueja(IdRazonQueja=id, Nombre=request.json['Nombre'], Descripcion=request.json['Descripcion'],FechaModificacion=datetime.now())
        filas_afectadas = RazonQuejaModelo.actualizar_razon_queja(reasonComplain)
        if filas_afectadas == 0:
            return jsonify({'error': 'RazonQueja no actualizado'}), 500
        return jsonify({'message': 'RazonQueja actualizado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@razonQueja.route('/delete/<int:id>', methods=['DELETE'])
def delete_reasonComplain(id):
    try:
        filas_afectadas = RazonQuejaModelo.eliminar_razon_queja(id)
        if filas_afectadas == 0:
            return jsonify({'error': 'RazonQueja no eliminado'}), 500
        return jsonify({'message': 'RazonQueja eliminado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500





