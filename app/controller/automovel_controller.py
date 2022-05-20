from flask import render_template, Response
from flask.globals import request
from loguru import logger
from service import *

def conf_automovel(app):
    @app.route("/cadastrar_automovel")
    def cadastro_auto():
        return "ok" #render_template('cadastro_automovel.html')

    @app.route('/cadastrar_auto', methods=['POST'])
    def cadastrar_automovel_post():
        try:
            dados = request.get_json()
            id_usuario = dados['id_usuario']
            ano_fab = dados['ano_fab']
            placa = dados['placa']
            modelo = dados['modelo']
            cor = dados['cor']
            error = cadastrar_automovel(id_usuario, ano_fab, placa, modelo, cor)
            
            if error:
                return Response(error, status=500)
            else:
                return "Automovel cadastrado"
        except Exception as error:
            logger.error(error)

