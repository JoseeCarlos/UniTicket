from flask import Flask, request, jsonify
from unicodedata import name
from flask import Flask
from config import config
from routes import  Queja, Area, TipoAtencion, LugarAtencion, TipoUsuario, LugarAtencionArea, Asignacion, Mesa, Requisito, Tramites, Bitacora, Ticket, Atencion, RazonQueja
from flask_socketio import SocketIO,send
app = Flask(__name__)

app.config['SECRET_KEY']='secret'
socketio=SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")
lugaresAtencion=[]
colasTickets=[]

def obtenerCola(idLugarAtencion):
    i=0
    for cola in colasTickets:
        if cola['idLugarAtencion']==idLugarAtencion:
            return i
        else:
            i=i+1

def obtenerSiguienteTicket(idLugarAtencion):
    return {'ticket':'nuevoticket'}
#busca aquello que te hace feliz
@socketio.on('siguienteTicket')
def handleMessage(msg):
    print(" Sid: "+msg['sid'],'id : ',msg['idLugarAtencion'])
    #socketio.emit('siguienteTicket',obtenerSiguienteTicket(msg['idLugarAtencion']),room=msg['sid'])
    socketio.emit('siguienteTicket',msg['idLugarAtencion'],room=msg['sid'])
    actualizarCola(msg['idLugarAtencion'])

@socketio.on('nuevoTicket')
def handleMessage(msg):
    colasTickets[obtenerCola(msg['idLugarAtencion'])]['cola'].append(msg['nuevoTicket'])
    actualizarCola(msg['idLugarAtencion'])

@socketio.on('registroLugarAtencion')
def handleMessage(msg):
    lugaresAtencion.append({"sid":msg['sid'],"id":msg['idLugarAtencion']})
    if obtenerCola(msg['idLugarAtencion'])==None:
        colasTickets.append({'idLugarAtencion':msg['idLugarAtencion'],'cola':[]})

def actualizarCola(idLugarAtencion):
    cola=colasTickets[obtenerCola(idLugarAtencion)]
    for lugar in lugaresAtencion:
        if lugar['id']==idLugarAtencion:
            socketio.emit('actualizarTickets',cola,room=lugar['sid'])

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
