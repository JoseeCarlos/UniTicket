class EquipoAtencion():

    def __init__(self, IdEquipoAtencion=None, Ip=None, NombreEquipo=None, Mac=None, IdLugarAtencion=None, Funcion=None, IdUsuarioRegistro=None, Estado=None, FechaRegistro=None, FechaModificacion=None):
        self.IdEquipoAtencion = IdEquipoAtencion
        self.Ip = Ip
        self.Nombre = NombreEquipo
        self.Mac = Mac
        self.IdLugarAtencion = IdLugarAtencion
        self.Funcion = Funcion
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion

    
    def to_JSON(self):
        return {
            'IdEquipoAtencion': self.IdEquipoAtencion,
            'Ip': self.Ip,
            'Nombre': self.Nombre,
            'Mac': self.Mac,
            'IdLugarAtencion': self.IdLugarAtencion,
            'Funcion': self.Funcion,
            'IdUsuarioRegistro': self.IdUsuarioRegistro,
            'Estado': self.Estado,
            'FechaRegistro': self.FechaRegistro,
            'FechaModificacion': self.FechaModificacion
        }