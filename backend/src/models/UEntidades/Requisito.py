class Requisito():
    def __init__(self, IdRequisito=None,Nombre=None, Descripcion=None, Estado=None, FechaCreacion=None, FechaActualizacion=None, IdUsuarioCreacion=None, IdUsuarioActualizacion=None):
        self.IdRequisito = IdRequisito
        self.Nombre = Nombre
        self.Descripcion = Descripcion
        self.Estado = Estado
        self.FechaCreacion = FechaCreacion
        self.FechaActualizacion = FechaActualizacion
        self.IdUsuarioCreacion = IdUsuarioCreacion
        self.IdUsuarioActualizacion = IdUsuarioActualizacion
    
    def to_JSON(self):
        return {
            "IdRequisito": self.IdRequisito,
            "Nombre": self.Nombre,
            "Descripcion": self.Descripcion,
            "Estado": self.Estado,
            "FechaCreacion": self.FechaCreacion,
            "FechaActualizacion": self.FechaActualizacion,
            "IdUsuarioCreacion": self.IdUsuarioCreacion,
            "IdUsuarioActualizacion": self.IdUsuarioActualizacion
        }