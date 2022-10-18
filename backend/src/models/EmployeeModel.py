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
                    cursor.execute("""SELECT U.userId, U.firstName, U.firstSurname, U.secondSurname, U.email, E.phoneNumber, E.homeLat, E.homeLon, E.ci, E.role, U.status, U.updateDate, userIdMod 
                                        FROM user U 
                                        INNER JOIN employee E ON E.employeeId=U.userId
                                        WHERE U.status=1 
                                    """)
                    for row in cursor.fetchall():
                        employees.append(SelectModel(userId=row[0], firstName=row[1], firstSurname=row[2], secondSurname=row[3], email=row[4], phoneNumber=row[5], homeLat=row[6], homeLon=row[7], ci=row[8], role=row[9], status=row[10], updateDate=row[11], userIdMod=row[12]).to_JSON())

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
                    print(user.userId)
                    cursor.execute("""UPDATE user SET firstName=%s, firstSurname=%s, secondSurname=%s, email=%s, updateDate=%s, userIdMod=%s
                                    WHERE userId=%s""", (user.firstName, user.firstSurname, user.secondSurname, user.email, user.updateDate, user.userIdMod, user.userId))
                    cursor.execute("""UPDATE employee SET ci=%s, phoneNumber=%s, homeLat=%s, homeLon=%s, role=%s
                                    WHERE employeeId=%s""", (employee.ci, employee.phoneNumber, employee.homeLat, employee.homeLon, employee.role, user.userId))
                    connection.commit()
                    affected_rows = cursor.rowcount
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
        
        @classmethod
        def login_employee(self,user):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    employee = []
                    cursor.execute("""SELECT U.userId, U.firstName, U.firstSurname, U.email, E.phoneNumber, E.ci, E.role, U.status, U.updateDate
                                        FROM user U 
                                        INNER JOIN employee E ON E.employeeId=U.userId
                                        WHERE U.status=1 AND U.userName=%s AND U.password=md5(%s)
                                    """, (user.userName, user.password))
                    for row in cursor.fetchall():
                        employee = SelectModel(userId=row[0], firstName=row[1], firstSurname=row[2], email=row[3], phoneNumber=row[4], ci=row[5], role=row[6], status=row[7], updateDate=row[8]).to_JSON()

                connection.close()
                return employee
            except Exception as ex:
                raise Exception(ex)
        
       