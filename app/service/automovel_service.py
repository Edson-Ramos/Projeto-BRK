from loguru import logger
from model import Automovel
from dao import *

def cadastrar_automovel(id_usuario:str, ano_fab:str, placa:str, modelo:str, cor:str):
    automovel = Automovel(id_usuario=id_usuario, ano_fab=ano_fab, placa=placa, modelo=modelo, cor=cor)
    try:  
        if (len(get_automovel_by_placa(automovel))> 0):
            return "Placa ja existe"

        insert_automovel(automovel)
        return None
    except Exception as error:
        logger.error(error)

