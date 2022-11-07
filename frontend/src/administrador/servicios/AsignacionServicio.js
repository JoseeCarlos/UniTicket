export class AsignacionServicio{
    obtenerAsignaciones(){
        return fetch('/api/asignacion/').then(res => res.json()).then(data => data);
    }
}