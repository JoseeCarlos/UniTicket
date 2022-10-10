class Attention():
    def __init__(self, attentionId=None,startTime=None,finishTime=None,attentionType=None,ticketId=None,employeeId=None,tableId=None,transferId=None,is_active=None,created_at=None,updated_at=None):
        self.attentionId = attentionId
        self.startTime = startTime
        self.finishTime = finishTime
        self.attentionType = attentionType
        self.ticketId = ticketId
        self.employeeId = employeeId
        self.tableId = tableId
        self.transferId = transferId
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
    
    def to_JSON(self):
        return {
            "attentionId": self.attentionId,
            "startTime": self.startTime,
            "finishTime": self.finishTime,
            "attentionType": self.attentionType,
            "ticketId": self.ticketId,
            "employeeId": self.employeeId,
            "tableId": self.tableId,
            "transferId": self.transferId,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }   
    