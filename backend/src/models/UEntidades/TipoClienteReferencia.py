class TipoClienteReferencia:
    def __init__(self, IdTipoClienteReferencia, Nombre, Importancia, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion):
        self.IdTipoClienteReferencia = IdTipoClienteReferencia
        self.Nombre = Nombre
        self.Importancia = Importancia
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion

    def to_JSON(self):
        return {
            'IdTipoClienteReferencia': self.IdTipoClienteReferencia,
            'Nombre': self.Nombre,
            'Importancia': self.Importancia,
            'IdUsuarioRegistro': self.IdUsuarioRegistro,
            'Estado': self.Estado,
            'FechaRegistro': self.FechaRegistro,
            'FechaModificacion': self.FechaModificacion
        }