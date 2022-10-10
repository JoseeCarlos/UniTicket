class Campus():
    def __init__(self, campusId=None,name=None,latitude=None,longitude=None,cityId=None,is_active=None,created_at=None,updated_at=None):
        self.campusId = campusId
        self.name = name
        self.latitude = latitude
        self.longitude = longitude
        self.cityId = cityId
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
    
    def to_JSON(self):
        return {
            "campusId": self.campusId,
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "cityId": self.cityId,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }