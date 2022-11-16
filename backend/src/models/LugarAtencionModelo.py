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
                    lugarAtenciones.append(LugarAtencion(IdLugarAtencion=row[0],Nombre=row[1], HoraInicioAtencion=str(row[2]), HoraFinAtencion=str(row[3]), NumeroMaximoReservasPorHora=row[4], CodigoAccesoAtencion=row[5], HoraInicioReceso=str(row[6]), HoraFinReceso=str(row[7]), HoraInicioAtencionFinSemana=str(row[8]), HoraFinAtencionFinSemana=str(row[9] )).to_JSON())
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
                cursor.execute("""SELECT IdLugarAtencion, Nombre, NumeroMaximoReservasPorHora, IdSitio, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion 
                                    FROM ULugarAtencion
                                    WHERE Estado =1 AND IdSitio = ?
                                """, (sitioId,))
                for row in cursor.fetchall():
                    lugaresAtencion.append(LugarAtencion(IdLugarAtencion=row[0],Nombre=row[1],NumeroMaximoReservasPorHora=row[2], IdSitio=row[3], Estado=row[4], FechaCreacion=row[5], FechaActualizacion=row[6], IdUsuarioCreacion=row[7], IdUsuarioActualizacion=row[8]).to_JSON())
            connection.close()
            return lugaresAtencion
        except Exception as ex:
            raise Exception(ex)
        