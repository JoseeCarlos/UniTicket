export class AsignacionServicio{
    obtenerAsignaciones(){
        return fetch('/api/asignacion/').then(res => res.json()).then(data => data);
    }
    agregarAsignacion(asignacion){
        return fetch('/api/asignacion/add',{
            method: 'POST',
            body: JSON.stringify(asignacion),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => data);
    }
}