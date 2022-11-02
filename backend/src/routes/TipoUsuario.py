from flask import Blueprint, jsonify, request
from models.TipoUsuarioModelo import TipoUsuarioModelo 
from models.UEntidades.TipoUsuario import TipoUsuario

tipoUsuario = Blueprint('tipoUsuario', __name__)

@tipoUsuario.route('/', methods=['GET'])
def get_tipoUsuario():
    try:
        tipoUsuario = TipoUsuarioModelo.obtener_TipoUsuario()
        return jsonify(tipoUsuario)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

