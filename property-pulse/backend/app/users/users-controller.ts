import { $Enums } from '@prisma/client';
import usersService from './users-service';
import express from 'express';
import hashPassword from '../../middleware/passwordHashMiddleware';
import { BadRequestError } from '../../middleware/errorMiddleware';

const router = express.Router();

/**
 * This route is for managers (Admins).
 * Allow admins to retrieve users data and modify them.
 */
router
	/**
	 * Get a single user by the given id
	 */
	.get('/users/:id', async (req, res) => {
		const user = await usersService.getUser(Number(req.params.id));
		res.status(200).json(user);
	})
	/**
	 * Get all users
	 */
	.get('/users', async (req, res) => {
		const users = await usersService.getAllUsers();
		res.status(200).json(users);
	})
	/**
	 * Get paginated users
	 */
	.get('/users/:role/:per_page/:page', async (req, res) => {
		const { role, page, per_page } = req.params;
		if(!Object.values($Enums.Role).includes(role as $Enums.Role) || !Number(page) || !Number(per_page)) {
			throw new BadRequestError("Invalid parameters");
		}
		const result = await usersService.getPaginatedUsers(role as $Enums.Role, Number(page), Number(per_page));
		res.status(200).json(result);
	})
	/**
	 * Create a new user. Hash password in the body using hashPassword middleware
	 */
	.post('/users', hashPassword, async (req, res) => {
		const user = await usersService.createUser(req.body);
		res.status(201).json(user);
	})
	/**
	 * Update a user
	 */
	.patch('/users/:id', async (req, res) => {
		const user = await usersService.updateUser(Number(req.params.id), req.body);
		res.status(200).json(user);
	})
	/**
	 * Delete a user
	 */
	.delete('/users/:id', async (req, res) => {
		const user = await usersService.deleteUser(Number(req.params.id));
		res.status(200).json(user);
	});

export default router;