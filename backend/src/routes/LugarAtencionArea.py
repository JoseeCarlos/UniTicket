from flask import Blueprint, jsonify, request
from models.LugarAtencion_AreaModelo import LugarAtencion_AreaModelo 

lugarAtencionArea = Blueprint('lugarAtencionArea', __name__)

@lugarAtencionArea.route('/', methods=['GET'])
def get_lugarAtencionAreas():
    try:
        lugarAtencionAreas = LugarAtencion_AreaModelo.obtener_LugarAtencionAreas()
        return jsonify(lugarAtencionAreas)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
    