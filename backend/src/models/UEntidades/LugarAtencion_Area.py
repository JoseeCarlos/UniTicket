class LugarAtencion_Area():
    def __init__(self, IdLugarAtencion=None, Nombre=None,IdSedeAcademica=None,IdSitio=None,NombreArea=None, IdArea=None, Estado=None, Mesas=None):
        self.IdLugarAtencion = IdLugarAtencion
        self.Nombre = Nombre
        self.IdSedeAcademica = IdSedeAcademica
        self.IdSitio = IdSitio
        self.NombreArea = NombreArea
        self.IdArea = IdArea
        self.Estado = Estado
        self.Mesas = Mesas
    
    def to_JSON(self):
        return {
            'IdLugarAtencion': self.IdLugarAtencion,
            'Nombre': self.Nombre,
            'IdSedeAcademica': self.IdSedeAcademica,
            'IdSitio': self.IdSitio,
            'NombreArea': self.NombreArea,
            'IdArea': self.IdArea,
            'Estado': self.Estado,
            'Mesas': self.Mesas
        }
