class AttentionPlaceAreaS():
    def __init__(self,attentionPlaceId=None, attentionPlaceName=None, campusName=None, campusId=None, areaName=None, areaId=None,status=None ):
        self.attentionPlaceId = attentionPlaceId
        self.attentionPlaceName = attentionPlaceName
        self.campusName = campusName
        self.campusId = campusId
        self.areaName = areaName
        self.areaId = areaId
        self.status = status
        

    def to_JSON(self):
        return {
            "attentionPlaceId": self.attentionPlaceId,
            "attentionPlaceName": self.attentionPlaceName,
            "campusName":self.campusName,
            "campusId":self.campusId,
            "areaName": self.areaName,
            "areaId": self.areaId,
            "status": self.status
        }