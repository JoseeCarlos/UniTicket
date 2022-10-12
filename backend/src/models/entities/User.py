class User():
    def __init__(self, userId=None, firstName=None, firstSurname=None, secondSurname=None, userName=None, password=None, email=None, role=None,status=None, createDate=None, updateDate=None, userIdCreate=None, userIdMod=None):
        self.userId = userId
        self.firstName = firstName
        self.firstSurname = firstSurname
        self.secondSurname = secondSurname
        self.userName = userName
        self.password = password
        self.email = email
        self.role = role
        self.status = status
        self.createDate = createDate
        self.updateDate = updateDate
        self.userIdCreate = userIdCreate
        self.userIdMod = userIdMod

    
    def to_JSON(self):
        return {
            "userId": self.userId,
            "firstName": self.firstName,
            "firstSurname": self.firstSurname,
            "secondSurname": self.secondSurname,
            "userName": self.userName,
            "password": self.password,
            "email": self.email,
            "role": self.role,
            "status": self.status,
            "createDate": self.createDate,
            "updateDate": self.updateDate,
            "userIdCreate": self.userIdCreate,
            "userIdMod": self.userIdMod

        }

