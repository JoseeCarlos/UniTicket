from ast import Try
from flask import Blueprint, jsonify, request
from models.EmployeeModel import EmployeeModel 
from models.entities.Employee import Employee
from models.entities.User import User

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
        user = User(firstName=request.json['firstName'], firstSurname=request.json['firstSurname'], secondSurname=request.json['secondSurname'], userName=request.json['userName'], password=request.json['password'], email=request.json['email'], role=request.json['role'], updateDate=request.json['updateDate'], userIdCreate=request.json['userIdCreate'], userIdMod=request.json['userIdMod'])
        employee = Employee(ci=request.json['ci'], phoneNumber=request.json['phoneNumber'], homeLat=request.json['homeLat'], homeLon=request.json['homeLon'], role=request.json['role'])
        affected_rows = EmployeeModel.create_employee(employee, user)
        if affected_rows == 0:
            return jsonify({'error': 'No se pudo crear el empleado'}), 500
        return jsonify({'message': 'Employee Creado Correctamente'})
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