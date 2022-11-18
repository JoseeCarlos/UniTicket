export class InicioSesionServicio {

  obtenerImagenes() {
      return fetch('json/imagenesUnivalle.json').then(res => res.json()).then(d => d.data);
  }
}