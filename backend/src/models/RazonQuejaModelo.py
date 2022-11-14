from flask import jsonify
from database.db import get_connection
from .UEntidades.RazonQueja import RazonQueja
import json
from datetime import datetime

class RazonQuejaModelo():

    @classmethod
    def obtener_razones_queja(self):
        try:
            connection = get_connection()
            razones_queja = []
            with connection.cursor() as cursor:
                cursor.execute(""" SELECT IdRazonQueja, Nombre, Descripcion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM URazonQueja
                                    WHERE Estado = 1 
                                """)
                for row in cursor.fetchall():
                    razones_queja.append(RazonQueja(IdRazonQueja=row[0],Nombre=row[1],Descripcion=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6]).to_JSON())
            connection.close()
            return razones_queja
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def obtener_razon_queja(self, razon_quejaId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdRazonQueja, Nombre, Descripcion, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion
                                    FROM URazonQueja
                                    WHERE IdRazonQueja=%s
                                """, (razon_quejaId))
                row = cursor.fetchone()
                razon_queja = RazonQueja(RazonQueja(IdRazonQueja=row[0],Nombre=row[1],Descripcion=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6]).to_JSON())

            connection.close()
            return razon_queja
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def crear_razon_queja(self, razon_queja):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO URazonQueja(Nombre, Descripcion, IdUsuarioRegistro, FechaModificacion)
                                    VALUES (?, ?, ?, ?)
                                """, (razon_queja.Nombre, razon_queja.Descripcion, razon_queja.IdUsuarioRegistro, razon_queja.FechaModificacion))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def actualizar_razon_queja(self, razon_queja):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE URazonQueja
                                    SET Nombre = ?, Descripcion = ?, FechaModificacion = ?
                                    WHERE IdRazonQueja = ?
                                """, (razon_queja.Nombre, razon_queja.Descripcion, razon_queja.FechaModificacion, razon_queja.IdRazonQueja))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def eliminar_razon_queja(self, razon_quejaId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE URazonQueja
                                    SET Estado = 0
                                    WHERE IdRazonQueja = ?
                                """, (razon_quejaId))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    
