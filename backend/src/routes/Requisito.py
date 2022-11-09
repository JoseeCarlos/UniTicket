from flask import Blueprint, jsonify, request
from models.RequisitoModelo import RequisitoModelo
from models.UEntidades.Requisito import Requisito

requisito = Blueprint('requisito', __name__)

@requisito.route('/', methods=['GET'])
def get_requisitos():
    try:
        requisitos = RequisitoModelo.obtener_requisitos()
        return jsonify(requisitos)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@requisito.route('/<int:id>', methods=['GET'])
def get_requisito_id(id):
    try:
        requisito = RequisitoModelo.obtener_requisito(id)
        return jsonify(requisito)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@requisito.route('/add', methods=['POST'])
def create_requisito():
    try:
        requisito = Requisito(Nombre=request.json['Nombre'], Descripcion=request.json['Descripcion'])
        filas_afectadas = RequisitoModelo.crearRequisito(requisito)
        if filas_afectadas == 0:
            return jsonify({'error': 'Requisito no registrado'}), 500
        return jsonify({'message': 'Requisito registrado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@requisito.route('/update', methods=['PUT'])
def update_requisito():
    try:
        requisito = Requisito(IdRequisito=request.json['IdRequisito'], Nombre=request.json['Nombre'], Descripcion=request.json['Descripcion'])
        filas_afectadas = RequisitoModelo.actualizarRequisito(requisito)
        if filas_afectadas == 0:
            return jsonify({'error': 'Requisito no actualizado'}), 500
        return jsonify({'message': 'Requisito actualizado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@requisito.route('/delete/<int:id>', methods=['DELETE'])
def delete_requisito(id):
    try:
        filas_afectadas = RequisitoModelo.eliminarRequisito(id)
        if filas_afectadas == 0:
            return jsonify({'error': 'Requisito no eliminado'}), 500
        return jsonify({'message': 'Requisito eliminado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@requisito.route('/tramite/<id>', methods=['GET'] )
def obtener_tramites(id):
    try:
        tramites = RequisitoModelo.obtener_requisito_tramite(id)
        return jsonify(tramites)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

    
