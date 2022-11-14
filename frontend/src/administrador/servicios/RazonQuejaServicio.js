export class RazonQuejaServicio{
    obtenerRazonQuejas(){
        return fetch('/api/razonQueja/').then(res => res.json()).then(data => data);
    }

    crearRazonQueja(razonQueja){
        return fetch('/api/razonQueja/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(razonQueja)
        });
    }

    actualizarRazonQueja(razonQueja){
        return fetch('/api/razonQueja/update/'+razonQueja.IdRazonQueja, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(razonQueja)
        });
    }

    eliminarRazonQueja(idRazonQueja){
        return fetch('/api/razonQueja/delete/'+idRazonQueja, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }
}