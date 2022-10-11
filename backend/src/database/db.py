import mysql.connector
from decouple import config 

def  get_connection():
    try:
        connection = mysql.connector.connect(
            host=config('MYSQL_HOST'),
            user=config('MYSQL_USER'),
            password='Univalle',
            database='uniticketdb'

        )
        return connection
    except mysql.connector.Error as error:
        print("Failed to connect to MySQL {}".format(error))