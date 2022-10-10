class Table():
    def __init__(self, tableId=None,number=None,attentionPlaceId=None,areaId=None,is_active=None,created_at=None,updated_at=None):
        self.tableId = tableId
        self.number = number
        self.attentionPlaceId = attentionPlaceId
        self.areaId = areaId
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
    
    def to_JSON(self):
        return {
            "tableId": self.tableId,
            "number": self.number,
            "attentionPlaceId": self.attentionPlaceId,
            "areaId": self.areaId,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
       