class TramiteRequisito():
    def __init__(self, IdTramite=None,IdRequisito=None):
        self.IdTramite = IdTramite
        self.IdRequisito = IdRequisito

    def to_JSON(self):
        return {
            "IdTramite": self.IdTramite,
            "IdRequisito": self.IdRequisito
        }
        

    