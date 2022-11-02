from flask import jsonify
from database.db import get_connection
from .UEntidades.Area import Area
import json
from datetime import datetime

class AreaModel():
    @classmethod
    def obtener_areas(self):
        try:
            connection = get_connection()
            areas = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdArea, Nombre, Descripcion,NumeroMaximoTicketsPorEstudiantes, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM UArea
                                    WHERE Estado=1  
                                """)
                for row in cursor.fetchall():
                    areas.append(Area(IdArea=row[0],Nombre=row[1],Descripcion=row[2], NumeroMaximoTicketsParaEstudiantes=row[3], IdUsuarioRegistro=row[4], Estado=row[5], FechaRegistro=row[6], FechaModificacion=row[7]).to_JSON())
            connection.close()
            return areas
        except Exception as ex:
            raise Exception(ex) 
    
    @classmethod
    def obtener_area(self, areaId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdArea, Nombre, Descripcion, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion
                                    FROM UArea
                                    WHERE IdArea=%s
                                """, (areaId))
                row = cursor.fetchone()
                area = Area(IdArea=row[0],Nombre=row[1],Descripcion=row[2], Estado=row[3], FechaCreacion=row[4], FechaActualizacion=row[5], IdUsuarioCreacion=row[6], IdUsuarioActualizacion=row[7]).to_JSON()

            connection.close()
            return area
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def crear_area(self, area):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO UArea(Nombre, Descripcion, NumeroMaximoTicketsPorEstudiantes, IdUsuarioRegistro, FechaModificacion)
                                    VALUES (?, ?, ?, ?, ?)
                                """, (area.Nombre, area.Descripcion, area.NumeroMaximoTicketsParaEstudiantes, area.IdUsuarioRegistro, area.FechaModificacion))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod    
    def modificar_area(self, area):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UArea  
                    SET Nombre= ? , Descripcion= ?, FechaModificacion= ?
                    WHERE IdArea= ?
                                """, (area.Nombre, area.Descripcion, area.FechaModificacion, area.IdArea))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    
    @classmethod
    def eliminar_area(self, IdArea):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UArea
                                    SET Estado=0
                                    WHERE IdArea= ?
                                """, (IdArea,))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)