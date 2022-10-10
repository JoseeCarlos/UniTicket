class Employee():
    def __init__(self, employeeId=None, ci=None, phoneNumber=None, homeLat=None,homeLon=None,role=None):
        self.employeeId = employeeId
        self.ci = ci
        self.phoneNumber = phoneNumber
        self.homeLat = homeLat
        self.homeLon = homeLon
        self.role = role

    
    def to_JSON(self):
        return {
            "employeeId": self.employeeId,
            "ci": self.ci,
            "phoneNumber": self.phoneNumber,
            "homeLat": self.homeLat,
            "homeLon": self.homeLon,
            "role": self.role
        }
        