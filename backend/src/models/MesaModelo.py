from flask import jsonify
from database.db import get_connection
from .UEntidades.Mesa import Mesa
import json

class MesaModelo():
    @classmethod
    def obtener_mesas(self):
        try:
            connection = get_connection()
            tables = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdMesa, Numero, IdLugarAtencion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModifcacion
                                    FROM UMesa
                                    WHERE Estado=1  
                                """)
                for row in cursor.fetchall():
                    tables.append(Mesa(IdMesa=row[0],Numero=row[1], IdLugarAtencion=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6]).to_JSON())
            connection.close()
            return tables
        except Exception as ex:
            raise Exception(ex) 
    
    @classmethod
    def obtener_mesa(self, id):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdMesa, Numero, IdLugarAtencion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModifcacion
                                    FROM UMesa
                                    WHERE IdMesa=%s AND Estado=1  
                                """, (id))
                row = cursor.fetchone()
                table = Mesa(IdMesa=row[0],Nombre=row[1],Descripcion=row[2], Estado=row[3], FechaCreacion=row[4], FechaModificacion=row[5], IdUsuarioCreacion=row[6], IdUsuarioModificacion=row[7]).to_JSON()
            connection.close()
            return table
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def crear_mesa(self, mesa):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO UMesa (Numero, IdLugarAtencion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModifcacion)
                                    VALUES (%s, %s, %s, %s, %s, %s) 
                                """, (mesa.Nombre, mesa.Descripcion, mesa.IdUsuarioCreacion, mesa.Estado, mesa.FechaCreacion, mesa.FechaModificacion))
                connection.commit()
            connection.close()
            return True
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def actualizar_mesa(self, mesa):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UMesa
                                    SET Numero=%s, IdLugarAtencion=%s, IdUsuarioRegistro=%s, Estado=%s, FechaRegistro=%s, FechaModifcacion=%s
                                    WHERE IdMesa=%s
                                """, (mesa.Nombre, mesa.Descripcion, mesa.IdUsuarioCreacion, mesa.Estado, mesa.FechaCreacion, mesa.FechaModificacion, mesa.IdMesa))
                connection.commit()
            connection.close()
            return True
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def eliminar_mesa(self, id):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UMesa
                                    SET Estado=0
                                    WHERE IdMesa=%s
                                """, (id))
                connection.commit()
            connection.close()
            return True
        except Exception as ex:
            raise Exception(ex)

    @classmethod 
    def obtenerMesaLugarAtencion(self, id):
        try:
            connection = get_connection()
            tables = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdMesa, Numero, IdLugarAtencion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModifcacion
                                    FROM UMesa
                                    WHERE IdLugarAtencion= ? AND Estado=1  
                                """, (id,))
                for row in cursor.fetchall():
                    tables.append(Mesa(IdMesa=row[0],Numero=row[1], IdLugarAtencion=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6]).to_JSON())  
                
            connection.close()
            return tables
        except Exception as ex:
            raise Exception(ex)
    



    