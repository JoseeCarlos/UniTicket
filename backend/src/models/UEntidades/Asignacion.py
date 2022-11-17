class Asignacion():
    def __init__(self, IdAsignacion=None, IdEmpleado=None,IdMesa=None, FechaInicio=None, FechaFin=None, IdUsuarioRegistro=None,Estado=None, FechaRegistro=None,FechaModificacion=None):
        self.IdAsignacion = IdAsignacion
        self.IdEmpleado = IdEmpleado
        self.IdMesa = IdMesa
        self.FechaInicio = FechaInicio
        self.FechaFin = FechaFin
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion  


    def to_JSON(self):
        return {
            'IdAsignacion': self.IdAsignacion,
            "IdEmpleado": self.IdEmpleado,
            "IdMesa": self.IdMesa,
            "FechaInicio": self.FechaInicio,
            "FechaFin": self.FechaFin,
            "IdUsuarioRegistro": self.IdUsuarioRegistro,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion
        }

   