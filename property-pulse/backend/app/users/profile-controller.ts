import express from 'express';
import profileService from './profile-service';
import { $Enums } from '@prisma/client';
import { BadRequestError } from '../../middleware/errorMiddleware';
import { compare } from '../../utils/passwordUtils';
import hashPassword from '../../middleware/passwordHashMiddleware';

const router = express.Router();

router
	.get('/users/profile', async(req, res) => {
		res.status(200).json({ user: req.user });
	})
	.patch('/users/profile', hashPassword, async(req, res) => {
		if(req.body.password) {
			const oldPassword = req.body.oldPassword;
			if(!await compare(oldPassword, req.user?.password)) {
				throw new BadRequestError("The old password is incorrect");
			}
		}
		const user = await profileService.updateMyProfile(req, req.body);
		res.status(200).json({ user });
	})
	.patch('/users/promote', async (req, res) => {
		const { code } = req.body;
		// The secret code is hard-coded for now.
		if(code !== 'promote') throw new BadRequestError("The promotion code is incorrect.");
		const user = await profileService.updateRole(req, $Enums.Role.manager);
		res.status(200).json({ user });
	})
	.patch('/users/demote', async (req, res) => {
		const user = await profileService.updateRole(req, $Enums.Role.tenant);
		res.status(200).json({ user });
	});

export default router;