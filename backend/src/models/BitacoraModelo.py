from flask import jsonify
from database.db import get_connection
from .UEntidades.Bitacora import Bitacora
import json
from datetime import datetime

class BitacoraModelo():
    @classmethod
    def obtener_bitacoras(self):
        try:
            connection = get_connection()
            bitacoras = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdBitacora, Descripcion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM UBitacora
                                    WHERE Estado = 1 
                                """)
                for row in cursor.fetchall():
                    bitacoras.append(Bitacora(IdBitacora=row[0],Descripcion=row[1],IdUsuarioRegistro=row[2], Estado=row[3], FechaRegistro=row[4], FechaModificacion=row[5]).to_JSON())
            connection.close()
            return bitacoras
        except Exception as ex:
            raise Exception(ex)


