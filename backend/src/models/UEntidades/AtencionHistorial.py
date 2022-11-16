class AtencionHistorial():

    def __init__(self, IdEmpleado=None, Numero=None, LugarAtencion=None, LugarAtencionDestino=None, AreaDestino=None, Estado=None, FechaRegistro=None, IdUsuarioRegistro=None):
        self.IdEmpleado = IdEmpleado
        self.Numero = Numero
        self.LugarAtencion = LugarAtencion
        self.LugarAtencionDestino = LugarAtencionDestino
        self.AreaDestino = AreaDestino
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.IdUsuarioRegistro = IdUsuarioRegistro
    
    def to_JSON(self):
        return {
            "IdEmpleado": self.IdEmpleado,
            "Numero": self.Numero,
            "LugarAtencion": self.LugarAtencion,
            "LugarAtencionDestino": self.LugarAtencionDestino,
            "AreaDestino": self.AreaDestino,
            "Estado": self.Estado,
            "FechaRegistro": self.FechaRegistro,
            "IdUsuarioRegistro": self.IdUsuarioRegistro
        }