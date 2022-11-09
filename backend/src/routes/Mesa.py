from flask import Blueprint, jsonify, request
from models.MesaModelo import MesaModelo
from models.UEntidades.Mesa import Mesa 

mesa = Blueprint('mesa', __name__)

@mesa.route('/', methods=['GET'])
def get_mesas():
    try:
        mesas = MesaModelo.obtener_mesas()
        return jsonify(mesas)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@mesa.route('/<int:id>', methods=['GET'])
def get_mesa(id):
    try:
        mesa = MesaModelo.obtener_mesa(id)
        return jsonify(mesa)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@mesa.route('/', methods=['POST'])
def create_mesa():
    try:
        mesa = Mesa.from_JSON(request.json)
        MesaModelo.crear_mesa(mesa)
        return jsonify({'message': 'Mesa created successfully'}), 201
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@mesa.route('/', methods=['PUT'])
def update_mesa():
    try:
        mesa = Mesa.from_JSON(request.json)
        MesaModelo.actualizar_mesa(mesa)
        return jsonify({'message': 'Mesa updated successfully'}), 201
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@mesa.route('/<int:id>', methods=['DELETE'])
def delete_mesa(id):
    try:
        MesaModelo.eliminar_mesa(id)
        return jsonify({'message': 'Mesa deleted successfully'}), 201
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@mesa.route('/lugar/<id>', methods=['GET'])
def obtener_mesa_lugar(id):
    try:
        mesas = MesaModelo.obtenerMesaLugarAtencion(id)
        return jsonify(mesas)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

