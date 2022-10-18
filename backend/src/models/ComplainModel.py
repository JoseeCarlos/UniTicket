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
                cursor.execute("""select c.complainId,
                                    if(c.complainType=0,'Anonimo',concat(u.firstname,' ',u.firstSurname)) 'userName',
                                    cr.name,
                                    ifnull(c.description,cr.description) 'description',
                                    c.complainType,
                                    if(c.attentionId=null,0,a.attentionType) 'attentionType',
                                    ap.name,
                                    a.startTime,
                                    a.finishtime,
                                    c.createDate,
                                    (select concat(firstName,' ',firstSurname) from user where userId=a.employeeId) 'employee'
                                    from complain c
                                    left join attention a on a.attentionId=c.attentionId
                                    left join ´table´ ta on ta.tableId=a.tableId
                                    left join attentionPlace ap on ap.attentionPlaceId=ta.attentionPlaceId
                                    left join ticket t on t.ticketId=a.ticketId
                                    left join onlineticket ot on ot.ticketId=t.ticketId
                                    left join user u on u.userId=ot.userId
                                    left join complainReason cr on cr.complainReasonId=c.complainReasonId
                                    order by createDate desc
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
