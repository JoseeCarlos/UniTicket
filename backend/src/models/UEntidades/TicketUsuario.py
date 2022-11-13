class TicketUsuario():

    def __init__(self, idTicket=None, Codigo=None, Numero=None, Id_Sitio=None, NombreArea=None, NombreLugar=None, FechaHoraReservacion=None ):
        self.idTicket = idTicket
        self.Codigo = Codigo
        self.Numero = Numero
        self.Id_Sitio = Id_Sitio
        self.Nombre = NombreArea
        self.NombreLugar = NombreLugar
        self.FechaHoraReservacion = FechaHoraReservacion 

    def to_JSON(self):
        return {
            "idTicket": self.idTicket,
            "Codigo": self.Codigo,
            "Numero": self.Numero,
            "Id_Sitio": self.Id_Sitio,
            "Nombre": self.Nombre,
            "NombreLugar": self.NombreLugar,
            "FechaHoraReservacion": self.FechaHoraReservacion
        }