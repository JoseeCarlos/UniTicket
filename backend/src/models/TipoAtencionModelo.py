from flask import jsonify
from database.db import get_connection
from .UEntidades.TipoAtencion import TipoAtencion
import json

class TipoAtencionModelo():
    @classmethod
    def obtener_TipoAtencion(self):
        try:
            connection = get_connection()
            tipoAtencion = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdTipoAtencion, Nombre, Importancia, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion
                                    FROM UTipoAtencion
                                    WHERE Estado = 1 
                                """)
                for row in cursor.fetchall():
                    tipoAtencion.append(TipoAtencion(IdTipoAtencion=row[0],Nombre=row[1],Importancia=row[2], Estado=row[3], FechaCreacion=row[4], FechaActualizacion=row[5], IdUsuarioCreacion=row[6], IdUsuarioActualizacion=row[7]).to_JSON())

            connection.close()
            return tipoAtencion
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
            tableEmployees = []
            with connection.cursor() as cursor:
                cursor.execute("""select M.IdMesa,
                                    M.number,
                                    A.IdEmpleado,
                                    M.Estado
                                    from UMesa M
                                    inner join UAsignacion A on A.IdMesa=M.IdMesa
                                    WHERE M.IdLugarAtencion = ? AND M.Estado=1
                                """, (attentionPlaceId,))
                for row in cursor.fetchall():
                    tableEmployees.append(TableEmployee(tableId=row[0], number=row[1], employeeId=row[2], status=row[3]).to_JSON())
                   

            connection.close()
            return tableEmployees
        except Exception as ex:
            raise Exception(ex)