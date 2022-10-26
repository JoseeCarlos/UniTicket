class LugarAtencion_Area():
    def __init__(self,IdArea=None, IdLugarAtencion=None,Estado=None,FechaCreacion=None, FechaActualizacion=None,IdUsuarioCreacion=None,IdUsuarioActualizacion=None):
        self.IdArea = IdArea
        self.IdLugarAtencion = IdLugarAtencion
        self.Estado = Estado
        self.FechaCreacion = FechaCreacion
        self.FechaActualizacion = FechaActualizacion
        self.IdUsuarioCreacion = IdUsuarioCreacion
        self.IdUsuarioActualizacion = IdUsuarioActualizacion

    
    def to_JSON(self):
        return {
            "IdArea": self.IdArea,
            "IdLugarAtencion": self.IdLugarAtencion,
            "Estado": self.Estado,
            "FechaCreacion": self.FechaCreacion,
            "FechaActualizacion": self.FechaActualizacion,
            "IdUsuarioCreacion": self.IdUsuarioCreacion,
            "IdUsuarioActualizacion": self.IdUsuarioActualizacion
        }
