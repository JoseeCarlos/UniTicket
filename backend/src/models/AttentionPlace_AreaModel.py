from flask import jsonify
from database.db import get_connection
from .entities.AttentionPlaceAreaS import AttentionPlaceAreaS
import json

class AttentionPlace_AreaModel():
    @classmethod
    def get_attentionPlaceAreas(self):
        try:
            connection = get_connection()
            attentionPlaceAreas = []
            with connection.cursor() as cursor:
                cursor.execute("""select LU.IdLugarAtencion,
                                    LU.Nombre attentionPlaceName,
                                    LU.IdSitio ,
                                    A.Nombre areaName,
                                    A.IdArea,
                                    LU.Estado
                                    from ULugarAtencion LU
                                    inner join ULugarAtencion_Area LA on LA.IdLugarAtencion=LU.IdLugarAtencion
                                    inner join UArea A on A.IdArea=LA.IdArea
                                """)
                for row in cursor.fetchall():
                    attentionPlaceAreas.append(AttentionPlaceAreaS(attentionPlaceId=row[0], attentionPlaceName=row[1], campusId=row[2], areaName=row[3], areaId=row[4], status=row[5]).to_JSON())

            connection.close()
            return attentionPlaceAreas
        except Exception as ex:
            raise Exception(ex)

