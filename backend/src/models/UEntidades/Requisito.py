class Requisito():
    def __init__(self, IdRequisito=None,Nombre=None, Descripcion=None, IdUsuarioRegistro=None, Estado=None, FechaRegistro=None, FechaModificacion=None):
        self.IdRequisito = IdRequisito
        self.Nombre = Nombre
        self.Descripcion = Descripcion
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion
    
    def to_JSON(self):
        return {
            "IdRequisito": self.IdRequisito,
            "Nombre": self.Nombre,
            "Descripcion": self.Descripcion,
            "IdUsuarioRegistro": self.IdUsuarioRegistro,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion
        }