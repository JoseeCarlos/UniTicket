class EquipoAtencion():

    def __init__(self, idEquipoAtencion=None, Ip=None, Nombre=None, Mac=None, IdLugarAtencion=None):
        self.idEquipoAtencion = idEquipoAtencion
        self.Ip = Ip
        self.Nombre = Nombre
        self.Mac = Mac
        self.IdLugarAtencion = IdLugarAtencion

    
    def to_JSON(self):
        return {
            "idEquipoAtencion": self.idEquipoAtencion,
            "Ip": self.Ip,
            "Nombre": self.Nombre,
            "Mac": self.Mac,
            "IdLugarAtencion": self.IdLugarAtencion
        }
        