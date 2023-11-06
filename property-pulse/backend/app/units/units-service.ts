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

const createUnit = async (user, unit: Unit) => {
	const { propertyId, name, description, rent } = unit;

  const createdUnit = await prisma.unit.create({
    data: {
      propertyId,
      name,
      description,
			rent,
    }
  })

	// const updatedUser = await prisma.user.update({
	// 	where: {
	// 		id: user.id
	// 	},
	// 	data: {
	// 		residence: {
	// 			connect: {
	// 				id: createdUnit.id
	// 			}
	// 		}
	// 	}
	// })

  console.log(createdUnit)
  return createdUnit;
}

export default { getAllUnits, getUnitsForProperty, createUnit };