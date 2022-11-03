class TicketEnLinea():
    def __init__(self,IdTicket=None,FechaHoraReservacion=None,IdUsuario=None ):
        self.IdTicket = IdTicket
        self.FechaHoraReservacion = FechaHoraReservacion
        self.IdUsuario = IdUsuario
    
    def to_JSON(self):
        return {
            "IdTicket": self.IdTicket,
            "fechaHoraReservacion": self.fechaHoraReservacion,
            "IdUsuario": self.IdUsuario
        }