from flask import jsonify
from database.db import get_connection
from .entities.City import City
import json


class CityModel():
    @classmethod
    def get_cities(self):
        try:
            connection = get_connection()
            cities = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT cityId, name, latitude, longitude, status, createDate, updateDate, userIdCreate, userIdMod 
                                    FROM city
                                    WHERE status=1 
                                """)
                for row in cursor.fetchall():
                    cities.append(City(cityId=row[0],name=row[1],latitude=row[2], longitude=row[3], status=row[4], createDate=row[5], updateDate=row[6], userIdCreate=row[7], userIdMod=row[8]).to_JSON())

            connection.close()
            return cities
        except Exception as ex:
            raise Exception(ex)
        
    @classmethod
    def get_city(self, cityId):
        try:
            connection = get_connection()
            data = [City]
            with connection.cursor() as cursor:
                cursor.execute("""SELECT cityId, name, status, updateDate, userIdCreate, userIdMod
                                    FROM city
                                    WHERE status=1 AND cityId=%s
                                """, (cityId))
                for row in cursor.fetchall():
                    data[0]=(City(row[0], row[1], row[2], row[3], row[4], row[5]))

            connection.close()
            return json.dumps(data, default=str)
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def create_city(self, city):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO city (name, status, updateDate, userIdCreate, userIdMod )
                                VALUES (%s, %s, %s, %s, %s )""", (city.name, city.status, city.updateDate, city.userIdCreate, city.userIdMod))

            connection.commit()
            connection.close()
            return True
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def update_city(self, city):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE city
                                    SET name=%s, status=%s, updateDate=%s, userIdMod=%s
                                    WHERE cityId=%s""", (city.name, city.status, city.updateDate, city.userIdMod, city.cityId))

            connection.commit()
            connection.close()
            return True
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def delete_city(self, cityId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE city
                                    SET status=0
                                    WHERE cityId=%s""", (cityId))

            connection.commit()
            connection.close()
            return True
        except Exception as ex:
            raise Exception(ex)