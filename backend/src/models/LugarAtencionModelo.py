from flask import jsonify
from database.db import get_connection
# from .entities.Table import Table
from .UEntidades.LugarAtencion import LugarAtencion
import json
import time


class LugarAtencionModelo():

    @classmethod
    def obtener_LugarAtenciones(self):
        try:
            connection = get_connection()
            lugarAtenciones = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdLugarAtencion,Nombre,HoraInicioAtencion,HoraFinAtencion,NumeroMaximoReservaPorHora,CodigoAccesoAtencion,HoraInicioReceso,HoraFinReceso,HoraInicioAtencionFinSemana,HoraFinAtencionFinSemana
                                FROM ULugarAtencion
                                """)
                for row in cursor.fetchall():
                    lugarAtenciones.append(LugarAtencion(IdLugarAtencion=row[0], Nombre=row[1], HoraInicioAtencion=str(row[2]), HoraFinAtencion=str(
                        row[3]), NumeroMaximoReservasPorHora=row[4], CodigoAccesoAtencion=row[5], HoraInicioReceso=str(row[6]), HoraFinReceso=str(row[7]), HoraInicioAtencionFinSemana=str(row[8]), HoraFinAtencionFinSemana=str(row[9])).to_JSON())
            connection.close()
            return lugarAtenciones
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def obtenerAreas_sitio(self, sitioId):
        try:
            connection = get_connection()
            lugaresAtencion = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdLugarAtencion, Nombre, NumeroMaximoReservaPorHora, Id_Sitio, Estado, FechaRegistro, FechaModificacion, IdUsuarioRegistro 
                                    FROM ULugarAtencion
                                    WHERE Estado =1 AND Id_Sitio = ?
                                """, (sitioId,))
                for row in cursor.fetchall():
                    lugaresAtencion.append(LugarAtencion(IdLugarAtencion=row[0], Nombre=row[1], NumeroMaximoReservasPorHora=row[2],
                        Id_Sitio=row[3], Estado=row[4], FechaRegistro=row[5], FechaModifacion=row[6], IdUsuarioRegistro=row[7]).to_JSON())
            connection.close()
            return lugaresAtencion
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def obtenerLugarAtencion_Codigo(self, codigo):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdLugarAtencion, Nombre, Id_Sede_Academica, Id_Sitio, IdArea
                                    FROM ULugarAtencion
                                    WHERE Estado = 1 AND CodigoAccesoAtencion = ?
                                """, (codigo))
                row = cursor.fetchone()
                if row:
                    lugaresAtencion = LugarAtencion(IdLugarAtencion=row[0], Nombre=row[1], Id_Sede_Academica=row[2], Id_Sitio=row[3], IdArea=row[4]).to_JSON()
                else:
                    lugaresAtencion = LugarAtencion().to_JSON()
            connection.close()
            return lugaresAtencion
        except Exception as ex:
            raise Exception(ex)
