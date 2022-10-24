from flask import Blueprint, jsonify, request
from models.AreaModel import AreaModel 
from models.entities.Area import Area

area = Blueprint('area', __name__)

@area.route('/', methods=['GET'])
def get_areas():
    try:
        areas = AreaModel.get_areas()
        return jsonify(areas)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@area.route('/<id>', methods=['GET'])
def get_area(id):
    try:
        area = AreaModel.get_area(id)
        return jsonify(area)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@area.route('/add', methods=['POST'])
def create_area():
    try:
        area = Area(name=request.json['name'], description=request.json['description'], numberMaxAtettion=request.json['numeroMaximoTickets'] , updateDate=request.json['updateDate'], userIdCreate=request.json['userIdCreate'], )
        affected_rows = AreaModel.create_area(area)
        if affected_rows == 0:
            return jsonify({'error': 'Area no registrado'}), 500
        return jsonify({'message': 'Area registrado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@area.route('/update/<id>', methods=['PUT'])
def update_area(id):
    try:
        area = Area(areaId=id, name=request.json['name'], description=request.json['description'], updateDate=request.json['updateDate'], userIdMod=request.json['userIdMod'])
        affected_rows = AreaModel.update_area(area)
        if affected_rows == 0:
            return jsonify({'error': 'Area no actualizado'}), 500
        return jsonify({'message': 'Area actualizado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@area.route('/delete/<id>', methods=['DELETE'])
def delete_area(id):
    try:
        affected_rows = AreaModel.delete_area(id)
        if affected_rows == 0:
            return jsonify({'error': 'Area no eliminado'}), 500
        return jsonify({'message': 'Area eliminado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
