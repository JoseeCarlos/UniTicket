from flask import Blueprint, jsonify, request
from models.TipoUsuarioModelo import TipoUsuarioModelo 
from models.UEntidades.TipoUsuario import TipoUsuario
from datetime import datetime

tipoUsuario = Blueprint('tipoUsuario', __name__)

@tipoUsuario.route('/', methods=['GET'])
def get_tipoUsuario():
    try:
        tipoUsuario = TipoUsuarioModelo.obtener_TipoUsuarios()
        return jsonify(tipoUsuario)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tipoUsuario.route('/<int:id>', methods=['GET'])
def get_tipoUsuario_id(id):
    try:
        tipoUsuario = TipoUsuarioModelo.obtener_TipoUsuario(id)
        return jsonify(tipoUsuario)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tipoUsuario.route('/add', methods=['POST'])
def create_tipoUsuario():
    try:
        tipoUsuario = TipoUsuario(Nombre=request.json['Nombre'], Descripcion=request.json['Descripcion'], IdUsuarioRegistro=request.json['IdUsuarioRegistro'])
        filas_afectadas = TipoUsuarioModelo.crear_TipoUsuario(tipoUsuario)
        if filas_afectadas == 0:
            return jsonify({'error': 'TipoUsuario no registrado'}), 500
        return jsonify({'message': 'TipoUsuario registrado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tipoUsuario.route('/update/<id>', methods=['PUT'])
def update_tipoUsuario(id):
    try:
        tipoUsuario = TipoUsuario(idTipoUsuario=id, Nombre=request.json['Nombre'], Descripcion=request.json['Descripcion'], FechaModificacion=datetime.now())
        filas_afectadas = TipoUsuarioModelo.modificar_TipoUsuario(tipoUsuario)
        if filas_afectadas == 0:
            return jsonify({'error': 'TipoUsuario no actualizado'}), 500
        return jsonify({'message': 'TipoUsuario actualizado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tipoUsuario.route('/delete/<int:id>', methods=['DELETE'])
def delete_tipoUsuario(id):
    try:
        filas_afectadas = TipoUsuarioModelo.eliminar_TipoUsuario(id)
        if filas_afectadas == 0:
            return jsonify({'error': 'TipoUsuario no eliminado'}), 500
        return jsonify({'message': 'TipoUsuario eliminado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500


