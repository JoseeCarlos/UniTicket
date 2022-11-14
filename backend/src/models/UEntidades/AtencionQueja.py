class AtencionQueja():
    def __init__(self, IdAtencion=None, NombreLugar=None, NumeroMesa=None, FechaRegistro=None):
        self.IdAtencion = IdAtencion
        self.NombreLugar = NombreLugar
        self.NumeroMesa = NumeroMesa
        self.FechaRegistro = FechaRegistro

    def to_JSON(self):
        return {
            "IdAtencion": self.IdAtencion,
            "Atenciones": "Nombre Lugar: "+ self.NombreLugar + " Mesa:" + str(self.NumeroMesa) + " Fecha:" + str(self.FechaRegistro)  

        }