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
            return retorno
    except connection.connector.Error as error:
        connection.rollback()
        print("Falha ao Carregar Registro")
        raise error
