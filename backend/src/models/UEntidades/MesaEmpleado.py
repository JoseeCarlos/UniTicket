class MesaEmpleado():
    def __init__(self, IdMesa=None, Numero=None, NombreEmpleado=None, Estado=None, IdEmpleado=None):
        self.IdMesa = IdMesa
        self.Numero = Numero
        self.NombreEmpleado = NombreEmpleado
        self.Estado = Estado
        self.IdEmpleado = IdEmpleado
       
    def to_JSON(self):
        return {
            "IdMesa": self.IdMesa,
            "Numero": self.Numero,
            "NombreEmpleado": self.NombreEmpleado,
            "Estado": self.Estado,
            "IdEmpleado": self.IdEmpleado
        }