from flask import Flask, request, jsonify
from unicodedata import name
from flask import Flask
from config import config
from routes import Employee, City, Campus, Complain, Area, AttentionPlaceArea, Table, TipoAtencion, LugarAtencion, TipoUsuario

app = Flask(__name__)

def page_not_found(e):
    return 'This page does not exist', 404

if __name__ == '__main__':
    app.config.from_object(config['development'])

    app.register_blueprint(Employee.main, name='employee',url_prefix='/api/employee')
    app.register_blueprint(City.city, name='city',url_prefix='/api/city')
    app.register_blueprint(Campus.campus, name='campus',url_prefix='/api/campus')
    app.register_blueprint(Complain.complain, name='complain',url_prefix='/api/complain')
    app.register_blueprint(Area.area, name='area',url_prefix='/api/area')
    app.register_blueprint(AttentionPlaceArea.attentionPlaceArea, name='attentionPlaceArea',url_prefix='/api/attentionPlaceArea')
    app.register_blueprint(Table.table, name='table',url_prefix='/api/table')


    app.register_blueprint(TipoAtencion.tipoAtencion, name='tipoAtencion',url_prefix='/api/tipoAtencion')
    app.register_blueprint(LugarAtencion.lugarAtencion, name='lugarAtencion',url_prefix='/api/lugarAtencion')
    app.register_blueprint(TipoUsuario.tipoUsuario, name='tipoUsuario',url_prefix='/api/tipoUsuario')
    
    app.register_error_handler(404, page_not_found)
    app.run(host='0.0.0.0',debug=True,port=5000)
