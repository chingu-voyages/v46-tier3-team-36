interface CustomError extends Error {
	statusCode: number;
	message: string;
}

class CustomError extends Error {
	constructor(message: string) {
		super(message);
		this.message = message;
	}
};

export class BadRequestError extends CustomError {
	constructor(message: string) {
		super(message);
		this.statusCode = 400;
	}
};

export class UnauthenticatedError extends CustomError {
	constructor(message: string) {
		super(message);
		this.statusCode = 401;
	}
};

export class UnauthorizedError extends CustomError {
	constructor(message: string) {
		super(message);
		this.statusCode = 403;
	}
};

export class NotFoundError extends CustomError {
	constructor(message: string) {
		super(message);
		this.statusCode = 404;
	}
};

const errorMiddleware = async (
  err: CustomError, 
  req: Request, 
  res: Response, 
) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal server error';
	console.log(err);
	// couldn't find fix for "This expression is not callable. Type 'Number' has no call signatures."
	await res.status(statusCode).json({ msg: message });
};

export default errorMiddleware;