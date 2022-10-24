from flask import jsonify
from database.db import get_connection
from .entities.AttentionPlaceAreaS import AttentionPlaceAreaS
import json

class AttentionPlace_AreaModel():
    @classmethod
    def get_attentionPlaceAreas(self):
        try:
            connection = get_connection()
            attentionPlaceAreas = []
            with connection.cursor() as cursor:
                cursor.execute("""select ap.attentionplaceId,
                                    ap.name attentionPlaceName,
                                    c.name campusName,
                                    c.campusId,
                                    a.name areaName,
                                    a.areaId,
                                    ap.status
                                    from attentionPlace ap
                                    inner join campus c on c.campusId=ap.campusId
                                    inner join attentionplace_area aa on aa.attentionPlaceId=ap.attentionPlaceId
                                    inner join area a on a.areaId=aa.areaId
                                """)
                for row in cursor.fetchall():
                    attentionPlaceAreas.append(AttentionPlaceAreaS(attentionPlaceId=row[0], attentionPlaceName=row[1], campusName=row[2], campusId=row[3], areaName=row[4], areaId=row[5], status=row[6]).to_JSON())
                
            connection.close()
            return attentionPlaceAreas
        except Exception as ex:
            raise Exception(ex)

