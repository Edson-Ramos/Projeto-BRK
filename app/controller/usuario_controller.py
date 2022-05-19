from flask import render_template, Response
from flask.globals import request
from service import *

def conf_usuario(app):
    @app.route('/')
    def login_page():
        return render_template('login.html')
    
    @app.route('/login', methods=['POST'])
    def login_post():
        dados = request.get_json()
        signin = dados['login']
        senha = dados['senha']
        token = login(signin, senha)
        if token:
            return {'access_token': token}
        else:
            return Response("Login ou senha inválidos", status=500)