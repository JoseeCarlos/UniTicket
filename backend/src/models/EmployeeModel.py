from flask import jsonify
from database.db import get_connection
from .entities.Employee import Employee
from .entities.User import User
from .entities.Area import Area
import json


class EmployeeModel():
        @classmethod
        def get_employees(self):
            try:
                connection = get_connection()
                data = [User, Employee, Area]
                with connection.cursor() as cursor:
                    ssswcursor.execute("""SELECT U.userId, U.firstName, U.firstSurname, U.secondSurname, U.email, E.phoneNumber,E.role, AR.name
                                        FROM user U 
                                        INNER JOIN employee E ON E.employeeId=U.userId
                                        INNER JOIN asignation A ON A.employeeId=E.employeeId
                                        INNER JOIN ´table´ TA ON TA.tableId=A.tableId
                                        INNER JOIN attentionplace_area ATT ON ATT.areaId=TA.areaId 
                                        INNER JOIN area AR ON AR.areaId=ATT.areaId
                                        WHERE U.status=1 
                                    """)
                    for row in cursor.fetchall():
                        data[0]=(User(row[0], row[1], row[2], row[3], row[4]))

                connection.close()
                return json.dumps(data, default=str)
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def get_employee(self, employeeId):
            try:
                connection = get_connection()
                data = [User, Employee, Area]
                with connection.cursor() as cursor:
                    cursor.execute("""SELECT U.userId, U.firstName, U.firstSurname, U.secondSurname, U.email, E.phoneNumber,E.role, AR.name
                                        FROM user U 
                                        INNER JOIN employee E ON E.employeeId=U.userId
                                        INNER JOIN asignation A ON A.employeeId=E.employeeId
                                        INNER JOIN ´table´ TA ON TA.tableId=A.tableId
                                        INNER JOIN attentionplace_area ATT ON ATT.areaId=TA.areaId 
                                        INNER JOIN area AR ON AR.areaId=ATT.areaId
                                        WHERE U.status=1 AND U.userId=%s
                                    """, (employeeId))
                    for row in cursor.fetchall():
                        data[0]=(User(row[0], row[1], row[2], row[3], row[4]))

                connection.close()
                return json.dumps(data, default=str)
            except Exception as ex:
                raise Exception(ex)

        @classmethod
        def create_employee(self, employee, user):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("""INSERT INTO user (firstName, firstSurname, secondSurname, userName, password, email, role, status, createDate, updateDate)
                                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""", (employee.firstName, employee.firstSurname, employee.secondSurname, employee.userName, employee.password, employee.email, employee.role, employee.status, employee.createDate, employee.updateDate))
                    id = cursor.lastrowid
                    cursor.execute("""INSERT INTO employee (employeeId, phoneNumber)
                                    VALUES (%s, %s)""", (id, employee.phoneNumber))

                    
                connection.commit()
                connection.close()
                return True
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def update_employee(self, employee, user):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("""UPDATE user SET firstName=%s, firstSurname=%s, secondSurname=%s, userName=%s, password=%s, email=%s, role=%s, status=%s, createDate=%s, updateDate=%s
                                    WHERE userId=%s""", (employee.firstName, employee.firstSurname, employee.secondSurname, employee.userName, employee.password, employee.email, employee.role, employee.status, employee.createDate, employee.updateDate, employee.userId))
                    cursor.execute("""UPDATE employee SET phoneNumber=%s
                                    WHERE employeeId=%s""", (employee.phoneNumber, employee.userId))

                    
                connection.commit()
                connection.close()
                return True
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def delete_employee(self, employeeId):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("""UPDATE user SET status=0 WHERE userId=%s""", (employeeId))
                connection.commit()
                connection.close()
                return True
            except Exception as ex:
                raise Exception(ex)
        
       