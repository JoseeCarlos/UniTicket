class Ticket():
    def __init__(self,ticketId=None, number=None,generatedTime=None,ticketType=None,attentionTypeId=None,userTypeId=None,attentionPlaceId=None,areaId=None,status=None,createdDate=None,updatedDate=None,userIdCreate=None,userIdMod=None):
        self.ticketId = ticketId
        self.number = number
        self.generatedTime = generatedTime
        self.ticketType = ticketType
        self.attentionTypeId = attentionTypeId
        self.userTypeId = userTypeId
        self.attentionPlaceId = attentionPlaceId
        self.areaId = areaId
        self.status = status
        self.createdDate = createdDate
        self.updatedDate = updatedDate
        self.userIdCreate = userIdCreate
        self.userIdMod = userIdMod
    
    def to_JSON(self):
        return {
            "ticketId": self.ticketId,
            "number": self.number,
            "generatedTime": self.generatedTime,
            "ticketType": self.ticketType,
            "attentionTypeId": self.attentionTypeId,
            "userTypeId": self.userTypeId,
            "attentionPlaceId": self.attentionPlaceId,
            "areaId": self.areaId,
            "status": self.status,
            "createdDate": self.createdDate,
            "updatedDate": self.updatedDate,
            "userIdCreate": self.userIdCreate,
            "userIdMod": self.userIdMod
        }