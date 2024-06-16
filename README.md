# api-classic

Api node js express, postgreSql, typeSrcipt, jwt

## Run l'application

```
npm run serve
```

# Installation

## Installation des modules node js

```
npm i
```

## Créer un fichier d'environement dans le dossier src/config
Créer le fichier 
```.env```
dans ```src/config``` et remplacer les valeurs.
```bash
# 'prod' or 'dev' #
MODE = dev

#EXPRESS CONNECTION

PORT_PROD = 3000
HOST_PROD = localhost

PORT_DEV = 3000
HOST_DEV = localhost

# BDD CONNECTION

DB_HOST = "localhost"
DB_USER = "postgres"
DB_PASSWORD = "postgres"
DB_NAME = "api_classic"
DB_PORT = 5432

LOCAL_DB_HOST = "localhost"
LOCAL_DB_USER = "postgres"
LOCAL_DB_PASSWORD = "postgres"
LOCAL_DB_NAME = "api_classic"
LOCAL_DB_PORT = 5432

#SALAGE

SALT = 'SALT'

#Clés et configuration pour les JWT

JWT_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----   -----END RSA PRIVATE KEY-----"

JWT_PUBLIC_KEY="-----BEGIN RSA PUBLIC KEY-----   -----END RSA PUBLIC KEY-----"

JWT_ALGORITHM='RS256'
JWT_EXPIRES_IN='5h'

#Clés et configuration pour les refresh JWT

JWT_REFRESH_PRIVATE_KEY=JWT_REFRESH_PRIVATE_KEY
JWT_REFRESH_PUBLIC_KEY=JWT_REFRESH_PUBLIC_KEY
JWT_REFRESH_ALGORITHM=JWT_REFRESH_ALGORITHM
JWT_REFRESH_EXPIRES_IN=JWT_REFRESH_EXPIRES_IN

#Info nodemailer

SMTP_MAILER=SMTP_MAILER
SMTP_PORT=SMTP_PORT
SECURE_MAILER=SECURE_MAILER
USER_MAILER=USER_MAILER
PASS_MAILER=PASS_MAILER
```

## Les clé RSA pour jwt

```bash
ssh-keygen -t rsa -b 2048 -m PEM -f private_key.pem
```

```bash
ssh-keygen -f private_key.pem -e -m PEM > public_key.pem
```