import jwt from "jsonwebtoken";
import { AccessToken } from "../models/general-models/jwt.model";

export const accessToken: AccessToken = { 
    privateKey:  process.env.JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') as string,
    publicKey: process.env.JWT_PUBLIC_KEY?.replace(/\\n/g, '\n') as string,
    expiresIn: parseInt(process.env.JWT_EXPIRES_IN as string, 10),
    algorithm: process.env.JWT_ALGORITHM as jwt.Algorithm
};

export const authAccessToken: AccessToken = { 
    privateKey:  process.env.AUTH_JWT_PRIVATE_KEY?.replace(/\\n/g, '\n') as string,
    publicKey: process.env.AUTH_JWT_PUBLIC_KEY?.replace(/\\n/g, '\n') as string,
    expiresIn: parseInt(process.env.AUTH_JWT_EXPIRES_IN as string, 10),
    algorithm: process.env.AUTH_JWT_ALGORITHM as jwt.Algorithm,
};