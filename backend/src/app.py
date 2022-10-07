from flask import Flask, request, jsonify
from unicodedata import name
from flask import Flask
from config import config


app = Flask(__name__)

def page_not_found(e):
    return 'This page does not exist', 404

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, page_not_found)
    app.run(host='0.0.0.0',debug=True,port=5000)
