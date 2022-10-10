class Attention():
    def __init__(self, attentionId=None,startTime=None,finishTime=None,attentionType=None,ticketId=None,employeeId=None,tableId=None,transferId=None,status=None,createDate=None,updateDate=None):
        self.attentionId = attentionId
        self.startTime = startTime
        self.finishTime = finishTime
        self.attentionType = attentionType
        self.ticketId = ticketId
        self.employeeId = employeeId
        self.tableId = tableId
        self.transferId = transferId
        self.status = status
        self.createDate = createDate
        self.updateDate = updateDate

    
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
            "status": self.status,
            "createDate": self.createDate,
            "updateDate": self.updateDate
        }   
    