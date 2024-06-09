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
MODE = 'dev'

#EXPRESS CONNECTION

PORT_PROD = 3000
PORT_DEV = 3000
HOST_PROD = 'HOST'
HOST_DEV = 'localhost'

# BDD CONNECTION

DB_HOST = 'DB_HOST'
DB_USER = 'DB_USER'
DB_PASSWORD = 'DB_PASSWORD'
DB_NAME = 'DB_NAME'
DB_PORT = 'DB_PORT'

#SALAGE

SALT = 'SALT'

#Clés et configuration pour les JWT

JWT_PRIVATE_KEY=JWT_PRIVATE_KEY
JWT_PUBLIC_KEY=JWT_PUBLIC_KEY
JWT_ALGORITHM=JWT_ALGORITHM
JWT_EXPIRES_IN=JWT_EXPIRES_IN

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

## 