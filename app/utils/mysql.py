from mysql.connector import errorcode
import mysql.connector
import os
from loguru import logger


class MysqlConnect:

    def __init__(self):
        self.connection = None

    def create_connection(self):
        try:  
            if self.connection and self.connection.is_connected():
                db_info = self.connection.get_server_info()              
                logger.debug("Conectado ao Servidor MySQL Versao", db_info)
                
            else:         
                self.connection = mysql.connector.connect(host=os.getenv('HOST', 'localhost'),
                                                        user=os.getenv('USER', 'root'), 
                                                        password=os.getenv('PASSWORD',''), 
                                                        database=os.getenv('DATABASE','db_brk'))

            cursor = self.connection.cursor()
            return cursor


        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
                logger.error("Algo esta errado com as informações do banco")
            elif err.errno == errorcode.ER_BAD_DB_ERROR:
                logger.error("Banco de dados não existe")


    def get_connection(self):
        cursor = self.create_connection()    
        return (self.connection, cursor)

 