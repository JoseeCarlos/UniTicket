export class RequisitoServicio{
    obtenerRequisitosTramite(idTramite){
        return fetch('/api/requisito/tramite/'+idTramite).then(res => res.json()).then(data => data);    
    }

}
