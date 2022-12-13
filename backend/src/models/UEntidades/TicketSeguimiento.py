class TicketSeguimiento:
    def __init__(self, IdTicketSeguimiento, IdTicket, Codigo , TipoRegistro, IdAreTransferencia, IdUsuarioRegistro, FechaRegistro, FechaModificacion):

        self.IdTicketSeguimiento = IdTicketSeguimiento
        self.IdTicket = IdTicket
        self.Codigo = Codigo
        self.TipoRegistro = TipoRegistro
        self.IdAreTransferencia = IdAreTransferencia
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion
 
    
    def to_JSON(self):
        return {
            'IdTicketSeguimiento': self.IdTicketSeguimiento,
            'IdTicket': self.IdTicket,
            'Codigo': self.Codigo,
            'TipoRegistro': self.TipoRegistro,
            'IdAreTransferencia': self.IdAreTransferencia,
            'IdUsuarioRegistro': self.IdUsuarioRegistro,
            'FechaRegistro': self.FechaRegistro,
            'FechaModificacion': self.FechaModificacion
        }