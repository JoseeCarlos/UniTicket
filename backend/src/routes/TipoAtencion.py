from flask import Blueprint, jsonify, request
from models.TipoAtencionModelo import TipoAtencionModelo 
from models.UEntidades.TipoAtencion import TipoAtencion
from datetime import datetime

tipoAtencion = Blueprint('tipoAtencion', __name__)


@tipoAtencion.route('/', methods=['GET'])
def get_tipoAtencion():
    try:
        tipoAtencion = TipoAtencionModelo.obtener_TipoAtenciones()
        return jsonify(tipoAtencion)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tipoAtencion.route('/<int:id>', methods=['GET'])
def get_tipoAtencion_id(id):
    try:
        tipoAtencion = TipoAtencionModelo.obtener_TipoAtencion(id)
        return jsonify(tipoAtencion)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tipoAtencion.route('/add', methods=['POST'])
def create_tipoAtencion():
    try:
        tipoAtencion = TipoAtencion(Nombre=request.json['Nombre'], Importancia=request.json['Importancia'], IdUsuarioRegistro=request.json['IdUsuarioRegistro'], FechaRegistro=datetime.now())
        filas_afectadas = TipoAtencionModelo.crear_TipoAtencion(tipoAtencion)
        if filas_afectadas == 0:
            return jsonify({'error': 'TipoAtencion no registrado'}), 500
        return jsonify({'message': 'TipoAtencion registrado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tipoAtencion.route('/update/<int:id>', methods=['PUT'])
def update_tipoAtencion(id):
    try:
        print(datetime.now())
        tipoAtencion = TipoAtencion(IdTipoAtencion=id, Nombre=request.json['Nombre'], Importancia=request.json['Importancia'], FechaModificacion=datetime.now())
        filas_afectadas = TipoAtencionModelo.actualizar_TipoAtencion(tipoAtencion)
        if filas_afectadas == 0:
            return jsonify({'error': 'TipoAtencion no actualizado'}), 500
        return jsonify({'message': 'TipoAtencion actualizado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@tipoAtencion.route('/delete/<int:id>', methods=['DELETE'])
def delete_tipoAtencion(id):
    try:
        filas_afectadas = TipoAtencionModelo.eliminar_TipoAtencion(id)
        if filas_afectadas == 0:
            return jsonify({'error': 'TipoAtencion no eliminado'}), 500
        return jsonify({'message': 'TipoAtencion eliminado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500



