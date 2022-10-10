class Campus():
    def __init__(self, campusId=None,name=None,latitude=None,longitude=None,cityId=None,status=None,createDate=None,updateDate=None):
        self.campusId = campusId
        self.name = name
        self.latitude = latitude
        self.longitude = longitude
        self.cityId = cityId
        self.status = status
        self.createDate = createDate
        self.updateDate = updateDate
    
    def to_JSON(self):
        return {
            "campusId": self.campusId,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "cityId": self.cityId,
            "status": self.status,
            "createDate": self.createDate,
            "updateDate": self.updateDate
        }