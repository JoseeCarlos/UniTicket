from flask import Blueprint, jsonify, request
from models.TramiteModelo import TramiteModelo
from models.UEntidades.Tramite import Tramite

tramite = Blueprint('tramite', __name__)

@tramite.route('/', methods=['GET'])
def get_tramites():
    try:
        tramites = TramiteModelo.obtener_tramites()
        return jsonify(tramites)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tramite.route('/<int:id>', methods=['GET'])
def get_tramite_id(id):
    try:
        tramite = TramiteModelo.obtener_tramite(id)
        return jsonify(tramite)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tramite.route('/add', methods=['POST'])
def create_tramite():
    try:
        tramite = Tramite(Nombre=request.json['Nombre'], Descripcion=request.json['Descripcion'])
        filas_afectadas = TramiteModelo.crearTramite(tramite)
        if filas_afectadas == 0:
            return jsonify({'error': 'Tramite no registrado'}), 500
        return jsonify({'message': 'Tramite registrado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tramite.route('/update/<int:id>', methods=['PUT'])
def update_tramite(id):
    try:
        tramite = Tramite(IdTramite=id, Nombre=request.json['Nombre'], Descripcion=request.json['Descripcion'])
        filas_afectadas = TramiteModelo.actualizarTramite(tramite)
        if filas_afectadas == 0:
            return jsonify({'error': 'Tramite no actualizado'}), 500
        return jsonify({'message': 'Tramite actualizado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tramite.route('/delete/<int:id>', methods=['DELETE'])
def delete_tramite(id):
    try:
        filas_afectadas = TramiteModelo.eliminarTramite(id)
        if filas_afectadas == 0:
            return jsonify({'error': 'Tramite no eliminado'}), 500
        return jsonify({'message': 'Tramite eliminado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
