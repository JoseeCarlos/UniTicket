export class TramiteServicio{
    obtenerTramites(){
         return fetch('/api/tramite/').then(res => res.json()).then(data => data);
    }
}