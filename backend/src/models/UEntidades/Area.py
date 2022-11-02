from utils.DateFormat import DateFormat
class Area():
    def __init__(self,IdArea=None,Nombre=None,Descripcion=None,NumeroMaximoTicketsParaEstudiantes=None, IdUsuarioRegistro=None, Estado=None, FechaRegistro=None, FechaModificacion=None):
        self.IdArea = IdArea
        self.Nombre = Nombre
        self.Descripcion = Descripcion
        self.NumeroMaximoTicketsParaEstudiantes = NumeroMaximoTicketsParaEstudiantes
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion


    def to_JSON(self):
        return {
            "IdArea": self.IdArea,
            "Nombre": self.Nombre,
            "Descripcion": self.Descripcion,
            "NumeroMaximoTicketsParaEstudiantes": self.NumeroMaximoTicketsParaEstudiantes,
            "IdUsuarioRegistro": self.IdUsuarioRegistro,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion
        }