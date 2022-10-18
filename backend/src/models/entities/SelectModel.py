from utils.DateFormat import DateFormat
class SelectModel():
    def __init__(self, userId=None, firstName=None, firstSurname=None, secondSurname=None, email=None, ci=None, phoneNumber=None, homeLat=None, homeLon=None, role=None,status=None, updateDate=None, userIdMod=None):
        self.userId = userId
        self.firstName = firstName
        self.firstSurname = firstSurname
        self.secondSurname = secondSurname
        self.email = email
        self.ci = ci
        self.phoneNumber = phoneNumber
        self.homeLat = homeLat
        self.homeLon = homeLon
        self.role = role
        self.status = status
        self.updateDate = updateDate
        self.userIdMod = userIdMod
    

    def to_JSON(self):
        return {
            'userId': self.userId,
            'firstName': self.firstName,
            'firstSurname': self.firstSurname,
            'secondSurname': self.secondSurname,
            'email': self.email,
            'ci': self.ci,
            'phoneNumber': self.phoneNumber,
            'homeLat': self.homeLat,
            'homeLon': self.homeLon,
            'role': self.role,
            'status': self.status,
            'updateDate': DateFormat.convert_date(self.updateDate),
            'userIdMod': self.userIdMod
        }