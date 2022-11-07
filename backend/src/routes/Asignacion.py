from flask import Blueprint, jsonify, request
from models.AsignacionModelo import AsignacionModelo
from models.UEntidades.AsigancionEmpleado import AsignacionEmpleado
from models.UEntidades.Asignacion import Asignacion

asignacion = Blueprint('asignacion', __name__)

@asignacion.route('/', methods=['GET'])
def get_asignacion():
    try:
        asignacion = AsignacionModelo.obtener_asignaciones()
        return jsonify(asignacion)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
