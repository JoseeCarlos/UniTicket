from flask import jsonify
from database.db import get_connection
from .UEntidades.QuejaS import QuejaS
import json


class QuejaModelo():
    @classmethod
    def obtener_quejas(self):
        try:
            connection = get_connection()
            quejas = []
            with connection.cursor() as cursor:
                cursor.execute("""select Q.IdQueja, RQ.Nombre,
                                    IIF(Q.TipoQueja=0,0, TL.IdUsuario) 'nombreUsuario',
                                    isnull(QL.Descripcion, RQ.Descripcion) 'description',
                                    Q.TipoQueja,
                                    IIF(Q.IdAtencion = null, 0 , A.TipoAtencion) 'attentionType',
                                    LU.Nombre,
                                    A.FechaRegistro,
                                    A.FechaModificacion,
                                    Q.FechaRegistro,
                                    A.IdEmpleado                         
                                    from UQueja Q
                                    left join UAtencion A on A.IdAtencion=Q.IdAtencion
                                    left join UMesa ME on ME.IdMesa=A.IdMesa	
                                    left join ULugarAtencion LU on LU.IdLugarAtencion=ME.IdLugarAtencion
                                    left join UTicket T on T.IdTIcket=A.IdTicket
                                    left join UTicketEnlinea TL on TL.IdTicket=T.IdTIcket
                                    left join URazonQueja RQ on RQ.IdRazonQueja=Q.IdRazonQueja
									left join UQuejaEnLinea QL ON QL.IdQueja=Q.IdQueja
									left join UQuejaPresencial QP ON QP.IdQueja=Q.IdQueja
                                    order by Q.FechaRegistro desc
                                """)
                for row in cursor.fetchall():
                    quejas.append(QuejaS(IdQueja=row[0], NombreQueja=row[1], NombreUsuario=row[2], Descripcion=row[3], TipoQueja=row[4], TipoAtencion=row[5], LugarAtencion=row[6], FechaInicio=row[7], FechaFin=row[8], FechaRegistro=row[9], NombreEmpleado=row[10]).to_JSON())
            connection.close()
            return quejas
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def obtener_queja(self, complainId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT complainId, userName, name, description, complainType, attentionType, tableName, startTime, finishTime, createDate, employeeName
                                    FROM complain
                                    WHERE complainId=%s
                                """, (complainId))
                row = cursor.fetchone()
                complain = ComplainS(complainId=row[0],userName=row[1],name=row[2],description=row[3], complainType=row[4], attentionType=row[5], tableName=row[6], startTime=row[7], finishTime=row[8], createDate=row[9], employeeName=row[10]).to_JSON()
            connection.close()
            return complain
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def crear_queja(self, complain):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO complain (userName, name, description, complainType, attentionType, tableName, startTime, finishTime, createDate, employeeName)
                                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                                """, (complain.userName, complain.name, complain.description, complain.complainType, complain.attentionType, complain.tableName, complain.startTime, complain.finishTime, complain.createDate, complain.employeeName))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
