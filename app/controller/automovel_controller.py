from flask import render_template, Response
from flask.globals import request
from loguru import logger
from service import *

def conf_automovel(app):
    @app.route("/cadastrar_automovel")
    def cadastro_auto():
        return render_template('cad_auto.html')

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

    @app.route("/show_room")
    def show_room():
        return render_template('listar_auto.html')
        
    @app.route('/visualizar_automovel', methods=['GET'])
    def visualizar_automovel_get():
        retorno = listar_automovel()
        return retorno

    @app.route("/att_auto")
    def att_auto():
        return render_template("att_auto.html")
 
    @app.route('/atualizar_automovel', methods=['POST'])
    def atualizar_auto_post():        
        try:            
            dados = request.get_json()
            id = dados['id']
            id_usuario = dados['id_usuario']
            ano_fab = dados['ano_fab']
            placa = dados['placa']
            modelo = dados['modelo']
            cor = dados['cor']
            error = atualizar_automovel(id, id_usuario, ano_fab, placa, modelo, cor)            
            if error:
                return Response(error, status=500)
            else:
                return "Automovel Alterado"
        except Exception as error:
            logger.error(error)

    @app.route('/delete_automovel', methods=['POST'])
    def delete_auto_post():
        
        try:
            dados = request.get_json()
            id = dados['id']
            error = deletar_automovel(id)

            if error:
                return Response(error, status=500)
            else:
                return "Automovel Excluido"
        except Exception as error:
            logger.error(error)

    @app.route('/show_room_usuario', methods=['POST'])
    def show_room_usuario():
        
            dados = request.get_json()
            id_usuario = dados['id_usuario']
            error = list_auto_by_usuario(id_usuario)    
            return error 

    @app.route('/list_auto_id', methods=['POST'])
    def list_auto_id():        
            dados = request.get_json()
            id = dados['id']
            error = list_auto_by_id(id)  
            return error 

       
           