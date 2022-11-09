from flask import Blueprint, jsonify, request
from models.LugarAtencionModelo import LugarAtencionModelo
from models.UEntidades.LugarAtencion import LugarAtencion

lugarAtencion = Blueprint('lugarAtencion', __name__)

# @lugarAtencion.route('/', methods=['GET'])
# def get_lugarAtencion():
#     try:
#         lugarAtencion = LugarAtencionModelo.obtener_LugarAtencion()
#         return jsonify(lugarAtencion)
#     except Exception as ex:
#         return jsonify({'error': str(ex)}), 500

# @lugarAtencion.route('/<id>', methods=['GET'])
# def get_lugarAtencion(id):
#     try:
#         lugarAtencion = LugarAtencionModelo.obtener_LugarAtencion(id)
#         return jsonify(lugarAtencion)
#     except Exception as ex:
#         return jsonify({'error': str(ex)}), 500

# @lugarAtencion.route('/add', methods=['POST'])
# def create_lugarAtencion():
#     try:
#         lugarAtencion = LugarAtencion(name=request.json['name'], description=request.json['description'], updateDate=request.json['updateDate'], userIdCreate=request.json['userIdCreate'])
#         affected_rows = LugarAtencionModelo.crear_LugarAtencion(lugarAtencion)
#         if affected_rows == 0:
#             return jsonify({'error': 'LugarAtencion no registrado'}), 500
#         return jsonify({'message': 'LugarAtencion registrado'}), 200       
#     except Exception as ex:
#         return jsonify({'error': str(ex)}), 500

# @lugarAtencion.route('/update', methods=['PUT'])
# def update_lugarAtencion():
#     try:
#         lugarAtencion = LugarAtencion(id=request.json['id'], name=request.json['name'], description=request.json['description'], updateDate=request.json['updateDate'], userIdCreate=request.json['userIdCreate'])
#         affected_rows = LugarAtencionModelo.actualizar_LugarAtencion(lugarAtencion)
#         if affected_rows == 0:
#             return jsonify({'error': 'LugarAtencion no actualizado'}), 500
#         return jsonify({'message': 'LugarAtencion actualizado'}), 200       
#     except Exception as ex:
#         return jsonify({'error': str(ex)}), 500

# @lugarAtencion.route('/delete/<id>', methods=['DELETE'])
# def delete_lugarAtencion(id):
#     try:
#         affected_rows = LugarAtencionModelo.eliminar_LugarAtencion(id)
#         if affected_rows == 0:
#             return jsonify({'error': 'LugarAtencion no eliminado'}), 500
#         return jsonify({'message': 'LugarAtencion eliminado'}), 200       
#     except Exception as ex:
#         return jsonify({'error': str(ex)}), 500

@lugarAtencion.route('/lugarSito/<id>', methods=['GET'])
def get_lugarSito(id):
    try:
        lugarSito = LugarAtencionModelo.obtenerAreas_sitio(id)
        return jsonify(lugarSito)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500






