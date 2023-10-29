import { PrismaClient, Unit } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Return all units in the database.
 * @returns {Unit[]} units
 */
const getAllUnits = async () => {
	return await prisma.unit.findMany();
};

/**
 * Return all units belonging to the given property.
 * @param {number} propertyId id of the property
 * @returns {Unit[]} units
 */
const getUnitsForProperty = async (propertyId:number) => {
	return await prisma.unit.findMany({
		where: {
			propertyId
		}
	});
};

export default { getAllUnits, getUnitsForProperty };