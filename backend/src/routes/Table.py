from flask import Blueprint, jsonify, request
from models.TableModel import TableModel 
from models.entities.TableEmployee import TableEmployee
from models.entities.Table import Table

table = Blueprint('table', __name__)

@table.route('/', methods=['GET'])
def get_tables():
    try:
        tables = TableModel.get_tables()
        return jsonify(tables)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@table.route('/<id>', methods=['GET'])
def get_table(id):
    try:
        table = TableModel.get_table(id)
        return jsonify(table)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@table.route('/add', methods=['POST'])
def create_table():
    try:
        table = Table(name=request.json['name'], description=request.json['description'], updateDate=request.json['updateDate'], userIdCreate=request.json['userIdCreate'])
        affected_rows = TableModel.create_table(table)
        if affected_rows == 0:
            return jsonify({'error': 'Table no registrado'}), 500
        return jsonify({'message': 'Table registrado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@table.route('/update', methods=['PUT'])
def update_table():
    try:
        table = Table(id=request.json['id'], name=request.json['name'], description=request.json['description'], updateDate=request.json['updateDate'], userIdCreate=request.json['userIdCreate'])
        affected_rows = TableModel.update_table(table)
        if affected_rows == 0:
            return jsonify({'error': 'Table no actualizado'}), 500
        return jsonify({'message': 'Table actualizado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@table.route('/delete/<id>', methods=['DELETE'])
def delete_table(id):
    try:
        affected_rows = TableModel.delete_table(id)
        if affected_rows == 0:
            return jsonify({'error': 'Table no eliminado'}), 500
        return jsonify({'message': 'Table eliminado'}), 200       
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@table.route('/table_employe/<id>', methods=['GET'])
def get_table_employe(id):
    try:
        table_employe = TableModel.get_table_employee(id)
        return jsonify(table_employe)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500