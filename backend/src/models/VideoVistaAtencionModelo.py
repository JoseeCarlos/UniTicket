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
                                    WHERE IdVideoVistaAtencion = ? AND Estado = 1  
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
    def registrar_video(self, videos):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                for video in videos:
                    cursor.execute("""INSERT INTO UVideoVistaAtencion(IdSedeAcademica, Url)
                                    VALUES(?, ?)""", (video.IdSedeAcademica, video.Url))
                connection.commit()
            connection.close()
            return video
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod 
    def registrar_video_nacional(self, videos):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                for video in videos:
                    cursor.execute("""INSERT INTO UVideoVistaAtencion(Url)
                                    VALUES(?)""", (video.Url))
                connection.commit()
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
                                    SET IdSedeAcademica = ?, Url = ?, Estado = ?, IdUsuarioModificacion = ?, FechaModificacion = ?
                                    WHERE IdVideoVistaAtencion= ?
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
                                    WHERE IdVideoVistaAtencion = ?
                                """, (IdVideoVistaAtencion))
                connection.commit()
            connection.close()
            return True
        except Exception as ex:
            raise Exception(ex)

   
        