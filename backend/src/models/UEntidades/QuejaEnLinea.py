class QuejaEnLinea():
    def __init__(self, IdQueja=None, Descripcion=None, IdUsuarioRegistro=None):
        self.IdQueja = IdQueja
        self.Descripcion = Descripcion
        self.IdUsuarioRegistro = IdUsuarioRegistro
    
    def to_JSON(self):
        return {
            'IdQueja': self.IdQueja,
            'Descripcion': self.Descripcion,
            'IdUsuarioRegistro': self.IdUsuarioRegistro
        }
        
