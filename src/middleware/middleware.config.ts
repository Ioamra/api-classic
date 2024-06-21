import { Request, Response, NextFunction } from 'express';
import { MiddlewareFunction } from './middlewareClass.middleware';

export class Middleware {
    // API
/**
 * La fonction `requireAuthentication` dans TypeScript vérifie la connexion à une API avant de
 * poursuivre la requête.
 * @param {Request} req - Le paramètre `req` représente la requête entrante dans une application
 * Express.js. Il contient des informations sur la requête HTTP telles que les en-têtes, les
 * paramètres, le corps, etc.
 * @param {Response} res - Le paramètre `res` dans la fonction `requireAuthentication` est un objet
 * représentant la réponse HTTP que l'application Express envoie lorsqu'elle reçoit une requête HTTP.
 * Il est utilisé pour renvoyer la réponse au client avec des données, des codes d'état, des en-têtes,
 * etc.
 * @param {NextFunction} next - Le paramètre « next » dans la fonction « requireAuthentication » est
 * une fonction de rappel qui est utilisée pour passer le contrôle à la fonction middleware suivante
 * dans la pile. Une fois appelé, il exécutera la prochaine fonction middleware. Cela permet
 * l'exécution séquentielle de fonctions middleware dans une application Express.
 */
    static requireAuthentication(req: Request, res: Response, next: NextFunction){
        MiddlewareFunction.checkConnectApi(req, res, next);
    }
    
  /**
   * La fonction statique requireAdmin vérifie si l'utilisateur est un administrateur avant de
   * poursuivre la demande.
   * @param {Request} req - Le paramètre `req` est un objet représentant la requête HTTP. Il contient
   * des informations sur la demande effectuée par le client, telles que les en-têtes, le corps, les
   * paramètres et les chaînes de requête de la demande.
   * @param {Response} res - Le paramètre `res` dans la fonction `requireAdmin` est un objet
   * représentant la réponse HTTP que l'application Express envoie lorsqu'elle reçoit une requête HTTP.
   * Il est utilisé pour renvoyer la réponse au client avec des données, des codes d'état, des
   * en-têtes, etc.
   * @param {NextFunction} next - Le paramètre « next » dans la fonction « requireAdmin » est une
   * fonction de rappel qui est utilisée pour passer le contrôle à la fonction middleware suivante dans
   * la pile. Lorsqu'il est appelé, il exécutera la prochaine fonction middleware de la chaîne. Cela
   * permet l'exécution séquentielle de fonctions middleware dans une application Express.
   */
    static requireAdmin(req: Request, res: Response, next: NextFunction){
        MiddlewareFunction.checkIsAdmin(req, res, next);
    }
}