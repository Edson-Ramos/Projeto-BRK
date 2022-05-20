import datetime
import flask
from cryptography.hazmat.primitives import serialization
from flask_jwt_extended import JWTManager
from controller import *



app = flask.Flask(__name__)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'

private_key = open('D:/WorkStation/GitHub/Projeto-BRK/app/ssh/key', 'r').read()
prkey = serialization.load_ssh_private_key(
private_key.encode(), password=b'87361542')

public_key = open('D:/WorkStation/GitHub/Projeto-BRK/app/ssh/key.pub', 'r').read()
pubkey = serialization.load_ssh_public_key(public_key.encode())

app.config["JWT_PRIVATE_KEY"] = prkey
app.config["JWT_PUBLIC_KEY"] = public_key
app.config['JWT_ALGORITHM'] = 'RS256'

app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=60)

jwt = JWTManager(app)

conf_usuario(app)
conf_automovel(app)


if __name__ == "__main__":
    app.run()