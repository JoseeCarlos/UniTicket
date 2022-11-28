export class RazonQuejaServicio {
    obtenerRazonesQueja() {
        return fetch('/api/razonQueja/').then(res => res.json()).then(data => data);
    }
}