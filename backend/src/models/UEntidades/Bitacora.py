class Bitacora():
    def __init__(self, IdBitacora=None,Descripcion=None,IdUsuarioRegistro=None,Estado=None,FechaRegistro=None,FechaModificacion=None):
        self.IdBitacora = IdBitacora
        self.Descripcion = Descripcion
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion
    
    def to_JSON(self):
        return {
            "IdBitacora": self.IdBitacora,
            "Descripcion": self.Descripcion,
            "IdUsuarioRegistro": self.IdUsuarioRegistro,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion
        }


         