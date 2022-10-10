class City():
    def __init__(self,cityId=None,name=None,latitude=None,longitude=None,is_active=None,created_at=None,updated_at=None):
        self.cityId = cityId
        self.name = name
        self.latitude = latitude
        self.longitude = longitude
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at

    
    def to_JSON(self):
        return {
            "cityId": self.cityId,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
