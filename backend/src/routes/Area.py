from operator import imod
from flask import Blueprint, jsonify, request 
from models.UEntidades.Area import Area
from models.AreaModelo import AreaModel
from datetime import datetime

area = Blueprint('area', __name__)

@area.route('/', methods=['GET'])
def get_areas():
    try:
        areas = AreaModel.obtener_areas()
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
        area = Area(Nombre=request.json['Nombre'],Descripcion=request.json['Descripcion'],NumeroMaximoTicketsParaEstudiantes=request.json['NumeroMaximoTicketsParaEstudiantes'], IdUsuarioRegistro=request.json['IdUsuarioRegistro'] ,FechaModificacion=datetime.now())
        affected_rows = AreaModel.crear_area(area)
        if affected_rows == 0:
            return jsonify({'error': 'Area no registrado'}), 500
        return jsonify({'message': 'Area registrado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@area.route('/update/<id>', methods=['PUT'])
def update_area(id):
    try:
        area = Area(IdArea=id,Nombre=request.json['Nombre'],Descripcion=request.json['Descripcion'], FechaModificacion=datetime.now())
        affected_rows = AreaModel.modificar_area(area)
        if affected_rows == 0:
            return jsonify({'error': 'Area no actualizado'}), 500
        return jsonify({'message': 'Area actualizado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@area.route('/delete/<id>', methods=['DELETE'])
def delete_area(id):
    try:
        affected_rows = AreaModel.eliminar_area(id)
        if affected_rows == 0:
            return jsonify({'error': 'Area no eliminado'}), 500
        return jsonify({'message': 'Area eliminado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
