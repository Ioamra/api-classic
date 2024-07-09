DROP DATABASE IF EXISTS api_classic;
CREATE DATABASE api_classic;
\c api_classic

CREATE TABLE IF NOT EXISTS users
(
    id_users serial NOT NULL,
    username_users character varying NOT NULL,
    name_users character varying NOT NULL,
    email_users character varying NOT NULL,
    password_users character varying NOT NULL,
    role_users character varying NOT NULL DEFAULT 'user',
    CONSTRAINT users_pkey PRIMARY KEY (id_users)
)

INSERT INTO public.users(username_users, name_users, email_users, password_users)
	VALUES ('admin', 'admin', 'admin@gmail.com', '577af03daf806da0b879ec38178966f4c2f597f842b1ac1dfa36e5cda8084dfc95f5fc35082b8ee72701e7ec8455a0b416359ea19cb9d640ce796cf443e4f497'),
        ('jean', 'luc', 'jean-luc@gmail.com', '577af03daf806da0b879ec38178966f4c2f597f842b1ac1dfa36e5cda8084dfc95f5fc35082b8ee72701e7ec8455a0b416359ea19cb9d640ce796cf443e4f497');