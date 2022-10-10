class OnlineTicket():
    def __init__(self,ticketId=None,reservationTime=None,userId=None ):
        self.ticketId = ticketId
        self.reservationTime = reservationTime
        self.userId = userId
    
    def to_JSON(self):
        return {
            "ticketId": self.ticketId,
            "reservationTime": self.reservationTime,
            "userId": self.userId
        }