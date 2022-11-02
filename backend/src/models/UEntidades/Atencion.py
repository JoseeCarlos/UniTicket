class Atencion():
    def __init__(self, IdAtencion=None, TipoAtencion=None, IdTicket=None, IdEmpleado=None, IdMesa=None, IdTransferencia=None, IdUsuarioRegistro=None, Estado=None, FechaRegistro=None, FechaModificacion=None):
        self.IdAtencion = IdAtencion
        self.TipoAtencion = TipoAtencion
        self.IdTicket = IdTicket
        self.IdEmpleado = IdEmpleado
        self.IdMesa = IdMesa
        self.IdTransferencia = IdTransferencia
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion
    
    def to_JSON(self):
        return {
            "IdAtencion": self.IdAtencion,
            "TipoAtencion": self.TipoAtencion,
            "IdTicket": self.IdTicket,
            "IdEmpleado": self.IdEmpleado,
            "IdMesa": self.IdMesa,
            "IdTransferencia": self.IdTransferencia,
            "IdUsuarioRegistro": self.IdUsuarioRegistro,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion
        }   
    