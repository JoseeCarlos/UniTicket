# import mysql.connector
import pyodbc 
from decouple import config 

def  get_connection():
    try:
        s = config('DB_SERVER')
        u = config('DB_USER')
        p = config('DB_PASSWORD')
        d = config('DB_DATABASE')
        connection = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};SERVER='+s+';DATABASE='+d+';UID='+u+';PWD='+p)
        return connection
    except Exception as ex:
        raise Exception(ex)