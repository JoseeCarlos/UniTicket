class LeyendaVistaAtencion():

    def __init__(self, IdLeyendaVistaAtencion=None, IdSedeAcademica=None, Leyenda=None, Estado=None):
        self.IdLeyendaVistaAtencion = IdLeyendaVistaAtencion
        self.IdSedeAcademica = IdSedeAcademica
        self.Leyenda = Leyenda
        self.Estado = Estado
    
    def to_JSON(self):
        return {
            "IdLeyendaVistaAtencion": self.IdLeyendaVistaAtencion,
            "IdSedeAcademica": self.IdSedeAcademica,
            "Leyenda": self.Leyenda,
            "Estado": self.Estado
        }
