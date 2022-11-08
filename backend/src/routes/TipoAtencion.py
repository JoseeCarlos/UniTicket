from flask import Blueprint, jsonify, request
from models.TipoAtencionModelo import TipoAtencionModelo 
from models.UEntidades.TipoAtencion import TipoAtencion


tipoAtencion = Blueprint('tipoAtencion', __name__)


@tipoAtencion.route('/', methods=['GET'])
def get_tipoAtencion():
    try:
        tipoAtencion = TipoAtencionModelo.obtener_TipoAtenciones()
        return jsonify(tipoAtencion)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500


