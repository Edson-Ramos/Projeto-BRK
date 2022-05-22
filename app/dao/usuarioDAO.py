from loguru import logger
from utils import mysql_connection
from model import Usuario

connection = mysql_connection.get_connection()[0]
cursor = mysql_connection.get_connection()[1]

def get_usuario_by_login(usuario: Usuario):
      
    try:        
        sql_query = """SELECT * FROM usuarios WHERE login = "%s" """%usuario.get_login()
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for user in result:
            usuario = Usuario(user[0], user[1], user[2],user[3], user[4], user[5], user[6])
            retorno.append(usuario)
            print("login")         
        return retorno
    except connection.connector.Error as error:
        connection.rollback()
        logger.error("Falha ao Carregar Registro")
    except Exception as error:
        logger.error(error)

def insert_usuario(usuario: Usuario):    
    try:
        sql_query = """INSERT INTO usuarios (nome , email , data_nasc, tel, login, senha) VALUES (%s,%s,%s,%s,%s,%s)"""
        tuple = (usuario.get_nome(), usuario.get_email(), usuario.get_data_nasc(), usuario.get_tel(), usuario.get_login(), usuario.get_senha())
        cursor.execute(sql_query, tuple)
        connection.commit()
        logger.debug("Registro foi inserido com sucesso na Base de Dados!")
    except connection.connector.Error as error:
        connection.rollback()
        logger.error("Falha ao Tentar Inserir um Registro no Banco de Dados!")
        
    except Exception as error:
        logger.error(error)
        

def get_usuario_by_email(usuario: Usuario):
    try:
        sql_query = """SELECT * FROM usuarios WHERE email = "%s" """%usuario.get_email()
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for user in result:
            usuario = Usuario(user[0], user[1], user[2],user[3], user[4], user[5], user[6])
            retorno.append(usuario)            
        return retorno
    except connection.connector.Error as error:
        connection.rollback()
        logger.error("Falha ao Carregar Registro")
    except Exception as error:
        logger.error(error)