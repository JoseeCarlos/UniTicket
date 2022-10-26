class Ticket():
    def __init__(self,IdTicket=None, Numero=None,TipoTicket=None,IdTipoAtencion=None,IdTipoUsuario=None,IdLugarAtencion=None,IdArea=None,Estado=None,FechaCreacion=None,FechaActualizacion=None,IdUsuarioCreacion=None,IdUsuarioModificacion=None):
        self.IdTicket = IdTicket
        self.Numero = Numero
        self.TipoTicket = TipoTicket
        self.IdTipoAtencion = IdTipoAtencion
        self.IdTipoUsuario = IdTipoUsuario
        self.IdLugarAtencion = IdLugarAtencion
        self.IdArea = IdArea
        self.Estado = Estado
        self.FechaCreacion = FechaCreacion
        self.FechaActualizacion = FechaActualizacion
        self.IdUsuarioCreacion = IdUsuarioCreacion
        self.IdUsuarioModificacion = IdUsuarioModificacion
    
    def to_JSON(self):
        return {
            "IdTicket": self.IdTicket,
            "Numero": self.Numero,
            "TipoTicket": self.TipoTicket,
            "IdTipoAtencion": self.IdTipoAtencion,
            "IdTipoUsuario": self.IdTipoUsuario,
            "IdLugarAtencion": self.IdLugarAtencion,
            "IdArea": self.IdArea,
            "Estado": self.Estado,
            "FechaCreacion": self.FechaCreacion,
            "FechaActualizacion": self.FechaActualizacion,
            "IdUsuarioCreacion": self.IdUsuarioCreacion,
            "IdUsuarioModificacion": self.IdUsuarioModificacion
        }