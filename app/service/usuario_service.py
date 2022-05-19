from loguru import logger
from model import Usuario
from dao import *
from flask_jwt_extended import create_access_token

def login(login: str, senha: str):
    usuario_consulta = Usuario(login=login)    

    for usuario in get_usuario_by_login(usuario_consulta):
        login_db = usuario.get_login()
        senha_db = usuario.get_senha()

        if (login == login_db and senha == senha_db):
            access_token = create_access_token(identity=login)
            return access_token
    return None
    
def cadastrar_usuario(nome: str, email: str, data_nasc: str, tel: str, login: str, senha: str):
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
        