from flask import Blueprint, jsonify, request
from models.AttentionPlace_AreaModel import AttentionPlace_AreaModel 
from models.entities.Area import Area

attentionPlaceArea = Blueprint('attentionPlaceArea', __name__)

@attentionPlaceArea.route('/', methods=['GET'])
def get_attentionPlaceAreas():
    try:
        attentionPlaceAreas = AttentionPlace_AreaModel.get_attentionPlaceAreas()
        return jsonify(attentionPlaceAreas)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500