class Mesa():
    def __init__(self, IdMesa=None, Numero=None, IdLugarAtencion=None, IdUsuarioRegistro=None, Estado=None, FechaRegistro=None, FechaModificacion=None):
        self.IdMesa = IdMesa
        self.Numero = Numero
        self.IdLugarAtencion = IdLugarAtencion
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion

    def to_JSON(self):
        return {
            "IdMesa": self.IdMesa,
            "Numero": self.Numero,
            "IdLugarAtencion": self.IdLugarAtencion,
            "IdUsuarioRegistro": self.IdUsuarioRegistro,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion
        }
       