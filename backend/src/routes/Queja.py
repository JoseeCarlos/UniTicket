from flask import Blueprint, jsonify, request
from models.QuejaModelo import QuejaModelo 
from models.UEntidades.Queja import Queja
from models.UEntidades.QuejaEnLinea import QuejaEnLinea
from models.UEntidades.QuejaPresencial import QuejaPresencial
from datetime import datetime

queja = Blueprint('queja', __name__)

@queja.route('/', methods=['GET'])
def obtener_quejas():
    try:
        quejas = QuejaModelo.obtener_quejas()
        return jsonify(quejas)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500


@queja.route('/<int:id>', methods=['GET'])
def obtener_queja(idQueja):
    try:
        queja = QuejaModelo.obtener_queja(idQueja)
        return jsonify(queja)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@queja.route('/add', methods=['POST'])
def crear_queja():
    try:
        queja = Queja(TipoQueja=request.json['TipoQueja'],IdRazonQueja=request.json['IdRazonQueja'], IdAtencion=request.json['IdAtencion'] )
        quejaEnLinea = QuejaEnLinea(IdQueja=request.json['IdQueja'], Descripcion=request.json['Descripcion'], IdUsuarioRegistro=request.json['IdUsuarioRegistro'])
        filas_afectadas = QuejaModelo.crear_queja(queja, quejaEnLinea)
        if filas_afectadas == 0:
            return jsonify({'error': 'Queja no registrada'}), 500
        return jsonify({'message': 'Queja registrada'}), 200
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500

@queja.route('/add/presencial', methods=['POST'])
def crear_queja_presencial():
    try:
        queja = Queja(TipoQueja=request.json['TipoQueja'],IdRazonQueja=request.json['IdRazonQueja'], IdAtencion=request.json['IdAtencion'] )
        quejaPresencial = QuejaPresencial(IdQueja=request.json['IdQueja'], Nombre=request.json['Nombre'], Contacto=request.json['Contacto'])
        filas_afectadas = QuejaModelo.crear_queja_presencial(queja, quejaPresencial)
        if filas_afectadas == 0:
            return jsonify({'error': 'Queja no registrada'}), 500
        return jsonify({'message': 'Queja registrada'}), 200
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500
        


        
