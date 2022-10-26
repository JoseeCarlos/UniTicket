class Asignacion():
    def __init__(self, IdEmpleado=None,IdMesa=None,Estado=None,FechaCreacion=None,FechaActualizacion=None,IdUsuarioCreacion=None,IdUsuarioActualizacion=None):
        self.IdEmpleado = IdEmpleado
        self.IdMesa = IdMesa
        self.Estado = Estado
        self.FechaCreacion = FechaCreacion
        self.FechaActualizacion = FechaActualizacion
        self.IdUsuarioCreacion = IdUsuarioCreacion
        self.IdUsuarioActualizacion = IdUsuarioActualizacion

    
    def to_JSON(self):
        return {
            "IdEmpleado": self.IdEmpleado,
            "IdMesa": self.IdMesa,
            "Estado": self.Estado,
            "FechaCreacion": self.FechaCreacion,
            "FechaActualizacion": self.FechaActualizacion,
            "IdUsuarioCreacion": self.IdUsuarioCreacion,
            "IdUsuarioActualizacion": self.IdUsuarioActualizacion
        }

   