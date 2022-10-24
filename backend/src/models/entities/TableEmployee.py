class TableEmployee():
    def __init__(self, tableId=None, number=None, employeeName=None, status=None, employeeId=None):
        self.tableId = tableId
        self.number = number
        self.employeeName = employeeName
        self.status = status
        self.employeeId = employeeId

    def to_JSON(self):
        return {
            "tableId": self.tableId,
            "number": self.number,
            "employeeName": self.employeeName,
            "status": self.status,
            "employeeId": self.employeeId
        }