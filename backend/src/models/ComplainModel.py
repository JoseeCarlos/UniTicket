from flask import jsonify
from database.db import get_connection
from .entities.ComplainS import ComplainS
import json


class ComplainModel():
    @classmethod
    def get_complains(self):
        try:
            connection = get_connection()
            complains = []
            with connection.cursor() as cursor:
                cursor.execute("""select Q.IdQueja, RQ.Nombre,
                                    IIF(Q.TipoQueja=0,0, TL.userId) 'nombreUsuario',
                                    isnull(Q.Descripcion, RQ.Descripcion) 'description',
                                    Q.TipoQueja,
                                    IIF(Q.IdAtencion = null, 0 , A.TipoAtencion) 'attentionType',
                                    LU.Nombre,
                                    A.FechaCreacion,
                                    A.FechaActualizacion,
                                    Q.FechaCreacion,
                                    A.IdEmpleado                         
                                    from UQueja Q
                                    left join UAtencion A on A.IdAtencion=Q.IdAtencion
                                    left join UMesa ME on ME.IdMesa=A.IdMesa	
                                    left join ULugarAtencion LU on LU.IdLugarAtencion=ME.IdLugarAtencion
                                    left join UTicket T on T.IdTIcket=A.IdTicket
                                    left join UTicketEnlinea TL on TL.IdTicket=T.IdTIcket
                                    left join URazonQueja RQ on RQ.IdRazonQueja=Q.IdRazonQueja
                                    order by Q.FechaCreacion desc
                                """)
                for row in cursor.fetchall():
                    complains.append(ComplainS(complainId=row[0],userName=row[1],name=row[2],description=row[3], complainType=row[4], attentionType=row[5], tableName=row[6], startTime=row[7], finishTime=row[8], createDate=row[9], employeeName=row[10]).to_JSON())

            connection.close()
            return complains
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def get_complain(self, complainId):
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
    def create_complain(self, complain):
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
