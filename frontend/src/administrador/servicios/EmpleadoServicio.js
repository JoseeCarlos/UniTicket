import axios from 'axios'
export class EmpeladoServicio{

    obtenerEmpleados(){
        return axios.get('assets/demo/data/Empleados.json').then(res => res.data.data);
    } 
    
}