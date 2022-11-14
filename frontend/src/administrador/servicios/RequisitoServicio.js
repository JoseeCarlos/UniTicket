export class RequisitoServicio{
    obtenerRequisitos(){
        return fetch('/api/requisito/').then(res => res.json()).then(data => data);
    }
    crearRequisito(requisito){
        return fetch('/api/requisito/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requisito)
        });
    }
    actualizarRequisito(requisito){
        return fetch('/api/requisito/update/'+requisito.IdRequisito, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requisito)
        });
    }
    eliminarRequisito(idRequisito){
        return fetch('/api/requisito/delete/'+idRequisito, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}