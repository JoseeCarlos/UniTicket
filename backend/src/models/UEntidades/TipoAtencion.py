class TipoAtencion():
    def __init__(self, IdTipoAtencion=None, Nombre=None,importancia=None,Estado=None,FechaCreacion=None,FechaActualizacion=None, IdUsuarioCreacion=None, IdUsuarioActualizacion=None):
        self.IdTipoAtencion = IdTipoAtencion
        self.Nombre = Nombre
        self.importancia = importancia
        self.Estado = Estado
        self.FechaCreacion = FechaCreacion
        self.FechaActualizacion = FechaActualizacion
        self.IdUsuarioCreacion = IdUsuarioCreacion
        self.IdUsuarioActualizacion = IdUsuarioActualizacion
        
    
    def to_JSON(self):
        return {
            "IdTipoAtencion": self.IdTipoAtencion,
            "Nombre": self.Nombre,
            "importancia": self.importancia,
            "Estado": self.Estado,
            "FechaCreacion": self.FechaCreacion,
            "FechaActualizacion": self.FechaActualizacion,
            "IdUsuarioCreacion": self.IdUsuarioCreacion,
            "IdUsuarioActualizacion": self.IdUsuarioActualizacion
        }