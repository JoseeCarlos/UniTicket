import axios from 'axios'
export class SedeAcademicaServicio{
    obtenerSedesAcademicas(){
        return axios.get('assets/demo/data/SedeAcademica.json').then(res => res.data.data);
    } 
}