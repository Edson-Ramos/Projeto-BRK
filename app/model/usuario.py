class Usuario:
    def __init__(self, id=None, nome=None, email=None, data_nasc=None, tel=None, login=None, senha=None):
        self.id = id
        self.nome = nome
        self.email = email
        self.data_nasc = data_nasc
        self.tel = tel
        self.login = login
        self.senha = senha

    
    def get_id(self):
        return self.id
    def set_id(self, id):
        self.id = id

    def get_nome(self):
        return self.nome
    def set_nome(self, nome):
        self.nome = nome

    def get_email(self):
        return self.email
    def set_email(self, email):
        self.email = email

    def get_data_nasc(self):
        return self.data_nasc
    def set_data_nasc(self, data_nasc):
        self.data_nasc = data_nasc

    def get_tel(self):
        return self.tel
    def set_tel(self, tel):
        self.tel = tel

    def get_login(self):
        return self.login
    def set_login(self, login):
        self.login = login
    
    def get_senha(self):
        return self.senha
    def set_senha(self, senha):
        self.senha = senha
