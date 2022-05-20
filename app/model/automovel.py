class Automovel:
    def __init__(self, id=None, id_usuario=None, ano_fab=None, placa=None, modelo=None, cor=None):
        self.id_usuario = id_usuario
        self.id = id
        self.ano_fab = ano_fab
        self.placa = placa
        self.modelo = modelo
        self.cor = cor

    def get_id_usuario(self):
        return self.id_usuario
    def set_id_usuario(self, id_usuario):
        self.id_usuario = id_usuario

    def get_id(self):
        return self.id
    def set_id(self, id):
        self.id = id

    def get_ano_fab(self):
        return self.ano_fab
    def set_ano_fab(self, ano_fab):
        self.ano_fab = ano_fab
    
    def get_placa(self):
        return self.placa
    def set_placa(self, placa):
        self.placa = placa
    
    def get_modelo(self):
        return self.modelo
    def set_modelo(self, modelo):
        self.modelo = modelo

    def get_cor(self):
        return self.cor
    def set_cor(self, cor):
        self.cor