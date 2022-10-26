class Transferencia():
    def __init__(self, IdTransferencia=None, IdTicket=None, IdEmpleado=None, IdMesaOrigen=None, IdLugarAtencionDestino=None, IdAreaDestino=None, Estado=None, FechaCreacion=None, FechaActualizacion=None, IdUsuarioCreacion=None, IdUsuarioActualizacion=None):
        self.IdTransferencia = IdTransferencia
        self.IdTicket = IdTicket
        self.IdEmpleado = IdEmpleado
        self.IdMesaOrigen = IdMesaOrigen
        self.IdLugarAtencionDestino = IdLugarAtencionDestino
        self.IdAreaDestino = IdAreaDestino
        self.Estado = Estado
        self.FechaCreacion = FechaCreacion
        self.FechaActualizacion = FechaActualizacion
        self.IdUsuarioCreacion = IdUsuarioCreacion
        self.IdUsuarioActualizacion = IdUsuarioActualizacion
    
    def to_JSON(self):
        return {
            "IdTransferencia": self.IdTransferencia,
            "IdTicket": self.IdTicket,
            "IdEmpleado": self.IdEmpleado,
            "IdMesaOrigen": self.IdMesaOrigen,
            "IdLugarAtencionDestino": self.IdLugarAtencionDestino,
            "IdAreaDestino": self.IdAreaDestino,
            "Estado": self.Estado,
            "FechaCreacion": self.FechaCreacion,
            "FechaActualizacion": self.FechaActualizacion,
            "IdUsuarioCreacion": self.IdUsuarioCreacion,
            "IdUsuarioActualizacion": self.IdUsuarioActualizacion
        }