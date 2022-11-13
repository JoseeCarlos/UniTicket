from flask import Flask, request, jsonify
from unicodedata import name
from flask import Flask
from config import config
from routes import  Queja, Area, TipoAtencion, LugarAtencion, TipoUsuario, LugarAtencionArea, Asignacion, Mesa, Requisito, Tramites, Bitacora, Ticket, Atencion, RazonQueja
app = Flask(__name__)

def page_not_found(e):
    return 'This page does not exist', 404

if __name__ == '__main__':
    app.config.from_object(config['development'])
    
    app.register_blueprint(Queja.queja, name='queja',url_prefix='/api/queja')
    app.register_blueprint(Area.area, name='area',url_prefix='/api/area')
    app.register_blueprint(TipoAtencion.tipoAtencion, name='tipoAtencion',url_prefix='/api/tipoAtencion')
    app.register_blueprint(LugarAtencion.lugarAtencion, name='lugarAtencion',url_prefix='/api/lugarAtencion')
    app.register_blueprint(TipoUsuario.tipoUsuario, name='tipoUsuario',url_prefix='/api/tipoUsuario')
    app.register_blueprint(LugarAtencionArea.lugarAtencionArea, name='lugarAtencionArea',url_prefix='/api/lugarAtencionArea')
    app.register_blueprint(Asignacion.asignacion, name='asignacion',url_prefix='/api/asignacion')
    app.register_blueprint(Mesa.mesa, name='mesa',url_prefix='/api/mesa')
    app.register_blueprint(Requisito.requisito, name='requisito',url_prefix='/api/requisito')
    app.register_blueprint(Tramites.tramite, name='tramite',url_prefix='/api/tramite')
    app.register_blueprint(Bitacora.bitacora, name='bitacora',url_prefix='/api/bitacora')
    app.register_blueprint(Ticket.ticket, name='ticket',url_prefix='/api/ticket')
    app.register_blueprint(Atencion.atencion, name='atencion',url_prefix='/api/atencion')
    app.register_blueprint(RazonQueja.razonQueja, name='razonQueja',url_prefix='/api/razonQueja')

    app.register_error_handler(404, page_not_found)
    app.run(host='0.0.0.0',debug=True,port=5000)
