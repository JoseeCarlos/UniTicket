from flask import jsonify
from database.db import get_connection
from .entities.Campus import Campus
import json

class CampusModel():
    @classmethod
    def get_campuses(self):
        try:
            connection = get_connection()
            campuses = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT campusId, name, description, latitude, longitude, cityId, status, createDate, updateDate, userIdCreate, userIdMod
                                    FROM campus
                                    WHERE status=1
                                """)
                for row in cursor.fetchall():
                    campuses.append(Campus(campusId=row[0],name=row[1],description=row[2], latitude=row[3], longitude=row[4], cityId=row[5] ,status=row[6], createDate=row[7], updateDate=row[8], userIdCreate=row[9], userIdMod=row[10]).to_JSON())

            connection.close()
            return campuses
        except Exception as ex:
            raise Exception(ex) 
    
    @classmethod
    def get_campus(self, campusId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT campusId, name, description, latitude, longitude, status, createDate, updateDate, userIdCreate, userIdMod
                                    FROM campus
                                    WHERE campusId=%s
                                """, (campusId))
                row = cursor.fetchone()
                campus = Campus(campusId=row[0],name=row[1],description=row[2], latitude=row[3], longitude=row[4], status=row[5], createDate=row[6], updateDate=row[7], userIdCreate=row[8], userIdMod=row[9]).to_JSON()

            connection.close()
            return campus
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def create_campus(self, campus):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO campus (name, description, latitude, longitude, updateDate, userIdCreate)
                                    VALUES (%s, %s, %s, %s, %s, %s)
                                """, (campus.name, campus.description, campus.latitude, campus.longitude, campus.updateDate, campus.userIdCreate))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def update_campus(self, campus):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE campus
                                    SET name=%s, description=%s, latitude=%s, longitude=%s, updateDate=%s, userIdMod=%s
                                    WHERE campusId=%s
                                """, (campus.name, campus.description, campus.latitude, campus.longitude, campus.updateDate, campus.userIdMod, campus.campusId))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def delete_campus(self, campusId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE campus
                                    SET status=0
                                    WHERE campusId=%s
                                """, (campusId,))
                connection.commit()
                affected_rows = cursor.rowcount
            connection.close()
            return affected_rows
        except Exception as ex:
            raise Exception(ex)