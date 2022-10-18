from flask import Blueprint, jsonify, request
from models.ComplainModel import ComplainModel 
from models.entities.ComplainS import ComplainS

complain = Blueprint('complain', __name__)

@complain.route('/', methods=['GET'])
def get_complains():
    try:
        complains = ComplainModel.get_complains()
        return jsonify(complains)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

        
