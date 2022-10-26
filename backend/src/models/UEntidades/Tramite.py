class Tramite():
    def __init__(self,IdTramite=None, Nombre=None, Descripcion=None, IdArea=None, Estado=None, FechaCreacion=None, FechaActualizacion=None, idUsuarioCreacion=None, IdUsuarioActualizacion=None):
        self.IdTramite = IdTramite
        self.Nombre = Nombre
        self.Descripcion = Descripcion
        self.IdArea = IdArea
        self.Estado = Estado
        self.FechaCreacion = FechaCreacion
        self.FechaActualizacion = FechaActualizacion
        self.idUsuarioCreacion = idUsuarioCreacion
        self.IdUsuarioActualizacion = IdUsuarioActualizacion

    def to_JSON(self):
        return {
            "IdTramite": self.IdTramite,
            "Nombre": self.Nombre,
            "Descripcion": self.Descripcion,
            "IdArea": self.IdArea,
            "Estado": self.Estado,
            "FechaCreacion": self.FechaCreacion,
            "FechaActualizacion": self.FechaActualizacion,
            "idUsuarioCreacion": self.idUsuarioCreacion,
            "IdUsuarioActualizacion": self.IdUsuarioActualizacion
        }