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

@asignacion.route('/<int:id>', methods=['GET'])
def get_asignacion_id(id):
    try:
        asignacion = AsignacionModelo.obtener_asignacion(id)
        return jsonify(asignacion)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@asignacion.route('/add', methods=['POST'])
def create_asignacion():
    try:
        asignacion = Asignacion(IdEmpleado=request.json['IdEmpleado'], IdMesa=request.json['IdMesa'], FechaInicio=request.json['FechaInicio'], FechaFin=request.json['FechaFin'], IdUsuarioRegistro=request.json['IdUsuarioRegistro'])
        filas_afectadas = AsignacionModelo.crearAsignacion(asignacion)
        if filas_afectadas == 0:
            return jsonify({'error': 'Asignacion no registrado'}), 500
        return jsonify({'message': 'Asignacion registrado'}), 200  
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

