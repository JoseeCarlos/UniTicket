from flask import jsonify
from database.db import get_connection
from .UEntidades.EquipoAtencion import EquipoAtencion
import json
from datetime import datetime

class EquipoAtencionModelo():
    @classmethod
    def obtener_equipos_atencion(self):
        try:
            connection = get_connection()
            equipos_atencion = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdEquipoAtencion, Ip, NombreEquipo, Mac, IdLugarAtencion, Funcion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM UEquipoAtencion
                                    WHERE Estado = 1 
                                """)
                for row in cursor.fetchall():
                    equipo_atencion = EquipoAtencion(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9])
                    equipos_atencion.append(equipo_atencion.to_JSON())   
            connection.close()
            return equipos_atencion
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def obtener_equipo_atencion(self, idEquipoAtencion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdEquipoAtencion, Ip, NombreEquipo, Mac, IdLugarAtencion, Funcion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM UEquipoAtencion
                                    WHERE Estado = 1 AND IdEquipoAtencion = ?
                                """, (idEquipoAtencion))
                row = cursor.fetchone()
                equipo_atencion = EquipoAtencion(row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], row[8], row[9])
            connection.close()
            return equipo_atencion.to_JSON()
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def registrar_equipo_atencion(self, equipo_atencion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO UEquipoAtencion (Ip, NombreEquipo, Mac, IdLugarAtencion, Funcion, IdUsuarioRegistro)
                                    VALUES (?, ?, ?, ?, ?, ?)
                                """, (equipo_atencion.Ip, equipo_atencion.NombreEquipo, equipo_atencion.Mac, equipo_atencion.IdLugarAtencion, equipo_atencion.Funcion, equipo_atencion.IdUsuarioRegistro))
                connection.commit()
                filas_afectadas = cursor.rowcount
            connection.close()
            return filas_afectadas
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def actualizar_equipo_atencion(self, equipo_atencion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UEquipoAtencion
                                    SET Ip = ?, NombreEquipo = ?, Mac = ?, IdLugarAtencion = ?, Funcion = ?, FechaModificacion = ?
                                    WHERE IdEquipoAtencion = ?
                                """, (equipo_atencion.Ip, equipo_atencion.NombreEquipo, equipo_atencion.Mac, equipo_atencion.IdLugarAtencion, equipo_atencion.Funcion, datetime.now(), equipo_atencion.IdEquipoAtencion))
                connection.commit()
                filas_afectadas = cursor.rowcount
            connection.close()
            return filas_afectadas
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def eliminar_equipo_atencion(self, idEquipoAtencion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UEquipoAtencion
                                    SET Estado = 0, FechaModificacion = ?
                                    WHERE IdEquipoAtencion = ?
                                """, (datetime.now(), idEquipoAtencion))
                connection.commit()
                filas_afectadas = cursor.rowcount
            connection.close()
            return filas_afectadas
        except Exception as ex:
            raise Exception(ex)
            
