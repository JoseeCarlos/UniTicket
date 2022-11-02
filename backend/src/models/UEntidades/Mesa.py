class Mesa():
    def __init__(self, IdMesa=None,number=None,IdLugarAtencion=None,IdArea=None,Estado=None,FechaCreacion=None,FecbaActualizacion=None, IdUsuarioCreacion=None, IdUsuarioActualizacion=None):
        self.IdMesa = IdMesa
        self.number = number
        self.IdLugarAtencion = IdLugarAtencion
        self.IdArea = IdArea
        self.Estado = Estado
        self.FechaCreacion = FechaCreacion
        self.FecbaActualizacion = FecbaActualizacion
        self.IdUsuarioCreacion = IdUsuarioCreacion
        self.IdUsuarioActualizacion = IdUsuarioActualizacion
    
    def to_JSON(self):
        return {
            "IdMesa": self.IdMesa,
            "number": self.number,
            "IdLugarAtencion": self.IdLugarAtencion,
            "IdArea": self.IdArea,
            "Estado": self.Estado,
            "FechaCreacion": self.FechaCreacion,
            "FecbaActualizacion": self.FecbaActualizacion,
            "IdUsuarioCreacion": self.IdUsuarioCreacion,
            "IdUsuarioActualizacion": self.IdUsuarioActualizacion
        }
       