from flask import render_template, Response
from flask.globals import request
from loguru import logger
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
            return token
        else:
            return Response("Login ou senha inválidos", status=500)

    @app.route("/login", methods=['PUT'])
    def cadastro_usuario_put():
        try:
            dados = request.get_json()
            nome = dados['nome']
            email = dados['email']
            data_nasc = dados['data_nasc']
            tel = dados['tel']
            login = dados['login']
            senha = dados['senha']
            error = cadastrar_usuario(nome, email, data_nasc, tel, login, senha)
            if error:
                return Response(error, status=500)
            
            return "Usuário cadastrado com sucesso!"
        except Exception as e:
            logger.error

    