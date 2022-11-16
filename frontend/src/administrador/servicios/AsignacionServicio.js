export class AsignacionServicio{
    obtenerAsignaciones(){
        return fetch('/api/asignacion/').then(res => res.json()).then(data => data);
    }
    agregarAsignacion(asignacion){
        return fetch('/api/asignacion/add',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(asignacion)
        }).then(res => res.json()).then(data => data);
    }
}