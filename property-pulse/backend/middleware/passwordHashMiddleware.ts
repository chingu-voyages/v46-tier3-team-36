import { hash } from '../utils/passwordUtils';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to hash a password in request body, if exists.
 * Add this middleware to any route that needs password hashing, such as user creation
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
export const hashPassword = async (req: Request, res:Response, next:NextFunction) => {
	if(req.body.password) {
		req.body.password = await hash(req.body.password);
	}
	next();
};

export default hashPassword;