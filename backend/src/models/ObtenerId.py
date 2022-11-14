from database.db import get_connection

class ObtenerId():
    @classmethod
    def obtener_id(self, table):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute(f"""SELECT IDENT_CURRENT('{table}')+ IDENT_INCR('{table}')""")
                row = cursor.fetchone()
                id = row[0]
            connection.close()
            return id
        except Exception as ex:
            raise Exception(ex)