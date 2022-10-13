from flask import Blueprint, jsonify, request
from models.CampusModel import CampusModel 
from models.entities.Campus import Campus

campus = Blueprint('campus', __name__)

@campus.route('/', methods=['GET'])
def get_campuses():
    try:
        campuses = CampusModel.get_campuses()
        return jsonify(campuses)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500