class TipoUsuario():
    def __init__(self, idTipoUsuario=None, Nombre=None, Descripcion=None, IdUsuarioRegistro=None, Estado=None, FechaRegistro=None, FechaModificacion=None):
        self.idTipoUsuario = idTipoUsuario
        self.Nombre = Nombre
        self.Descripcion = Descripcion
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion
    
    def to_JSON(self):
        return {
            "idTipoUsuario": self.idTipoUsuario,
            "Nombre": self.Nombre,
            "Descripcion": self.Descripcion,
            "IdUsuarioRegistro": self.IdUsuarioRegistro,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion
        }