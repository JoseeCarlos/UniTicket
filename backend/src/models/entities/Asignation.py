class Asignation():
    def __init__(self, employeeId=None,tableId=None,startDate=None,finishDate=None):
        self.employeeId = employeeId
        self.tableId = tableId
        self.startDate = startDate
        self.finishDate = finishDate

    
    def to_JSON(self):
        return {
            "employeeId": self.employeeId,
            "tableId": self.tableId,
            "startDate": self.startDate,
            "finishDate": self.finishDate
        }

   