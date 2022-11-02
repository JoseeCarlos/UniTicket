class Queja():
    def __init__(self, IdQueja=None, TipoQueja=None, IdRazonQueja=None, IdAtencion=None, Estado=None, FechaRegistro=None, FechaModificacion=None):
        self.IdQueja = IdQueja
        self.TipoQueja = TipoQueja
        self.IdRazonQueja = IdRazonQueja
        self.IdAtencion = IdAtencion
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion
    
    def to_JSON(self):
        return {
            "IdQueja": self.IdQueja,
            "TipoQueja": self.TipoQueja,
            "IdRazonQueja": self.IdRazonQueja,
            "IdAtencion": self.IdAtencion,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion
        }