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

def listar_automovel():
    retorno = {'files':[]}
    for auto in read_automovel():
        id = auto.get_id()
        id_usuario = auto.get_id_usuario()
        ano_fab = auto.get_ano_fab()
        placa = auto.get_placa()
        modelo = auto.get_modelo()
        cor = auto.get_cor()

        file = {'id':id,
                'id_usuario': id_usuario,
                'ano_fab': ano_fab,
                'placa': placa,
                'modelo': modelo,
                'cor': cor
        }
        retorno['files'].append(file)        
    return retorno
    
def atualizar_automovel(id:str, id_usuario:str, ano_fab:str, placa:str, modelo:str, cor:str):
    try:
        automovel = Automovel(id=id, id_usuario=id_usuario, ano_fab=ano_fab, placa=placa, modelo=modelo, cor=cor)
        update_automovel(automovel)
        return None
    except Exception as error:
        logger.error(error)

def deletar_automovel(id:str):
    try:
        automovel = Automovel(id=id)
        del_automovel(automovel)
        return None
    except Exception as error:
        logger.error(error)