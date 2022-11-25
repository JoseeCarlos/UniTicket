from flask import jsonify
from database.db import get_connection
from .UEntidades.VideoVistaAtencion import VideoVistaAtencion
import json
from datetime import datetime

class VideoVistaAtencionModelo():

    @classmethod
    def obtener_videos(self):
        try:
            connection = get_connection()
            videos = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdVideoVistaAtencion, IdSedeAcademica, Url, Estado
                                    FROM UVideoVistaAtencion
                                WHERE Estado=1  
                                """)
                for row in cursor.fetchall():
                    videos.append(VideoVistaAtencion(IdVideoVistaAtencion=row[0],Descripcion=row[1],Url=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6]).to_JSON())
            connection.close()
            return videos
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def obtener_video(self, IdVideoVistaAtencion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdVideoVistaAtencion, IdSedeAcademica, Url, Estado
                                    FROM UVideoVistaAtencion
                                WHERE IdVideoVistaAtencion=%s AND Estado=1  
                                """, (IdVideoVistaAtencion))
                row = cursor.fetchone()
                if row is None:
                    return None
                video = VideoVistaAtencion(IdVideoVistaAtencion=row[0],Descripcion=row[1],Url=row[2], IdUsuarioRegistro=row[3], Estado=row[4], FechaRegistro=row[5], FechaModificacion=row[6])
            connection.close()
            return video
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def registrar_video(self, video):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO UVideoVistaAtencion(IdSedeAcademica, Url, Estado, IdUsuarioRegistro, FechaRegistro)
                                    VALUES (%s, %s, %s, %s, %s)
                                """, (video.IdSedeAcademica, video.Url, video.Estado, video.IdUsuarioRegistro, video.FechaRegistro))
                connection.commit()
                video.IdVideoVistaAtencion = cursor.lastrowid
            connection.close()
            return video
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def actualizar_video(self, video):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UVideoVistaAtencion
                                    SET IdSedeAcademica=%s, Url=%s, Estado=%s, IdUsuarioModificacion=%s, FechaModificacion=%s
                                WHERE IdVideoVistaAtencion=%s
                                """, (video.IdSedeAcademica, video.Url, video.Estado, video.IdUsuarioModificacion, video.FechaModificacion, video.IdVideoVistaAtencion))
                connection.commit()
            connection.close()
            return video
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def eliminar_video(self, IdVideoVistaAtencion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UVideoVistaAtencion
                                    SET Estado=0
                                WHERE IdVideoVistaAtencion=%s
                                """, (IdVideoVistaAtencion))
                connection.commit()
            connection.close()
            return True
        except Exception as ex:
            raise Exception(ex)

   
        