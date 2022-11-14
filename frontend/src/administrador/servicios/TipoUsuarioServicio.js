export class TipoUsuarioServicio{
    obtenerTipoUsuario(){
        return fetch('/api/tipoUsuario/').then(res => res.json()).then(data => data);
    }
    crearTipoUsuario(tipoUsuario){
        return fetch('/api/tipoUsuario/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tipoUsuario)
        });
    }
    actualizarTipoUsuario(tipoUsuario){
        return fetch('/api/tipoUsuario/update/'+tipoUsuario.idTipoUsuario, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tipoUsuario)
        });
    }
    eliminarTipoUsuario(idTipoUsuario){
        return fetch('/api/tipoUsuario/delete/'+idTipoUsuario, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}