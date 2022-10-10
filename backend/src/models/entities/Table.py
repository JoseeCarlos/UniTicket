class Table():
    def __init__(self, tableId=None,number=None,attentionPlaceId=None,areaId=None,status=None,createDate=None,updateDate=None):
        self.tableId = tableId
        self.number = number
        self.attentionPlaceId = attentionPlaceId
        self.areaId = areaId
        self.status = status
        self.createDate = createDate
        self.updateDate = updateDate
    
    def to_JSON(self):
        return {
            "tableId": self.tableId,
            "number": self.number,
            "attentionPlaceId": self.attentionPlaceId,
            "areaId": self.areaId,
            "status": self.status,
            "createDate": self.createDate,
            "updateDate": self.updateDate
            
        }
       