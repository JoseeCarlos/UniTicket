from flask import Blueprint, jsonify, request
from models.BitacoraModelo import BitacoraModelo
from models.UEntidades.Bitacora import Bitacora

bitacora = Blueprint('bitacora', __name__)

@bitacora.route('/', methods=['GET'])
def get_bitacora():
    try:
        bitacora = BitacoraModelo.obtener_bitacoras()
        return jsonify(bitacora)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
