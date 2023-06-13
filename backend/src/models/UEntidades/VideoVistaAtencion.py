class VideoVistaAtencion():

    def __init__(self, IdVideoVistaAtencion=None, IdSedeAcademica=None, Url=None, Estado=None):
        self.IdVideoVistaAtencion = IdVideoVistaAtencion
        self.IdSedeAcademica = IdSedeAcademica
        self.Url = Url
        self.Estado = Estado

    def to_JSON(self):
        return {
            "IdVideoVistaAtencion": self.IdVideoVistaAtencion,
            "IdSedeAcademica": self.IdSedeAcademica,
            "Url": self.Url,
            "Estado": self.Estado
        }