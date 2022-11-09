from flask import Blueprint, jsonify, request
from models.QuejaModelo import QuejaModelo 

complain = Blueprint('queja', __name__)

@complain.route('/', methods=['GET'])
def get_complains():
    try:
        complains = QuejaModelo.obtener_quejas()
        return jsonify(complains)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

        
