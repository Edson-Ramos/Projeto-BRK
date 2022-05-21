from traceback import print_tb
from loguru import logger
from model import Usuario
from dao import *
from flask_jwt_extended import create_access_token
import hashlib

def login(login: str, senha: str):
    senha = hashlib.sha256(bytes(senha, "UTF-8")).hexdigest()
    usuario_consulta = Usuario(login=login)     

    for usuario in get_usuario_by_login(usuario_consulta):
        login_db = usuario.get_login()
        senha_db = usuario.get_senha()
        id_db = usuario.get_id()
        nome_db = usuario.get_nome()

        if (login == login_db and senha == senha_db):
            access_token = create_access_token(identity=login)
            token = {'access_token':access_token,
                    'id': id_db,
                    'nome': nome_db}
            return token
    return None
    
def cadastrar_usuario(nome: str, email: str, data_nasc: str, tel: str, login: str, senha: str):
    
    senha = hashlib.sha256(bytes(senha, "UTF-8")).hexdigest()
    usuario = Usuario(nome=nome, email=email, data_nasc=data_nasc, tel=tel, login=login, senha=senha)
    try:
        if (len(get_usuario_by_login(usuario)) > 0):
            return 'Login já existe'
        if(len(get_usuario_by_email(usuario)) > 0):
            return "E-mail já existe"

        insert_usuario(usuario)
        return None
    except Exception as error:
        logger.error(error)
