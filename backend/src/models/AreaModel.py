from flask import jsonify
from database.db import get_connection
from .entities.Area import Area
import json

class AreaModel():
    @classmethod
    def get_areas(self):
        try:
            connection = get_connection()
            areas = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdArea, Nombre, Descripcion, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion
                                    FROM UArea
                                    WHERE Estado=1  
                                """)
                for row in cursor.fetchall():
                    areas.append(Area(areaId=row[0],name=row[1],description=row[2], status=row[3], createDate=row[4], updateDate=row[5], userIdCreate=row[6], userIdMod=row[7]).to_JSON())
            connection.close()
            return areas
        except Exception as ex:
            raise Exception(ex) 
    
    @classmethod
    def get_area(self, areaId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdArea, Nombre, Descripcion, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion
                                    FROM UArea
                                    WHERE IdArea=%s
                                """, (areaId))
                row = cursor.fetchone()
                area = Area(areaId=row[0],name=row[1],description=row[2], status=row[3], createDate=row[4], updateDate=row[5], userIdCreate=row[6], userIdMod=row[7]).to_JSON()

            connection.close()
            return area
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def create_area(self, area):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO UArea(Nombre, Descripcion, NumeroMaximoTicketsParaEstudiantes, FechaActualizacion, IdUsuarioCreacion)
                                    VALUES (?, ?, ?, ?, ?)
                                """, (area.name, area.description, area.numberMaxAtettion, area.updateDate, area.userIdCreate))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod    
    def update_area(self, area):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UArea
                                  SET Nombre= ? , Descripcion= ?, FechaActualizacion= ?, IdUsuarioActualizacion= ?
                                  WHERE IdArea= ?
                                """, (area.name, area.description, area.updateDate, area.userIdMod, area.areaId))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)

    
    @classmethod
    def delete_area(self, areaId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UArea
                                    SET Estado=0
                                    WHERE IdArea= ?
                                """, (areaId,))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
            