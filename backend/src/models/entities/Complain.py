class Complain():
    def __init__(self, complainId=None, complainType=None, description=None, complainReasonId=None,attentionId=None,status=None,createDate=None,updateDate=None,userIdCreate=None,userIdMod=None):
        self.complainId = complainId
        self.complainType = complainType
        self.description = description
        self.complainReasonId = complainReasonId
        self.attentionId = attentionId
        self.status = status
        self.createDate = createDate
        self.updateDate = updateDate
        self.userIdCreate = userIdCreate
        self.userIdMod = userIdMod
    
    def to_JSON(self):
        return {
            "complainId": self.complainId,
            "complainType": self.complainType,
            "description": self.description,
            "complainReasonId": self.complainReasonId,
            "attentionId": self.attentionId,
            "status": self.status,
            "createDate": self.createDate,
            "updateDate": self.updateDate,
            "userIdCreate": self.userIdCreate,
            "userIdMod": self.userIdMod
        }