export class AreaService{
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

    updateArea(area){
        return fetch('/api/area/update/'+area.IdArea,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(area)
        });

    }
    
    deleteArea(id){
        return fetch('/api/area/delete/'+id,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }).then(res => res.json()).then(data => data);
    }

}