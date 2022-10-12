class SelectModel():
    def __init__(self, userId, firstName, firstSurname, secondSurname, email, phoneNumber, role, area):
        self.userId = userId
        self.firstName = firstName
        self.firstSurname = firstSurname
        self.secondSurname = secondSurname
        self.email = email
        self.phoneNumber = phoneNumber
        self.role = role
        self.area = area
    

    def to_JSON(self):
        return {
            'userId': self.userId,
            'firstName': self.firstName,
            'firstSurname': self.firstSurname,
            'secondSurname': self.secondSurname,
            'email': self.email,
            'phoneNumber': self.phoneNumber,
            'role': self.role,
            'area': self.area
        }