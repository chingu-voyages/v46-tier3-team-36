import unitsService from './units-service';
import { Unit } from '@prisma/client';
import express from 'express';

const router = express.Router();

router
	/**
	 * Return all units or return all units within a property if query is set
	 */
	.get('/units', async (req, res) => {
		const { propertyid } = req.query;
		let units:Unit[] | [] = [];
		if(propertyid) {
			if(Number(propertyid)) units = await unitsService.getUnitsForProperty(Number(propertyid));
		} else {
			units = await unitsService.getAllUnits();
		}
		res.status(200).json(units);
	});

export default router;