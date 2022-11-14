
class Tramite():
    def __init__(self,IdTramite=None, Nombre=None, Descripcion=None, IdArea=None, IdUsuarioRegistro=None, Estado=None, FechaRegistro=None, FechaModificacion=None, Requisitos=None):
        self.IdTramite = IdTramite
        self.Nombre = Nombre
        self.Descripcion = Descripcion
        self.IdArea = IdArea
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion
        self.Requisitos = Requisitos

    def to_JSON(self):
        return {
            "IdTramite": self.IdTramite,
            "Nombre": self.Nombre,
            "Descripcion": self.Descripcion,
            "IdArea": self.IdArea,
            "IdUsuarioRegistro": self.IdUsuarioRegistro,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion,
            "Requisitos": self.Requisitos

        }

   