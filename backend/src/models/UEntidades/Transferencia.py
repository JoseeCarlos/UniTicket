class Transferencia():
    def __init__(self, IdTransferencia=None, IdTicket=None, IdEmpleado=None, IdMesaOrigen=None, IdLugarAtencionDestino=None, IdAreaDestino=None, IdUsuarioRegistro=None, Estado=None, FechaRegistro=None, FechaModificacion=None):
        self.IdTransferencia = IdTransferencia
        self.IdTicket = IdTicket
        self.IdEmpleado = IdEmpleado
        self.IdMesaOrigen = IdMesaOrigen
        self.IdLugarAtencionDestino = IdLugarAtencionDestino
        self.IdAreaDestino = IdAreaDestino
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion  
    
    def to_JSON(self):
        return {
            "IdTransferencia": self.IdTransferencia,
            "IdTicket": self.IdTicket,
            "IdEmpleado": self.IdEmpleado,
            "IdMesaOrigen": self.IdMesaOrigen,
            "IdLugarAtencionDestino": self.IdLugarAtencionDestino,
            "IdAreaDestino": self.IdAreaDestino, 
            "IdUsuarioRegistro": self.IdUsuarioRegistro,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion
        }