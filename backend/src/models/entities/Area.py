class Area():
    def __init__(self,areaId=None,name=None,description=None,status=None,createDate=None,updateDate=None):
        self.areaId = areaId
        self.name = name
        self.description = description
        self.status = status
        self.createDate = createDate
        self.updateDate = updateDate


    def to_JSON(self):
        return {
            "areaId": self.areaId,
            "name": self.name,
            "description": self.description,
            "status": self.status,
            "createDate": self.createDate,
            "updateDate": self.updateDate
        }

