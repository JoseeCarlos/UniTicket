class User():
    def __init__(self, userId=None, firstName=None, firstSurname=None, secondSurname=None, userName=None, password=None, email=None, role=None,is_active=None, created_at=None, updated_at=None):
        self.userId = userId
        self.firstName = firstName
        self.firstSurname = firstSurname
        self.secondSurname = secondSurname
        self.userName = userName
        self.password = password
        self.email = email
        self.role = role
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at

    
    def to_JSON(self):
        return {
            "userid": self.userid,
            "firstName": self.firstName,
            "firstSurname": self.firstSurname,
            "secondSurname": self.secondSurname,
            "userName": self.userName,
            "password": self.password,
            "email": self.email,
            "role": self.role,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at

        }

