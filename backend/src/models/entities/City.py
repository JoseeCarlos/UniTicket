class City():
    def __init__(self,cityId=None,name=None,latitude=None,longitude=None,status=None,createDate=None,updateDate=None):
        self.cityId = cityId
        self.name = name
        self.latitude = latitude
        self.longitude = longitude
        self.status = status
        self.createDate = createDate
        self.updateDate = updateDate

    
    def to_JSON(self):
        return {
            "cityId": self.cityId,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "status": self.status,
            "createDate": self.createDate,
            "updateDate": self.updateDate
        }
