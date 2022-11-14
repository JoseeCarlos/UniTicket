from flask import jsonify
from database.db import get_connection
from .UEntidades.Requisito import Requisito
import json
from datetime import datetime

class RequisitoModelo():
    @classmethod
    def obtener_requisitos(self):
        try:
            connection = get_connection()
            requisitos = []
            with connection.cursor() as cursor:
                cursor.execute(""" SELECT IdRequisito, Nombre, Descripcion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM URequisito
                                    WHERE Estado = 1 
                                """)
                for row in cursor.fetchall():
                    requisitos.append(Requisito(IdRequisito=row[0],Nombre=row[1],Descripcion=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6]).to_JSON())
            connection.close()
            return requisitos
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def obtener_requisito(self, requisitoId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdRequisito, Nombre, Descripcion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM URequisito
                                    WHERE Estado = 1 AND IdRequisito= ?
                                """, (requisitoId))
                row = cursor.fetchone()
                requisito = Requisito(Requisito(IdRequisito=row[0],Nombre=row[1],Descripcion=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6]).to_JSON())

            connection.close()
            return requisito
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def crear_requisito(self, requisito):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO URequisito(Nombre, Descripcion, IdUsuarioRegistro)
                                    VALUES (?, ?, ?)
                                """, (requisito.Nombre, requisito.Descripcion, requisito.IdUsuarioRegistro, ))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def actualizar_requisito(self, requisito):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE URequisito
                                    SET Nombre = ?, Descripcion = ?, FechaModificacion = ?
                                    WHERE IdRequisito = ?
                                """, (requisito.Nombre, requisito.Descripcion, requisito.FechaModificacion, requisito.IdRequisito))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def eliminar_requisito(self, requisitoId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE URequisito
                                    SET Estado=0
                                    WHERE IdRequisito=?
                                """, (requisitoId))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def obtener_requisito_tramite(self, tramiteId):
        try:
            connection = get_connection()
            requisitos = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT R.IdRequisito, R.Nombre, R.Descripcion
                                    FROM URequisito R
                                    INNER JOIN UTramite_Requisito TR ON TR.IdRequisitos=R.IdRequisito
                                    WHERE R.Estado=1 AND IdTramite = ?
                                """, (tramiteId,))

                for row in cursor.fetchall():
                    requisitos.append(Requisito(IdRequisito=row[0],Nombre=row[1],Descripcion=row[2]).to_JSON())
            connection.close()
            return requisitos
        except Exception as ex:
            raise Exception(ex)



