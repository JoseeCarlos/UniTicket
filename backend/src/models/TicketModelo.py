from flask import jsonify
from database.db import get_connection
from .UEntidades.Ticket import Ticket
from .UEntidades.TicketUsuario import TicketUsuario
from .AtencionModelo import AtencionModelo
import json

class TicketModelo():

    @classmethod
    def obtener_Tickets(self):
        try:
            connection = get_connection()
            tickets = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdTicket, IdUsuario, IdTipoAtencion, IdEstado, IdPrioridad, IdUsuarioAsignado, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM UTicket
                                    WHERE Estado = 1 
                                """)
                for row in cursor.fetchall():
                    tickets.append(Ticket(IdTicket=row[0],IdUsuario=row[1],IdTipoAtencion=row[2], IdEstado=row[3], IdPrioridad=row[4], IdUsuarioAsignado=row[5], IdUsuarioRegistro=row[6], Estado=row[7], FechaRegistro=row[8], FechaModificacion=row[9]).to_JSON())

            connection.close()
            return tickets
        except Exception as ex:
            raise Exception(ex) 

    @classmethod
    def obtener_Ticket(self, ticketId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""SELECT IdTicket, IdUsuario, IdTipoAtencion, IdEstado, IdPrioridad, IdUsuarioAsignado, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion
                                    FROM UTicket
                                    WHERE IdTicket=%s
                                """, (ticketId))
                row = cursor.fetchone()
                if row is None:
                    return None
                else:
                    ticket = Ticket(IdTicket=row[0],IdUsuario=row[1],IdTipoAtencion=row[2], IdEstado=row[3], IdPrioridad=row[4], IdUsuarioAsignado=row[5], IdUsuarioRegistro=row[6], Estado=row[7], FechaRegistro=row[8], FechaModificacion=row[9]).to_JSON()

            connection.close()
            return ticket
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def crear_Ticket(self, ticket):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO UTicket(IdUsuario, IdTipoAtencion, IdEstado, IdPrioridad, IdUsuarioAsignado, IdUsuarioRegistro, FechaModificacion)
                                    VALUES (?, ?, ?, ?, ?, ?, ?)
                                """, (ticket.IdUsuario, ticket.IdTipoAtencion, ticket.IdEstado, ticket.IdPrioridad, ticket.IdUsuarioAsignado, ticket.IdUsuarioRegistro, ticket.FechaModificacion))
                connection.commit()
                ticketId = cursor.lastrowid

            connection.close()
            return ticketId
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def crear_ticket_presencial(self, ticket):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""INSERT INTO UTicket (Codigo, Numero, TipoTicket, IdTipoAtencion, IdTipoUsuario, IdLugarAtencion, IdArea, Id_Sitio, Id_Sede_Academica)
                                    VALUES(?, (SELECT IIF(ISNULL(MAX(T.Numero), 0) = 0, 1, MAX(T.Numero) + 1) NUM
                                    FROM UTicket T
                                    INNER JOIN ULugarAtencion LU ON LU.IdLugarAtencion=T.IdLugarAtencion
                                    WHERE LU.IdLugarAtencion = ? ), ?, ?, ?, ?, ?, ?, ? )
                                """, (ticket.Codigo, ticket.IdLugarAtencion, ticket.TipoTicket, ticket.IdTipoAtencion, ticket.IdTipoUsuario, ticket.IdLugarAtencion, ticket.IdArea, ticket.Id_Sitio, ticket.Id_Sede_Academica))
                connection.commit()
                filas_afectadas = cursor.rowcount
            connection.close()
            return filas_afectadas
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def actualizar_Ticket(self, ticket):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UTicket
                                    SET IdUsuario = ?, IdTipoAtencion = ?, IdEstado = ?, IdPrioridad = ?, IdUsuarioAsignado = ?, IdUsuarioRegistro = ?, FechaModificacion = ?
                                    WHERE IdTicket = ?
                                """, (ticket.IdUsuario, ticket.IdTipoAtencion, ticket.IdEstado, ticket.IdPrioridad, ticket.IdUsuarioAsignado, ticket.IdUsuarioRegistro, ticket.FechaModificacion, ticket.IdTicket))
                connection.commit()

            connection.close()
            return ticket.IdTicket
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def eliminar_Ticket(self, ticketId):
        try:
            connection = get_connection()
            with connection.cursor() as cursor:
                cursor.execute("""UPDATE UTicket
                                    SET Estado = 0
                                    WHERE IdTicket = ?
                                """, (ticketId))
                connection.commit()

            connection.close()
            return ticketId
        except Exception as ex:
            raise Exception(ex)

    @classmethod
    def obtener_TicketsPorUsuario(self, usuarioId):
        try:
            connection = get_connection()
            tickets = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT T.IdTicket, T.Codigo, T.Numero, T.Id_Sitio, A.Nombre, LA.Nombre, TL.FechaHoraReservacion
                                    FROM UTicket T
                                    INNER JOIN UTicketEnLinea TL ON TL.IdTicket = T.IdTicket
                                    INNER JOIN UArea A ON A.IdArea = T.IdArea
                                    INNER JOIN ULugarAtencion LA ON LA.IdLugarAtencion = T.IdLugarAtencion 
                                    WHERE TL.IdUsuarioRegistro = ?
                                """, (usuarioId))
                for row in cursor.fetchall():
                    tickets.append(TicketUsuario(idTicket=row[0],Codigo=row[1], Numero=row[2], Id_Sitio=row[3], NombreArea=row[4], NombreLugar=row[5], FechaHoraReservacion=row[6]).to_JSON())
            connection.close()
            return tickets
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def obtener_historialTickets(self, IdUsuario):
        try:
            connection = get_connection()
            tickets = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT T.Codigo,T.Numero, AR.Nombre, LA.Nombre, A.FechaRegistro
                                    FROM UAtencion A
                                    INNER JOIN UTicketEnLinea TE ON TE.IdTicket=A.IdTicket
                                    INNER JOIN UTicket T ON T.IdTicket=TE.IdTicket
                                    INNER JOIN UAsignacion UA ON UA.IdAsignacion=A.IdAsignacion
                                    INNER JOIN UMesa M ON M.IdMesa=UA.IdMesa
                                    INNER JOIN ULugarAtencion LA ON LA.IdLugarAtencion=M.IdLugarAtencion
                                    INNER JOIN UArea AR ON AR.IdArea=LA.IdArea
                                    WHERE TE.IdUsuarioRegistro= ?
                                """, (IdUsuario))
                for row in cursor.fetchall():
                    tickets.append(TicketUsuario(Codigo=row[0], Numero=row[1], NombreArea=row[2], NombreLugar=row[3], FechaHoraReservacion=row[4]).to_JSON())
            connection.close()
            return tickets
        except Exception as ex:
            raise Exception(ex)
    
    @classmethod
    def obtener_TicketsAdmin(self):
        try:
            connection = get_connection()
            tickets = []
            with connection.cursor() as cursor:
                cursor.execute("""SELECT T.IdTicket,T.Codigo, T.Numero, LA.Nombre, TE.FechaHoraReservacion, A.Nombre, T.Estado, T.FechaRegistro, TE.IdUsuarioRegistro
                                    FROM UTicket T
                                    LEFT JOIN UTicketEnLinea TE ON TE.IdTicket=T.IdTicket
                                    INNER JOIN ULugarAtencion LA ON LA.IdLugarAtencion=T.IdLugarAtencion
                                    INNER JOIN UArea A ON A.IdArea=LA.IdArea 
                                """)
                for row in cursor.fetchall():
                    tickets.append(TicketUsuario(idTicket=row[0], Codigo=row[1], Numero=row[2], NombreLugar=row[3], FechaHoraReservacion=row[4],NombreArea=row[5], Estado=row[6], FechaRegistro=row[7], Atenciones=AtencionModelo.obtenerAtencionHistorial(row[0])).to_JSON())
            connection.close()
            return tickets
        except Exception as ex:
            raise Exception(ex)









