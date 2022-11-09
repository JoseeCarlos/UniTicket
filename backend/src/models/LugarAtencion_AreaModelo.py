from flask import jsonify
from database.db import get_connection
from .UEntidades.LugarAtencion_Area import LugarAtencion_Area
import json

class LugarAtencion_AreaModelo():
    @classmethod
    def obtener_LugarAtencionAreas(self):
        try:
            connection = get_connection()
            lugaAtencionAreas = []
            with connection.cursor() as cursor:
                cursor.execute("""select LU.IdLugarAtencion,
                                    LU.Nombre ,
                                    LU.Id_Sede_Academica ,
                                    LU.Id_Sitio,
                                    A.Nombre NombreArea,
                                    A.IdArea,
                                    LU.Estado
                                    from ULugarAtencion LU
                                    inner join UArea A on A.IdArea=LU.IdArea
                                """)
                for row in cursor.fetchall():
                    lugaAtencionAreas.append(LugarAtencion_Area(IdLugarAtencion=row[0], Nombre=row[1], IdSedeAcademica=row[2], IdSitio=row[3], NombreArea=row[4], IdArea=row[5], Estado=row[6]).to_JSON())

            connection.close()
            return lugaAtencionAreas
        except Exception as ex:
            raise Exception(ex)
