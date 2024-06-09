import jwt from 'jsonwebtoken';

export interface AccessToken {
    privateKey: string,
    publicKey: string,
    expiresIn: number,
    algorithm: jwt.Algorithm
}

export interface AccessToken {
    privateKey: string,
    publicKey: string,
    expiresIn: number,
    algorithm: jwt.Algorithm
}

export interface AccessTokenDecoded {
    id_users: number,
    role_users: string,
    iat: number,
    exp: number
}