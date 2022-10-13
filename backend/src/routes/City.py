from flask import Blueprint, jsonify, request
from models.CityModel import CityModel 
from models.entities.City import City

city = Blueprint('city', __name__)

@city.route('/', methods=['GET'])
def get_cities():
    try:
        cities = CityModel.get_cities()
        return jsonify(cities)
    except Exception as ex:
        return jsonify({'error': str(ex)}), 500