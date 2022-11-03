class QuejaS():

    def __init__(self, IdQueja=None, NombreQueja=None, NombreUsuario=None, Descripcion=None, TipoQueja=None, TipoAtencion=None, LugarAtencion=None, FechaInicio=None, FechaFin=None, FechaRegistro=None, NombreEmpleado=None):
        self.IdQueja = IdQueja
        self.NombreQueja = NombreQueja
        self.NombreUsuario = NombreUsuario
        self.Descripcion = Descripcion
        self.TipoQueja = TipoQueja
        self.TipoAtencion = TipoAtencion
        self.LugarAtencion = LugarAtencion
        self.FechaInicio = FechaInicio
        self.FechaFin = FechaFin
        self.FechaRegistro = FechaRegistro
        self.NombreEmpleado = NombreEmpleado

    def to_JSON(self):
        return {
            'IdQueja': self.IdQueja,
            'NombreQueja': self.NombreQueja,
            'NombreUsuario': self.NombreUsuario,
            'Descripcion': self.Descripcion,
            'TipoQueja': self.TipoQueja,
            'TipoAtencion': self.TipoAtencion,
            'LugarAtencion': self.LugarAtencion,
            'FechaInicio': self.FechaInicio,
            'FechaFin': self.FechaFin,
            'FechaRegistro': self.FechaRegistro,
            'NombreEmpleado': self.NombreEmpleado
        }
        