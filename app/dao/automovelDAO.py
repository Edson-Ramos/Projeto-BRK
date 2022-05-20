from loguru import logger
from utils import mysql_connection
from model import Automovel

connection = mysql_connection.get_connection()[0]
cursor = mysql_connection.get_connection()[1]

def get_automovel_by_placa(automovel: Automovel):
    try:
        sql_query = """SELECT * FROM automovel WHERE placa = "%s" """%automovel.get_placa()
        cursor.execute(sql_query)
        result = cursor.fetchall()
        retorno = []
        for auto in result:
            automovel = Automovel(auto[0], auto[1], auto[2], auto[3], auto[4], auto[5])
            retorno.append(automovel)
        return retorno
    except Exception as error:
        logger.error(error)

def insert_automovel(automovel: Automovel):
    try:
        sql_query = """INSERT INTO `automovel`(id_usuario, ano_fab, placa, modelo, cor) VALUES (%s,%s,%s,%s,%s)"""
        tuple = (automovel.get_id_usuario(), automovel.get_ano_fab(), automovel.get_placa(), automovel.get_modelo(), automovel.get_cor())
        cursor.execute(sql_query, tuple)
        connection.commit()
        logger.debug("Registro foi inserido com sucesso na Base de Dados!")
    except connection.connector.Error as error:
        connection.rollback()
        logger.error("Falha ao Tentar Inserir um Registro no Banco de Dados!")        
    except Exception as error:
        logger.error(error)

def read_automovel():
        try:
            sql_query = "SELECT * FROM automovel"
            cursor.execute(sql_query)
            result = cursor.fetchall()
            retorno = []
            for auto in result:
                automovel = Automovel(auto[0], auto[1], auto[2], auto[3], auto[4], auto[5])
                retorno.append(automovel)
            return retorno
        except connection.connector.Error as error:
            connection.rollback()
            logger.error("Falha ao carregar a lista de usuários")
        except Exception as error:
            logger.error(error)