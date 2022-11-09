from flask import jsonify
from database.db import get_connection
from .UEntidades.Tramite import Tramite
from .UEntidades.TramiteRequisito import TramiteRequisito
import json
from datetime import datetime

class TramiteModelo():
    @classmethod
    def obtener_tramites(self):
        try:
            connection = get_connection()
            tramites = []
            with connection.cursor() as cursor:
                cursor.execute(""" SELECT IdTramite, Nombre, Descripcion, IdArea, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM UTramite
                                    WHERE Estado = 1 
                                """)
                for row in cursor.fetchall():
                    tramites.append(Tramite(IdTramite=row[0],Nombre=row[1],Descripcion=row[2], IdArea=row[3], IdUsuarioRegistro=row[4], Estado=row[5], FechaRegistro=row[6], FechaModificacion=row[7]).to_JSON())
            connection.close()
            return tramites
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def obtener_tramite(self, tramiteId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdTramite, Nombre, Descripcion, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion
                                    FROM UTramite
                                    WHERE IdTramite=%s
                                """, (tramiteId))
                row = cursor.fetchone()
                tramite = Tramite(Tramite(IdTramite=row[0],Nombre=row[1],Descripcion=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6]).to_JSON())

            connection.close()
            return tramite
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def crear_tramite(self, tramite):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO UTramite(Nombre, Descripcion, IdUsuarioRegistro, FechaModificacion)
                                    VALUES (?, ?, ?, ?)
                                """, (tramite.Nombre, tramite.Descripcion, tramite.IdUsuarioRegistro, tramite.FechaModificacion))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def actualizar_tramite(self, tramite):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UTramite
                                    SET
                                        Nombre = ?,
                                        Descripcion = ?,
                                        IdUsuarioRegistro = ?,
                                        FechaModificacion = ?
                                    WHERE IdTramite = ?
                                """, (tramite.Nombre, tramite.Descripcion, tramite.IdUsuarioRegistro, tramite.FechaModificacion, tramite.IdTramite))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def eliminar_tramite(self, tramiteId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UTramite
                                    SET
                                        Estado = 0
                                    WHERE IdTramite = ?
                                """, (tramiteId))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)