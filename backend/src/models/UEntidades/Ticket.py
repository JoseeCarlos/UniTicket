class Ticket():
    def __init__(self,IdTicket=None, Codigo=None, Numero=None, TipoTicket=None, IdTipoAtencion=None, IdTipoUsuario=None, IdLugarAtencion=None, IdArea=None, Id_Sitio=None, Id_Sede_Academica=None, IdUsuarioRegistro=None, Estado=None, FechaRegistro=None, FechaModifica=None):
        self.IdTicket = IdTicket
        self.Codigo = Codigo
        self.Numero = Numero
        self.TipoTicket = TipoTicket
        self.IdTipoAtencion = IdTipoAtencion
        self.IdTipoUsuario = IdTipoUsuario
        self.IdLugarAtencion = IdLugarAtencion
        self.IdArea = IdArea
        self.Id_Sitio = Id_Sitio
        self.Id_Sede_Academica = Id_Sede_Academica
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModifica = FechaModifica

    
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