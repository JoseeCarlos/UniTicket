from utils.DateFormat import DateFormat
class Area():
    def __init__(self,IdArea=None,Nombre=None,descripcion=None,NumeroMaximoTicketsParaEstudiantes=None,estado=None,fechaCreacion=None,fechaActualizacion=None,IdUsuarioCreacion=None,IdUsuarioActualizacion=None):
        self.IdArea = IdArea,
        self.Nombre = Nombre,
        self.descripcion = descripcion,
        self.NumeroMaximoTicketsParaEstudiantes = NumeroMaximoTicketsParaEstudiantes,
        self.estado = estado,
        self.fechaCreacion = fechaCreacion,
        self.fechaActualizacion = fechaActualizacion,
        self.IdUsuarioCreacion = IdUsuarioCreacion,
        self.IdUsuarioActualizacion = IdUsuarioActualizacion


    def to_JSON(self):
        return {
            "IdArea": self.IdArea,
            "Nombre": self.Nombre,
            "descripcion": self.descripcion,
            "NumeroMaximoTicketsParaEstudiantes": self.NumeroMaximoTicketsParaEstudiantes,
            "estado": self.estado,
            "fechaCreacion": DateFormat.convert_date(self.fechaCreacion),
            "fechaActualizacion": self.fechaActualizacion,
            "IdUsuarioCreacion": self.IdUsuarioCreacion,
            "IdUsuarioActualizacion": self.IdUsuarioActualizacion
        }