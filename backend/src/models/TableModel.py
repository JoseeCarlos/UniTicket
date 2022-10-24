from flask import jsonify
from database.db import get_connection
from .entities.Table import Table
from .entities.TableEmployee import TableEmployee
import json

class TableModel():
    @classmethod
    def get_tables(self):
        try:
            connection = get_connection()
            tables = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT tableId, name, description, status, createDate, updateDate, userIdCreate, userIdMod
                                    FROM table
                                    WHERE status=1
                                """)
                for row in cursor.fetchall():
                    tables.append(Table(tableId=row[0],name=row[1],description=row[2], status=row[3], createDate=row[4], updateDate=row[5], userIdCreate=row[6], userIdMod=row[7]).to_JSON())

            connection.close()
            return tables
        except Exception as ex:
            raise Exception(ex) 
    
    @classmethod
    def get_table(self, tableId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT tableId, name, description, status, createDate, updateDate, userIdCreate, userIdMod
                                    FROM table
                                    WHERE tableId=%s
                                """, (tableId))
                row = cursor.fetchone()
                table = Table(tableId=row[0],name=row[1],description=row[2], status=row[3], createDate=row[4], updateDate=row[5], userIdCreate=row[6], userIdMod=row[7]).to_JSON()

            connection.close()
            return table
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def create_table(self, table):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO table (name, description, updateDate, userIdCreate)
                                    VALUES (%s, %s, %s, %s)
                                """, (table.name, table.description, table.updateDate, table.userIdCreate))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
            
    @classmethod
    def update_table(self, table):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE table
                                    SET name=%s, description=%s, updateDate=%s, userIdMod=%s
                                    WHERE tableId=%s
                                """, (table.name, table.description, table.updateDate, table.userIdMod, table.tableId))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def get_table_employee(self, attentionPlaceId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""select t.tableId,
                                    t.number,
                                    concat(u.firstName,u.firstSurname) employeeName,
                                    t.status
                                    from ´table´ t
                                    inner join asignation a on a.tableId=t.tableId
                                    inner join employee e on e.employeeId=a.employeeId
                                    inner join user u on u.userId=e.employeeId
                                    WHERE t.attentionPlaceId = %s
                                """, (attentionPlaceId,))
                row = cursor.fetchone()
                tableEmployee = TableEmployee(tableId=row[0],number=row[1],employeeName=row[2], status=row[3]).to_JSON()

            connection.close()
            return tableEmployee
        except Exception as ex:
            raise Exception(ex)