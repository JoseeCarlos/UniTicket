class TicketEnLinea():
    def __init__(self,IdTicket=None,fechaHoraReservacion=None,userId=None ):
        self.IdTicket = IdTicket
        self.fechaHoraReservacion = fechaHoraReservacion
        self.userId = userId
    
    def to_JSON(self):
        return {
            "IdTicket": self.IdTicket,
            "fechaHoraReservacion": self.fechaHoraReservacion,
            "userId": self.userId
        }