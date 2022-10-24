export class TableService {
    getAreas(){
        return fetch('/api/area/').then(res => res.json()).then(data => data);
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

    getTableAreas(id){
        return fetch('/api/table/table_employe/'+id).then(res => res.json()).then(data => data);
    }
}