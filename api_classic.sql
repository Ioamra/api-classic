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
	VALUES ('admin', 'admin', 'admin@gmail.com', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9'),
        ('jean', 'luc', 'jean-luc@gmail.com', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9');