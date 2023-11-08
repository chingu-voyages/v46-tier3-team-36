import express from 'express';
import profileService from './profile-service';
import { $Enums } from '@prisma/client';
import { BadRequestError } from '../../middleware/errorMiddleware';

const router = express.Router();

router
	.get('/users/profile', async(req, res) => {
		res.status(200).json({ user: req.user });
	})
	.patch('/users/profile', async(req, res) => {
		const user = await profileService.updateMyProfile(req, req.body.user);
		res.status(200).json({ user });
	})
	.patch('/users/promote', async (req, res) => {
		const { code } = req.body;
		// The secret code is hard-coded for now.
		if(code !== 'promote') throw new BadRequestError("The promotion code is incorrect.");
		const user = await profileService.updateRole(req, $Enums.Role.manager);
		return user;
	})
	.patch('/users/demote', async (req, res) => {
		const user = await profileService.updateRole(req, $Enums.Role.tenant);
		return user;
	});

export default router;