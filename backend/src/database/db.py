import mysql.connector
from decouple import config 

def  get_connection():
    try:
        connection = mysql.connector.connect(
            host=config('MYSQL_HOST'),
            user=config('MYSQL_USER'),
            password=config('MYSQL_PASSWORD'),
            database=config('MYSQL_DB')

        )
        return connection
    except mysql.connector.Error as error:
        print("Failed to connect to MySQL {}".format(error))