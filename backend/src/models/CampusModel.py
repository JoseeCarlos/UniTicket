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
                cursor.execute("""SELECT cityId, name, description, latitude, longitude, status, createDate, updateDate, userIdCreate, userIdMod
                                    FROM uniticketdb.city
                                    WHERE status=1
                                """)
                for row in cursor.fetchall():
                    campuses.append(Campus(cityId=row[0],name=row[1],description=row[2], latitude=row[3], longitude=row[4], status=row[5], createDate=row[6], updateDate=row[7], userIdCreate=row[8], userIdMod=row[9]).to_JSON())

            connection.close()
            return campuses
        except Exception as ex:
            raise Exception(ex) 