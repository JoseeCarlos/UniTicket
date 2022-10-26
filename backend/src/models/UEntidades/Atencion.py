class Atencion():
    def __init__(self, IdAtencion=None,HoraInicio=None,HoraFinalizacion=None,TipoAtencion=None,IdTicket=None,IdEmpleado=None,IdMesa=None,IdTransferencia=None,estado=None,fechaCreacion=None,fechaActualizacion=None):
        self.IdAtencion = IdAtencion
        self.HoraInicio = HoraInicio
        self.HoraFinalizacion = HoraFinalizacion
        self.TipoAtencion = TipoAtencion
        self.IdTicket = IdTicket
        self.IdEmpleado = IdEmpleado
        self.IdMesa = IdMesa
        self.IdTransferencia = IdTransferencia
        self.estado = estado
        self.fechaCreacion = fechaCreacion
        self.fechaActualizacion = fechaActualizacion
    
    def to_JSON(self):
        return {
            "IdAtencion": self.IdAtencion,
            "HoraInicio": self.HoraInicio,
            "HoraFinalizacion": self.HoraFinalizacion,
            "TipoAtencion": self.TipoAtencion,
            "IdTicket": self.IdTicket,
            "IdEmpleado": self.IdEmpleado,
            "IdMesa": self.IdMesa,
            "IdTransferencia": self.IdTransferencia,
            "estado": self.estado,
            "fechaCreacion": self.fechaCreacion,
            "fechaActualizacion": self.fechaActualizacion
        }   
    