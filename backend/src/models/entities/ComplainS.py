class ComplainS():
    def __init__(self, complainId=None, userName=None, name=None, description=None, complainType=None, attentionType=None, tableName=None, startTime=None, finishTime=None, createDate=None, employeeName=None):
        self.complainId = complainId
        self.userName = userName
        self.name = name
        self.description = description
        self.complainType = complainType
        self.attentionType = attentionType
        self.tableName = tableName
        self.startTime = startTime
        self.finishTime = finishTime
        self.createDate = createDate
        self.employeeName = employeeName


    def to_JSON(self):
        return {
            "complainId": self.complainId,
            "userName": self.userName,
            "name": self.name,
            "description": self.description,
            "complainType": self.complainType,
            "attentionType": self.attentionType,
            "tableName": self.tableName,
            "startTime": self.startTime,
            "finishTime": self.finishTime,
            "createDate": self.createDate,
            "employeeName": self.employeeName
        }
        