class LugarAtencion():
    def __init__(self,IdLugarAtencion=None,Nombre=None,NumeroMaximoReservasPorHora=None,Estado=None,FechaCreacion=None,FechaActualizacion=None):
        self.IdLugarAtencion = IdLugarAtencion
        self.Nombre = Nombre
        self.NumeroMaximoReservasPorHora = NumeroMaximoReservasPorHora
        self.Estado = Estado
        self.FechaCreacion = FechaCreacion
        self.FechaActualizacion = FechaActualizacion

    
    def to_JSON(self):
        return {
            "attentionPlaceId": self.attentionPlaceId,
            "name": self.name,
            "campusId": self.campusId,
            "status": self.status,
            "createDate": self.createDate,
            "updateDate": self.updateDate

        }