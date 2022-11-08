from flask import jsonify
from database.db import get_connection
from .UEntidades.TipoUsuario import TipoUsuario
import json

class TipoUsuarioModelo():
    @classmethod
    def obtener_TipoUsuario(self):
        try:
            connection = get_connection()
            tipoUsuario = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdTipoUsuario, Nombre, Descripcion, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM UTipoUsuario
                                    WHERE Estado=1  
                                """)
                for row in cursor.fetchall():
                    tipoUsuario.append(TipoUsuario(idTipoUsuario=row[0],Nombre=row[1],Descripcion=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6], IdUsuarioActualizacion=row[7]).to_JSON())
            connection.close()
            return tipoUsuario
        except Exception as ex:
            raise Exception(ex) 
    

    # @classmethod
    # def obtener_TipoUsuario(self, tipoUsuarioId):
    #     try:
    #         connection = get_connection()
    #         with connection.cursor() as cursor:
    #             cursor.execute("""SELECT IdTipoUsuario, Nombre, Descripcion, Estado, FechaCreacion, FechaActualizacion, IdUsuarioCreacion, IdUsuarioActualizacion
    #                                 FROM UTipoUsuario
    #                                 WHERE IdTipoUsuario=%s
    #                             """, (tipoUsuarioId))
    #             row = cursor.fetchone()
    #             tipoUsuario = TipoUsuario(IdTipoUsuario=row[0],Nombre=row[1],Descripcion=row[2], Estado=row[3], FechaCreacion=row[4], FechaActualizacion=row[5], IdUsuarioCreacion=row[6], IdUsuarioActualizacion=row[7]).to_JSON()

    #         connection.close()
    #         return tipoUsuario
    #     except Exception as ex:
    #         raise Exception(ex)
    

    # @classmethod
    # def crear_TipoUsuario(self, tipoUsuario):
    #     try:
    #         connection = get_connection()
    #         with connection.cursor() as cursor:
    #             cursor.execute("""INSERT INTO UTipoUsuario(Nombre, Descripcion, Estado, FechaCreacion, IdUsuarioCreacion)
    #                                 VALUES (?, ?, ?, ?, ?)
    #                             """, (tipoUsuario.Nombre, tipoUsuario.Descripcion, tipoUsuario.Estado, tipoUsuario.FechaCreacion, tipoUsuario.IdUsuarioCreacion))
    #             connection.commit()
    #             affected_rows = cursor.rowcount
    #         connection.close()
    #         return affected_rows
    #     except Exception as ex:
    #         raise Exception(ex)
    

    # @classmethod    
    # def modificar_TipoUsuario(self, tipoUsuario):
    #     try:
    #         connection = get_connection()
    #         with connection.cursor() as cursor:
    #             cursor.execute("""UPDATE UTipoUsuario
    #                                 SET Nombre=?, Descripcion=?, Estado=?, FechaActualizacion=?, IdUsuarioActualizacion=?
    #                                 WHERE IdTipoUsuario=?
    #                             """, (tipoUsuario.Nombre, tipoUsuario.Descripcion, tipoUsuario.Estado, tipoUsuario.FechaActualizacion, tipoUsuario.IdUsuarioActualizacion, tipoUsuario.IdTipoUsuario))
    #             connection.commit()
    #             affected_rows = cursor.rowcount
    #         connection.close()
    #         return affected_rows
    #     except Exception as ex:
    #         raise Exception(ex)