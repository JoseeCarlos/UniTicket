from flask import jsonify
from database.db import get_connection
from .UEntidades.Mesa import Mesa
from .entities.TableEmployee import TableEmployee
import json

class TableModel():
    @classmethod
    def get_tables(self):
        try:
            connection = get_connection()
            tables = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdMesa, number, IdLugarAtencion, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion
                                    FROM UMesa
                                    WHERE Estado=1  
                                """)
                for row in cursor.fetchall():
                    tables.append(Mesa(IdMesa=row[0],Nombre=row[1],Descripcion=row[2], Estado=row[3], FechaCreacion=row[4], FechaModificacion=row[5], IdUsuarioCreacion=row[6], IdUsuarioModificacion=row[7]).to_JSON())
            connection.close()
            return tables
        except Exception as ex:
            raise Exception(ex) 
    
    @classmethod
    def get_table(self, tableId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdMesa, number, IdLugarAtencion, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion
                                    FROM UMesa
                                    WHERE Estado=1 and IdMesa = ?
                                """, (tableId))
                row = cursor.fetchone()
                table = Mesa(IdMesa=row[0],Nombre=row[1],Descripcion=row[2], Estado=row[3], FechaCreacion=row[4], FechaModificacion=row[5], IdUsuarioCreacion=row[6], IdUsuarioModificacion=row[7]).to_JSON()
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
    def get_table_employee(self, lugarAtencionId):
        try:
            connection = get_connection()
            tableEmployees = []
            with connection.cursor() as cursor:
                cursor.execute("""select M.IdMesa,
                                    M.number,
                                    A.IdEmpleado,
                                    M.Estado
                                    from UMesa M
                                    inner join UAsignacion A on A.IdMesa=M.IdMesa
                                    WHERE M.IdLugarAtencion = ? AND M.Estado=1
                                """, (lugarAtencionId,))
                for row in cursor.fetchall():
                    tableEmployees.append(TableEmployee(tableId=row[0], number=row[1], employeeId=row[2], status=row[3]).to_JSON())
            connection.close()
            return tableEmployees
        except Exception as ex:
            raise Exception(ex)