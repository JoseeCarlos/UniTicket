from flask import jsonify
from database.db import get_connection
from .UEntidades.LeyendaVistaAtencion import LeyendaVistaAtencion
import json
from datetime import datetime

class LeyendaVistaAtencionModelo():
    @classmethod
    def obtener_leyendas_vista_atencion(self):
        try:
            connection = get_connection()
            leyendas_vista_atencion = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdLeyendaVistaAtencion, IdSedeAcademica, Leyenda, Estado
                                    FROM ULeyendaVistaAtencion
                                    WHERE Estado = 1  
                                """)
                for row in cursor.fetchall():
                    leyendas_vista_atencion.append(LeyendaVistaAtencion(IdLeyendaVistaAtencion=row[0],Descripcion=row[1],IdUsuarioRegistro=row[2], Estado=row[3], FechaRegistro=row[4], FechaModificacion=row[5]).to_JSON())
            connection.close()
            return leyendas_vista_atencion
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def obtener_leyenda_vista_atencion(self, leyenda_vista_atencionId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdLeyendaVistaAtencion, IdSedeAcademica, Leyenda, Estado
                                    FROM ULeyendaVistaAtencion
                                    WHERE IdLeyendaVistaAtencion = ? AND Estado = 1
                                """, (leyenda_vista_atencionId))
                row = cursor.fetchone()
                if row :
                    leyenda_vista_atencion = LeyendaVistaAtencion(IdLeyendaVistaAtencion=row[0],Descripcion=row[1],IdUsuarioRegistro=row[2], Estado=row[3], FechaRegistro=row[4], FechaModificacion=row[5]).to_JSON()
                else: 
                    leyenda_vista_atencion = LeyendaVistaAtencion().to_JSON()
            connection.close()
            return leyenda_vista_atencion
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def crear_leyenda_vista_atencion(self, leyenda_vista_atencion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO ULeyendaVistaAtencion(IdSedeAcademica, Leyenda)
                                    VALUES(?, ?)
                                """, (leyenda_vista_atencion.IdSedeAcademica, leyenda_vista_atencion.Leyenda))
                connection.commit()
                filas_afectadas = cursor.rowcount

            connection.close()
            return filas_afectadas
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def actualizar_leyenda_vista_atencion(self, leyenda_vista_atencion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE ULeyendaVistaAtencion
                                    SET IdSedeAcademica = ?, Leyenda = ?, Estado = ?, FechaModificacion = ?
                                    WHERE IdLeyendaVistaAtencion = ?
                                """, (leyenda_vista_atencion.IdSedeAcademica, leyenda_vista_atencion.Leyenda, leyenda_vista_atencion.Estado, datetime.now(), leyenda_vista_atencion.IdLeyendaVistaAtencion))
                connection.commit()
            connection.close()
            return leyenda_vista_atencion
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def eliminar_leyenda_vista_atencion(self, leyenda_vista_atencionId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE ULeyendaVistaAtencion
                                    SET Estado = 0, FechaModificacion = ?
                                    WHERE IdLeyendaVistaAtencion = ?
                                """, (datetime.now(), leyenda_vista_atencionId))
                connection.commit()
            connection.close()
            return leyenda_vista_atencionId
        except Exception as ex:
            raise Exception(ex)
