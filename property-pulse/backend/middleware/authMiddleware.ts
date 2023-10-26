import { Request, Response, NextFunction } from 'express';
import { UnauthenticatedError, UnauthorizedError } from './errorMiddleware';
import { $Enums } from '@prisma/client';

// Middleware to check if user is authenticated. Use this middlware for any routes that requires authenticated users
export const authenticate = (req: Request, res:Response, next:NextFunction) => {
	if(!req.user) throw new UnauthenticatedError("Unauthenticated");
	next();
};

/**
 * Authorize a logged in user.
 * Use this middleware for any routes that requires a specific role
 * 
 * @param role The role for which the this function should authorize
 * @throws UnauthorizedError
 */
export const authorize = (role:$Enums.Role) => (req: Request, res:Response, next:NextFunction) => {
	if(req.user?.role !== role) throw new UnauthorizedError("Unauthorized");
	next();
};