class AttentionPlace_Area():
    def __init__(self,attentionPlaceId=None, areaId=None,startDate=None,finishDate=None ):
        self.attentionPlaceId = attentionPlaceId
        self.areaId = areaId
        self.startDate = startDate
        self.finishDate = finishDate

    
    def to_JSON(self):
        return {
            "attentionPlaceId": self.attentionPlaceId,
            "areaId": self.areaId,
            "startDate": self.startDate,
            "finishDate": self.finishDate
        }
