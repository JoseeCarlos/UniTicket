class RazonQueja():
    def __init__(self, IdRazonQueja=None, Nombre=None, Descripcion=None, Estado=None, FechaCreacion=None, FechaActualizacion=None, IdUsuarioCreacion=None, IdUsuarioModificacion=None):
        self.IdRazonQueja = IdRazonQueja
        self.Nombre = Nombre
        self.Descripcion = Descripcion
        self.Estado = Estado
        self.FechaCreacion = FechaCreacion
        self.FechaActualizacion = FechaActualizacion
        self.IdUsuarioCreacion = IdUsuarioCreacion
        self.IdUsuarioModificacion = IdUsuarioModificacion
    
    def to_JSON(self):
        return {
            "IdRazonQueja": self.IdRazonQueja,
            "Nombre": self.Nombre,
            "Descripcion": self.Descripcion,
            "Estado": self.Estado,
            "FechaCreacion": self.FechaCreacion,
            "FechaActualizacion": self.FechaActualizacion,
            "IdUsuarioCreacion": self.IdUsuarioCreacion,
            "IdUsuarioModificacion": self.IdUsuarioModificacion
        }

    