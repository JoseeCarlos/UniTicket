from flask import jsonify
from database.db import get_connection
from .UEntidades.AsigancionEmpleado import AsignacionEmpleado
from .UEntidades.Asignacion import Asignacion
import json

class AsignacionModelo():
    
    @classmethod
    def obtener_asignaciones(self):
        try:
            connection = get_connection()
            asignaciones = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT A.IdEmpleado,AR.Nombre,LA.Nombre,M.IdMesa,M.Numero,A.FechaRegistro,A.FechaModificacion
                                    FROM UAsignacion A
                                    INNER JOIN UMesa M ON M.IdMesa=A.IdMesa
                                    INNER JOIN ULugarAtencion LA ON LA.IdLugarAtencion=M.IdLugarAtencion
                                    INNER JOIN UArea AR ON AR.IdArea=LA.IdArea
                                    WHERE A.Estado=1
                                """)
                for row in cursor.fetchall():
                    asignaciones.append(AsignacionEmpleado(IdEmpleado=row[0], NombreArea=row[1], NombreLugarAtencion=row[2], IdMesa=row[3], Numero=row[4], FechaRegistro=row[5], FechaModificacion=row[6]).to_JSON())
            connection.close()
            return asignaciones
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def obtenerAsignacion(self, asignacionId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT asignacionId, employeeId, tableId, number, createDate, updateDate
                                    FROM asignacion
                                    WHERE asignacionId=%s
                                """, (asignacionId))
                row = cursor.fetchone()
                asignacion = AsignacionEmpleado(asignacionId=row[0],employeeId=row[1],tableId=row[2],number=row[3], createDate=row[4], updateDate=row[5]).to_JSON()
            connection.close()
            return asignacion
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def crearAsignacion(self, asignacion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO UAsignacion (IdEmpleado, IdMesa, IdUsuarioRegistro)
                                    VALUES (?, ?, ?)
                                """, (asignacion.IdEmpleado, asignacion.IdMesa, asignacion.IdUsuarioRegistro))
                connection.commit()
                filas_afectadas = cursor.rowcount
            connection.close()
            return filas_afectadas
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def actualizarAsignacion(self, asignacionId, asignacion):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE asignacion
                                    SET employeeId=%s, tableId=%s, number=%s, updateDate=%s
                                    WHERE asignacionId=%s
                                """, (asignacion.employeeId, asignacion.tableId, asignacion.number, asignacion.updateDate, asignacionId))
                connection.commit()
            connection.close()
            return jsonify({"message": "Asignacion actualizada con exito"}), 200
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def eliminarAsignacion(self, asignacionId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""DELETE FROM asignacion
                                    WHERE asignacionId=%s
                                """, (asignacionId))
                connection.commit()
            connection.close()
            return jsonify({"message": "Asignacion eliminada con exito"}), 200
        except Exception as ex:
            raise Exception(ex)

