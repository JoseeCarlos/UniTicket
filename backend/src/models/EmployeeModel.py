from flask import jsonify
from database.db import get_connection
from .entities.SelectModel import SelectModel
import json


class EmployeeModel():
        @classmethod
        def get_employees(self):
            try:
                connection = get_connection()
                employees = []
                with connection.cursor() as cursor:
                    cursor.execute("""SELECT U.userId, U.firstName, U.firstSurname, U.secondSurname, U.email, E.phoneNumber, E.ci, E.role, U.status
                                        FROM user U 
                                        INNER JOIN employee E ON E.employeeId=U.userId
                                        WHERE U.status=1 
                                    """)
                    for row in cursor.fetchall():
                        employees.append(SelectModel(userId=row[0], firstName=row[1], firstSurname=row[2], secondSurname=row[3], email=row[4], phoneNumber=row[5], ci=row[6] ,role=row[7],status=row[8]).to_JSON())

                connection.close()
                return employees
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
                    cursor.execute("""INSERT INTO user (firstName, firstSurname, secondSurname, userName, password, email, role, updateDate, userIdCreate, userIdMod )
                                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s )""", (user.firstName, user.firstSurname, user.secondSurname, user.userName, user.password, user.email, user.role, user.updateDate, user.userIdCreate, user.userIdMod))
                    id = cursor.lastrowid
                    cursor.execute("""INSERT INTO employee (employeeId, ci, phoneNumber, homeLat, homeLon, role )
                                    VALUES (%s, %s, %s, %s, %s, %s )""", (id, employee.ci, employee.phoneNumber, employee.homeLat, employee.homeLon, employee.role))

                    connection.commit()
                    affected_rows = cursor.rowcount
                return affected_rows
            except Exception as ex:
                connection.rollback()
                raise Exception(ex)
            finally:
                connection.close()

        
        @classmethod
        def update_employee(self, employee, user):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("""UPDATE user SET firstName=%s, firstSurname=%s, secondSurname=%s, email=%s, updateDate=%s
                                    WHERE userId=%s""", (employee.firstName, employee.firstSurname, employee.secondSurname, employee.userName, employee.password, employee.email, employee.updateDate, employee.userId))
                    cursor.execute("""UPDATE employee SET phoneNumber=%s
                                    WHERE employeeId=%s""", (employee.phoneNumber, employee.userId))
                    affected_rows = cursor.rowcount
                    connection.commit()
                return affected_rows
            except Exception as ex:
                connection.rollback()
                raise Exception(ex)
            finally:
                connection.close()
        
        @classmethod
        def delete_employee(self, employeeId):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("""UPDATE user SET status=0 WHERE userId=%s""", (employeeId,))
                    affected_rows = cursor.rowcount
                    connection.commit()
                return affected_rows
            except Exception as ex:
                raise Exception(ex)
            finally:
                connection.close()
        
       