class Turno:
    def __init__(self, IdTurno, IdAsignacion, HoraInicio, HoraFin, IdUsuarioRegistro, Estado, FechaRegistro, FechaModificacion):
        self.IdTurno = IdTurno
        self.IdAsignacion = IdAsignacion
        self.HoraInicio = HoraInicio
        self.HoraFin = HoraFin
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModificacion = FechaModificacion

    def to_JSON(self):
        return {
            'IdTurno': self.IdTurno,
            'IdAsignacion': self.IdAsignacion,
            'HoraInicio': self.HoraInicio,
            'HoraFin': self.HoraFin,
            'IdUsuarioRegistro': self.IdUsuarioRegistro,
            'Estado': self.Estado,
            'FechaRegistro': self.FechaRegistro,
            'FechaModificacion': self.FechaModificacion
        }