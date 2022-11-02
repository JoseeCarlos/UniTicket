class QuejaEnLinea():
    def __init__(self, IdQueja=None, Nombre=None, Contacto=None):
        self.IdQueja = IdQueja
        self.Nombre = Nombre
        self.Contacto = Contacto
    
    def to_JSON(self):
        return {
            "IdQueja": self.IdQueja,
            "Nombre": self.Nombre,
            "Contacto": self.Contacto
        }
        
