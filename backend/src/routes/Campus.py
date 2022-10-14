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

@campus.route('/<id>', methods=['GET'])
def get_campus(id):
    try:
        campus = CampusModel.get_campus(id)
        return jsonify(campus)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@campus.route('/add', methods=['POST'])
def create_campus():
    try:
        campus = Campus(name=request.json['name'], description=request.json['description'], latitude=request.json['latitude'], longitude=request.json['longitude'], updateDate=request.json['updateDate'], userIdCreate=request.json['userIdCreate'])
        affected_rows = CampusModel.create_campus(campus)
        if affected_rows == 0:
            return jsonify({'error': 'Campus no registrado'}), 500
        return jsonify({'message': 'Campus registrado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@campus.route('/update', methods=['PUT'])
def update_campus():
    try:
        campus = Campus(campusId=request.json['campusId'], name=request.json['name'], description=request.json['description'], latitude=request.json['latitude'], longitude=request.json['longitude'], updateDate=request.json['updateDate'], userIdMod=request.json['userIdMod'])
        affected_rows = CampusModel.update_campus(campus)
        if affected_rows == 0:
            return jsonify({'error': 'Campus no actualizado'}), 500
        return jsonify({'message': 'Campus actualizado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@campus.route('/delete/<id>', methods=['DELETE'])
def delete_campus(id):
    try:
        affected_rows = CampusModel.delete_campus(id)
        if affected_rows == 0:
            return jsonify({'error': 'Campus no eliminado'}), 500
        return jsonify({'message': 'Campus eliminado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
