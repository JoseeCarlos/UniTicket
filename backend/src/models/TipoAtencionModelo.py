from flask import jsonify
from database.db import get_connection
from .UEntidades.TipoAtencion import TipoAtencion
import json

class TipoAtencionModelo():
    @classmethod
    def obtener_TipoAtenciones(self):
        try:
            connection = get_connection()
            tipoAtencion = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdTipoAtencion, Nombre, Importancia, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM UTipoAtencion
                                    WHERE Estado = 1  
                                """)
                for row in cursor.fetchall():
                    tipoAtencion.append(TipoAtencion(IdTipoAtencion=row[0],Nombre=row[1],Importancia=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6]).to_JSON())

            connection.close()
            return tipoAtencion
        except Exception as ex:
            raise Exception(ex) 

    @classmethod
    def obtener_TipoAtencion(self, tipoAtencionId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdTipoAtencion, Nombre, Importancion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModifcacion
                                    FROM UTipoAtencion
                                    WHERE IdTipoAtencion=%s
                                """, (tipoAtencionId))
                row = cursor.fetchone()
                tipoAtencion = TipoAtencion(IdTipoAtencion=row[0],Nombre=row[1],Importancia=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6]).to_JSON()

            connection.close()
            return tipoAtencion
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def crear_TipoAtencion(self, tipoAtencion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO UTipoAtencion(Nombre, Importancia, IdUsuarioRegistro )
                                    VALUES (?, ?, ?)
                                """, (tipoAtencion.Nombre, tipoAtencion.Importancia, tipoAtencion.IdUsuarioRegistro))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def actualizar_TipoAtencion(self, tipoAtencion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UTipoAtencion
                                    SET Nombre = ?, Importancia = ?, FechaModificacion = ?
                                    WHERE IdTipoAtencion = ?
                                """, (tipoAtencion.Nombre, tipoAtencion.Importancia, tipoAtencion.FechaModificacion, tipoAtencion.IdTipoAtencion))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def eliminar_TipoAtencion(self, tipoAtencionId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UTipoAtencion
                                    SET Estado = 0
                                    WHERE IdTipoAtencion = ?
                                """, (tipoAtencionId))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    
  