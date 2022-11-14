class Asignacion():
    def __init__(self, IdEmpleado=None,IdMesa=None, IdUsuarioRegistro=None,Estado=None, FechaRegistro=None,FechaModificacion=None):
        self.IdEmpleado = IdEmpleado
        self.IdMesa = IdMesa
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion  


    def to_JSON(self):
        return {
            "IdEmpleado": self.IdEmpleado,
            "IdMesa": self.IdMesa,
            "IdUsuarioRegistro": self.IdUsuarioRegistro,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion
        }

   