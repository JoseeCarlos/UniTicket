class SelectModel():
    def __init__(self, userId=None, firstName=None, firstSurname=None, secondSurname=None, email=None, phoneNumber=None, ci=None, role=None,status=None):
        self.userId = userId
        self.firstName = firstName
        self.firstSurname = firstSurname
        self.secondSurname = secondSurname
        self.email = email
        self.phoneNumber = phoneNumber
        self.ci = ci
        self.role = role
        self.status = status
    

    def to_JSON(self):
        return {
            'userId': self.userId,
            'firstName': self.firstName,
            'firstSurname': self.firstSurname,
            'secondSurname': self.secondSurname,
            'email': self.email,
            'phoneNumber': self.phoneNumber,
            'ci': self.ci,
            'role': self.role,
            'status': self.status
        }