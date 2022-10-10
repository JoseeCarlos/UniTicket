class UserType():
    def __init__(self, userTypeId=None, name=None,description=None,status=None,createDate=None,updateDate=None):
        self.userTypeId = userTypeId
        self.name = name
        self.description = description
        self.status = status
        self.createDate = createDate
        self.updateDate = updateDate

    
    def to_JSON(self):
        return {
            "userTypeId": self.userTypeId,
            "name": self.name,
            "description": self.description,
            "status": self.status,
            "createDate": self.createDate,
            "updateDate": self.updateDate
        }

    