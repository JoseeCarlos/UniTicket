export class QuejasServicio{

    obtenerRazonQuejas(){
        return fetch('/api/razonQueja/').then(res => res.json()).then(data => data);
    }
    
    crearQueja(queja){
        return fetch('/api/queja/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(queja)
        });
    }

}