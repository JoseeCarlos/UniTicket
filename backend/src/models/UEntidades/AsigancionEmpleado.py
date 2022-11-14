class AsignacionEmpleado():

    def __init__(self, IdEmpleado=None,NombreArea=None, NombreLugarAtencion=None, IdMesa=None, TipoAtencion=None, Numero=None, FechaRegistro=None, FechaModificacion=None):
        self.IdEmpleado = IdEmpleado
        self.NombreArea = NombreArea
        self.NombreLugarAtencion = NombreLugarAtencion
        self.IdMesa = IdMesa
        self.TipoAtencion = TipoAtencion
        self.Numero = Numero
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion

    def to_JSON(self):
        return {
            "IdEmpleado": self.IdEmpleado,
            "NombreArea": self.NombreArea,
            "NombreLugarAtencion": self.NombreLugarAtencion,
            "IdMesa": self.IdMesa,
            "TipoAtencion": self.TipoAtencion,
            "Numero": self.Numero,
            "FechaRegistro": self.FechaRegistro,
            "FechaRegistro": self.FechaRegistro,
            "FechaModificacion": self.FechaModificacion
        }