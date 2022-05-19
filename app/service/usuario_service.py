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
    
