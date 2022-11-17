class LugarAtencion():
    def __init__(self,IdLugarAtencion=None,Nombre=None,NumeroMaximoReservasPorHora=None, CodigoAccesoAtencion=None, HoraInicioAtencion=None, HoraFinAtencion=None, HoraInicioReceso=None, HoraFinReceso=None, HoraInicioAtencionFinSemana=None, HoraFinAtencionFinSemana=None ,Id_Sitio=None, Id_Sede_Academica=None, IdArea=None, IdUsuarioRegistro=None, Estado=None, FechaRegistro=None, FechaModifacion=None):
        self.IdLugarAtencion = IdLugarAtencion
        self.Nombre = Nombre
        self.NumeroMaximoReservasPorHora = NumeroMaximoReservasPorHora
        self.CodigoAccesoAtencion = CodigoAccesoAtencion
        self.HoraInicioAtencion = HoraInicioAtencion
        self.HoraFinAtencion = HoraFinAtencion
        self.HoraInicioReceso = HoraInicioReceso
        self.HoraFinReceso = HoraFinReceso
        self.HoraInicioAtencionFinSemana = HoraInicioAtencionFinSemana
        self.HoraFinAtencionFinSemana = HoraFinAtencionFinSemana
        self.Id_Sitio = Id_Sitio
        self.Id_Sede_Academica = Id_Sede_Academica
        self.IdArea = IdArea
        self.IdUsuarioRegistro = IdUsuarioRegistro
        self.Estado = Estado
        self.FechaRegistro = FechaRegistro
        self.FechaModifacion = FechaModifacion

    
    def to_JSON(self):
        return {
            'IdLugarAtencion': self.IdLugarAtencion,
            'Nombre': self.Nombre,
            'NumeroMaximoReservasPorHora': self.NumeroMaximoReservasPorHora,
            'CodigoAccesoAtencion': self.CodigoAccesoAtencion,
            'HoraInicioAtencion': self.HoraInicioAtencion,
            'HoraFinAtencion': self.HoraFinAtencion,
            'HoraInicioReceso': self.HoraInicioReceso,
            'HoraFinReceso': self.HoraFinReceso,
            'HoraInicioAtencionFinSemana': self.HoraInicioAtencionFinSemana,
            'HoraFinAtencionFinSemana': self.HoraFinAtencionFinSemana,
            'Id_Sitio': self.Id_Sitio,
            'Id_Sede_Academica': self.Id_Sede_Academica,
            'IdArea': self.IdArea,
            'IdUsuarioRegistro': self.IdUsuarioRegistro,
            'Estado': self.Estado,
            'FechaRegistro': self.FechaRegistro,
            'FechaModifacion': self.FechaModifacion

        }