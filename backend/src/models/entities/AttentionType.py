class AttentionType():
    def __init__(self, attentionTypeId=None, name=None,importance=None,is_active=None,created_at=None,updated_at=None):
        self.attentionTypeId = attentionTypeId
        self.name = name
        self.importance = importance
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
        
    
    def to_JSON(self):
        return {
            "attentionTypeId": self.attentionTypeId,
            "name": self.name,
            "importance": self.importance,
            "is_active": self.is_active,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }