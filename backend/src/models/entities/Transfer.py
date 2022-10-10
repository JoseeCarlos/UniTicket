class Transfer():
    def __init__(self, transferId=None,transferTime=None,ticketId=None,originEmployeeId=None,originTableId=None,destinationAttentionPlaceId=None,destinationAreaId=None):
        self.transferId = transferId
        self.transferTime = transferTime
        self.ticketId = ticketId
        self.originEmployeeId = originEmployeeId
        self.originTableId = originTableId
        self.destinationAttentionPlaceId = destinationAttentionPlaceId
        self.destinationAreaId = destinationAreaId
    
    def to_JSON(self):
        return {
            "transferId": self.transferId,
            "transferTime": self.transferTime,
            "ticketId": self.ticketId,
            "originEmployeeId": self.originEmployeeId,
            "originTableId": self.originTableId,
            "destinationAttentionPlaceId": self.destinationAttentionPlaceId,
            "destinationAreaId": self.destinationAreaId
        }
        