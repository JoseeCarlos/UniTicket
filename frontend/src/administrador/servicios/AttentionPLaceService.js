export class AttentionPLaceService{
    getAreas(){
        return fetch('/api/attentionPlaceArea/').then(res => res.json()).then(data => data);
    }
    addArea(area){
        return fetch('/api/area/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(area)
        });
    }
}