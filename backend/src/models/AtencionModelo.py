from flask import jsonify
from database.db import get_connection
from .UEntidades.AtencionQueja import AtencionQueja
from .UEntidades.Atencion import Atencion
from .UEntidades.AsigancionEmpleado import AsignacionEmpleado
from .UEntidades.AtencionHistorial import AtencionHistorial
import json

class AtencionModelo():
    
        @classmethod
        def obtener_Atenciones(self):
            try:
                connection = get_connection()
                atenciones = []
                with connection.cursor() as cursor:
                    cursor.execute("""SELECT IdAtencion, IdTicket, IdUsuario, IdTipoAtencion, IdEstado, IdPrioridad, IdUsuarioAsignado, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                        FROM UAtencion
                                        WHERE Estado = 1 
                                    """)
                    for row in cursor.fetchall():
                        atenciones.append(Atencion(IdAtencion=row[0],IdTicket=row[1],IdUsuario=row[2],IdTipoAtencion=row[3], IdEstado=row[4], IdPrioridad=row[5], IdUsuarioAsignado=row[6], IdUsuarioRegistro=row[7], Estado=row[8], FechaRegistro=row[9], FechaModificacion=row[10]).to_JSON())
    
                connection.close()
                return atenciones
            except Exception as ex:
                raise Exception(ex) 
    
        @classmethod
        def obtener_Atencion(self, atencionId):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("""SELECT IdAtencion, IdTicket, IdUsuario, IdTipoAtencion, IdEstado, IdPrioridad, IdUsuarioAsignado, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                        FROM UAtencion
                                        WHERE IdAtencion=%s
                                    """, (atencionId))
                    row = cursor.fetchone()
                    atencion = Atencion(IdAtencion=row[0],IdTicket=row[1],IdUsuario=row[2],IdTipoAtencion=row[3], IdEstado=row[4], IdPrioridad=row[5], IdUsuarioAsignado=row[6], IdUsuarioRegistro=row[7], Estado=row[8], FechaRegistro=row[9], FechaModificacion=row[10]).to_JSON()
    
                connection.close()
                return atencion
            except Exception as ex:
                raise Exception(ex)
    
        @classmethod
        def crear_Atencion(self, atencion):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("""INSERT INTO UAtencion(IdTicket, IdUsuario, IdTipoAtencion, IdEstado, IdPrioridad, IdUsuarioAsignado, IdUsuarioRegistro, FechaModificacion)
                                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                                    """, (atencion.IdTicket, atencion.IdUsuario, atencion.IdTipoAtencion, atencion.IdEstado, atencion.IdPrioridad, atencion.IdUsuarioAsignado, atencion.IdUsuarioRegistro, atencion.FechaModificacion))
                    connection.commit()
                    atencionId = cursor.lastrowid
                connection.close()
                return atencionId
            except Exception as ex:
                raise Exception(ex)

        @classmethod
        def actualizar_Atencion(self, atencion):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("""UPDATE UAtencion
                                        SET IdTicket = ?, IdUsuario = ?, IdTipoAtencion = ?, IdEstado = ?, IdPrioridad = ?, IdUsuarioAsignado = ?, IdUsuarioRegistro = ?, FechaModificacion = ?
                                        WHERE IdAtencion = ?
                                    """, (atencion.IdTicket, atencion.IdUsuario, atencion.IdTipoAtencion, atencion.IdEstado, atencion.IdPrioridad, atencion.IdUsuarioAsignado, atencion.IdUsuarioRegistro, atencion.FechaModificacion, atencion.IdAtencion))
                    connection.commit()
                connection.close()
                return atencion.IdAtencion
            except Exception as ex:
                raise Exception(ex)

        @classmethod
        def eliminar_Atencion(self, atencionId):
            try:
                connection = get_connection()
                with connection.cursor() as cursor:
                    cursor.execute("""UPDATE UAtencion
                                        SET Estado = 0
                                        WHERE IdAtencion = ?
                                    """, (atencionId))
                    connection.commit()
                connection.close()
                return atencionId
            except Exception as ex:
                raise Exception(ex)

        @classmethod
        def obtener_AtencionesTicket(self, IdTicket):
            try:
                connection = get_connection()
                atenciones = []
                with connection.cursor() as cursor:
                    cursor.execute("""SELECT A.IdAtencion, LA.Nombre, M.Numero, A.FechaRegistro
                                        FROM UAtencion A
                                        INNER JOIN UAsignacion UA ON UA.IdAsignacion=A.IdAsignacion
                                        INNER JOIN UMesa M ON M.IdMesa=UA.IdMesa
                                        INNER JOIN ULugarAtencion LA ON LA.IdLugarAtencion=M.IdLugarAtencion
                                        WHERE A.IdTicket= ?
                                    """, (IdTicket,))
                    for row in cursor.fetchall():
                        atenciones.append(AtencionQueja(IdAtencion=row[0], NombreLugar=row[1], NumeroMesa=row[2], FechaRegistro=row[3]).to_JSON())
                connection.close()
                return atenciones
            except Exception as ex:
                raise Exception(ex)
        
        @classmethod
        def obtenerTipoAtencion(self, idTicket):
                try:
                    connection = get_connection()
                    with connection.cursor() as cursor:
                        cursor.execute("""SELECT AR.Nombre, LA.Nombre, M.Numero, UA.IdEmpleado, IIF(A.TipoAtencion=0,'Normal','Transferencia') TipoAtencion
                                    FROM UAtencion A
                                    INNER JOIN UAsignacion UA ON UA.IdAsignacion=A.IdAsignacion
                                    INNER JOIN UMesa M ON M.IdMesa=UA.IdMesa
                                    INNER JOIN ULugarAtencion LA ON LA.IdLugarAtencion=M.IdLugarAtencion
                                    INNER JOIN UArea AR ON AR.IdArea=LA.IdArea
                                    WHERE A.IdAtencion= ?
                                """, (idTicket))
                        row = cursor.fetchone()
                        tipoAtencion = AsignacionEmpleado(NombreArea=row[0], NombreLugarAtencion=row[1], Numero=row[2], IdEmpleado=row[3], TipoAtencion=row[4]).to_JSON()
                    connection.close()
                    return tipoAtencion
                except Exception as ex:
                    raise Exception(ex)
        
        @classmethod
        def obtenerAtencionHistorial(self, idTicket):
            try:
                connection = get_connection()
                atenciones = []
                with connection.cursor() as cursor:
                    cursor.execute("""SELECT UA.IdEmpleado,M.Numero,
                                        (SELECT LA.Nombre FROM ULugarAtencion LA WHERE LA.IdLugarAtencion=M.IdLugarAtencion),
                                        (SELECT LA.Nombre FROM ULugarAtencion LA WHERE LA.IdLugarAtencion=T.IdLugarAtencionDestino),
                                        (SELECT A.Nombre FROM UArea A WHERE A.IdArea=T.IdAreaDestino),
                                        A.Estado,A.FechaRegistro,A.IdUsuarioRegistro
                                        FROM UAtencion A
                                        LEFT JOIN UAsignacion UA ON UA.IdAsignacion=A.IdAsignacion
                                        LEFT JOIN UMesa M ON M.IdMesa =UA.IdMesa
                                        LEFT JOIN UTransferencia T ON T.IdTransferencia=A.IdTransferencia
                                        WHERE A.IdTicket= ?
                                    """, (idTicket))
                    for row in cursor.fetchall():
                        atenciones.append(AtencionHistorial(IdEmpleado=row[0], Numero=row[1], LugarAtencion=row[2], LugarAtencionDestino=row[3], AreaDestino=row[4], Estado=row[5], FechaRegistro=row[6], IdUsuarioRegistro=row[7]).to_JSON()) 
                connection.close()
                return atenciones
            except Exception as ex:
                raise Exception(ex)
                    