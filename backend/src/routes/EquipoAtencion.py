from flask import Blueprint, jsonify, request
from models.EquipoAtencionModelo import EquipoAtencionModelo
from models.UEntidades.EquipoAtencion import EquipoAtencion


equipo_atencion = Blueprint('equipo_atencion', __name__)

@equipo_atencion.route('/', methods=['GET'])
def get_equipos_atencion():
    try:
        equipos_atencion = EquipoAtencionModelo.obtener_equipos_atencion()
        return jsonify(equipos_atencion)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@equipo_atencion.route('/<idEquipoAtencion>', methods=['GET'])
def get_equipo_atencion(idEquipoAtencion):
    try:
        equipo_atencion = EquipoAtencionModelo.obtener_equipo_atencion(idEquipoAtencion)
        return jsonify(equipo_atencion)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@equipo_atencion.route('/add', methods=['POST'])
def registrar_equipo_atencion():
    try:
        equipo_atencion = EquipoAtencion(**request.json)
        filas_afectadas = EquipoAtencionModelo.registrar_equipo_atencion(equipo_atencion)
        return jsonify({'filas_afectadas': filas_afectadas})
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@equipo_atencion.route('/update/<int:idEquipoAtencion>', methods=['PUT'])
def actualizar_equipo_atencion(idEquipoAtencion):
    try:
        equipo_atencion = EquipoAtencion(**request.json)
        filas_afectadas = EquipoAtencionModelo.actualizar_equipo_atencion(idEquipoAtencion, equipo_atencion)
        return jsonify({'filas_afectadas': filas_afectadas})
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@equipo_atencion.route('/delete/<int:idEquipoAtencion>', methods=['DELETE'])
def eliminar_equipo_atencion(idEquipoAtencion):
    try:
        filas_afectadas = EquipoAtencionModelo.eliminar_equipo_atencion(idEquipoAtencion)
        return jsonify({'filas_afectadas': filas_afectadas})
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500