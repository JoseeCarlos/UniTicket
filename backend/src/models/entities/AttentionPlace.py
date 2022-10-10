class AttentionPlace():
    def __init__(self,attentionPlaceId=None,name=None,campusId=None,status=None,createDate=None,updateDate=None):
        self.attentionPlaceId = attentionPlaceId
        self.name = name
        self.campusId = campusId
        self.status = status
        self.createDate = createDate
        self.updateDate = updateDate

    
    def to_JSON(self):
        return {
            "attentionPlaceId": self.attentionPlaceId,
            "name": self.name,
            "campusId": self.campusId,
            "status": self.status,
            "createDate": self.createDate,
            "updateDate": self.updateDate

        }