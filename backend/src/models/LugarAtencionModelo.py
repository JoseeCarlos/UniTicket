from flask import jsonify
from database.db import get_connection
# from .entities.Table import Table
from .UEntidades.LugarAtencion import LugarAtencion
import json

class LugarAtencionModelo():
    # @classmethod
    # def obtener_areas(self):
    #     try:
    #         connection = get_connection()
    #         lugaresAtencion = []
    #         with connection.cursor() as cursor:
    #             cursor.execute("""SELECT IdArea, Nombre, Descripcion, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion
    #                                 FROM UArea
    #                                 WHERE Estado=1  
    #                             """)
    #             for row in cursor.fetchall():
    #                 lugaresAtencion.append(LugarAtencion(IdArea=row[0],Nombre=row[1],Descripcion=row[2], Estado=row[3], FechaCreacion=row[4], FechaActualizacion=row[5], IdUsuarioCreacion=row[6], IdUsuarioActualizacion=row[7]).to_JSON())

    #         connection.close()
    #         return lugaresAtencion
    #     except Exception as ex:
    #         raise Exception(ex) 
    
    # @classmethod
    # def obtener_area(self, areaId):
    #     try:
    #         connection = get_connection()
    #         with connection.cursor() as cursor:
    #             cursor.execute("""SELECT IdArea, Nombre, Descripcion, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion
    #                                 FROM UArea
    #                                 WHERE IdArea=%s
    #                             """, (areaId))
    #             row = cursor.fetchone()
    #             area = Area(IdArea=row[0],Nombre=row[1],Descripcion=row[2], Estado=row[3], FechaCreacion=row[4], FechaActualizacion=row[5], IdUsuarioCreacion=row[6], IdUsuarioActualizacion=row[7]).to_JSON()

    #         connection.close()
    #         return area
    #     except Exception as ex:
    #         raise Exception(ex)
    
    # @classmethod
    # def crear_area(self, area):
    #     try:
    #         connection = get_connection()
    #         with connection.cursor() as cursor:
    #             cursor.execute("""INSERT INTO UArea(Nombre, Descripcion, NumeroMaximoTicketsParaEstudiantes, FechaActualizacion, IdUsuarioCreacion)
    #                                 VALUES (?, ?, ?, ?, ?)
    #                             """, (area.Nombre, area.Descripcion, area.NumeroMaximoTicketsParaEstudiantes, area.fechaActualizacion, area.userIdCreate))
    #             connection.commit()
    #             affected_rows = cursor.rowcount
    #         connection.close()
    #         return affected_rows
    #     except Exception as ex:
    #         raise Exception(ex)
    
    # @classmethod    
    # def modificar_area(self, area):
    #     try:
    #         connection = get_connection()
    #         with connection.cursor() as cursor:
    #             cursor.execute("""UPDATE UArea
    #                                 SET Nombre=?, Descripcion=?, NumeroMaximoTicketsParaEstudiantes=?, FechaActualizacion=?, IdUsuarioActualizacion=?
    #                                 WHERE IdArea=?
    #                             """, (area.Nombre, area.Descripcion, area.NumeroMaximoTicketsParaEstudiantes, area.fechaActualizacion, area.userIdUpdate, area.IdArea))
    #             connection.commit()
    #             affected_rows = cursor.rowcount
    #         connection.close()
    #         return affected_rows
    #     except Exception as ex:
    #         raise Exception(ex)

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
        