from utils.DateFormat import DateFormat
class Campus():
    def __init__(self, campusId=None,name=None,description=None, latitude=None,longitude=None,cityId=None,status=None,createDate=None,updateDate=None,userIdCreate=None,userIdMod=None):
        self.campusId = campusId
        self.name = name
        self.description = description
        self.latitude = latitude
        self.longitude = longitude
        self.cityId = cityId
        self.status = status
        self.createDate = createDate
        self.updateDate = updateDate
        self.userIdCreate = userIdCreate
        self.userIdMod = userIdMod

    
    def to_JSON(self):
        return {
            "campusId": self.campusId,
            "name": self.name,
            "description": self.description,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "cityId": self.cityId,
            "status": self.status,
            "createDate": DateFormat.convert_date(self.createDate),
            "updateDate": self.updateDate,
            "userIdCreate": self.userIdCreate,
            "userIdMod": self.userIdMod
        }