from ast import Try
from flask import Blueprint, jsonify, request
from models.EmployeeModel import EmployeeModel 
from models.entities.Employee import Employee

main = Blueprint('employee', __name__)

@main.route('/', methods=['GET'])
def get_employeeS():
    try:
        employee = EmployeeModel.get_employees()
        return jsonify(employee)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@main.route('/<id>', methods=['GET'])
def get_employee(id):
    try:
        return jsonify('employee')
    except Exception as e:
        return jsonify({'error': str(e)})

@main.route('/add', methods=['POST'])
def add_employee():
    try:
        return jsonify('employee add')
    except Exception as e:
        return jsonify({'error': str(e)})

@main.route('/delete/<id>', methods=['DELETE'])
def delete_employee(id):
    try:
        return jsonify('employee delete')
    except Exception as e:
        return jsonify({'error': str(e)})

@main.route('/update/<id>', methods=['PUT'])
def update_employee(id):
    try:
        return jsonify('employee update')
    except Exception as e:
        return jsonify({'error': str(e)})