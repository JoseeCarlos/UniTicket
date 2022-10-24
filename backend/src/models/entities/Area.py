from utils.DateFormat import DateFormat
class Area():
    def __init__(self,areaId=None,name=None,description=None,numberMaxAtettion=None,status=None,createDate=None,updateDate=None,userIdCreate=None,userIdMod=None):
        self.areaId = areaId
        self.name = name
        self.description = description
        self.numberMaxAtettion = numberMaxAtettion
        self.status = status
        self.createDate = createDate
        self.updateDate = updateDate
        self.userIdCreate = userIdCreate
        self.userIdMod = userIdMod


    def to_JSON(self):
        return {
            "areaId": self.areaId,
            "name": self.name,
            "description": self.description,
            "numberMaxAtettion": self.numberMaxAtettion,
            "status": self.status,
            "createDate": DateFormat.convert_date(self.createDate),
            "updateDate": self.updateDate,
            "userIdCreate": self.userIdCreate,
            "userIdMod": self.userIdMod  
        }

