export class FotoServicio {

  getImages() {
      return fetch('assets/demo/data/photos.json').then(res => res.json())
              .then(d => d.data);
  }
}