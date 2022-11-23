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
                cursor.execute("""SELECT IdEquipoAtencion, Ip, Nombre, Mac, IdLugarAtencion
                                    FROM UEquipoAtencion
                                    WHERE Estado = 1 
                                """)
                for row in cursor.fetchall():
                    equipos_atencion.append(EquipoAtencion(IdEquipoAtencion=row[0],Ip=row[1],Nombre=row[2], Mac=row[3], IdLugarAtencion=row[4]).to_JSON())
            connection.close()
            return equipos_atencion
        except Exception as ex:
            raise Exception(ex)