class Queja():
    def __init__(self, IdQueja=None, TipoQueja=None, Descripcion=None, Nombre=None,Contacto=None,IdRazonQueja=None,IdAtencion=None,Estado=None,FechaCreacion=None,FechaActualizacion=None, IdUsuarioCreacion=None, IdUsuarioActualizacion=None):
        self.IdQueja = IdQueja
        self.TipoQueja = TipoQueja
        self.Descripcion = Descripcion
        self.Nombre = Nombre
        self.Contacto = Contacto
        self.IdRazonQueja = IdRazonQueja
        self.IdAtencion = IdAtencion
        self.Estado = Estado
        self.FechaCreacion = FechaCreacion
        self.FechaActualizacion = FechaActualizacion
        self.IdUsuarioCreacion = IdUsuarioCreacion
        self.IdUsuarioActualizacion = IdUsuarioActualizacion
    
    def to_JSON(self):
        return {
            "IdQueja": self.IdQueja,
            "TipoQueja": self.TipoQueja,
            "Descripcion": self.Descripcion,
            "Nombre": self.Nombre,
            "Contacto": self.Contacto,
            "IdRazonQueja": self.IdRazonQueja,
            "IdAtencion": self.IdAtencion,
            "Estado": self.Estado,
            "FechaCreacion": self.FechaCreacion,
            "FechaActualizacion": self.FechaActualizacion,
            "IdUsuarioCreacion": self.IdUsuarioCreacion,
            "IdUsuarioActualizacion": self.IdUsuarioActualizacion
        }