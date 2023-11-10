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

/**
 * Create a unit belonging to the given property.
 */
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

  console.log(createdUnit)
  return createdUnit;
}

/**
 * Create a unit belonging to the given property.
 */
const updateUnit = async (user, unit: Unit) => {
	const { name, description, rent } = unit;

	const updatedUnit = await prisma.unit.update({
    where: {
      id: unit.id
    },
		data: {
			name,
			description,
			rent
		}
  })

	return updatedUnit;
}

/**
 * Delete a unit belonging to the given property.
 */
const deleteUnit = async (user, unitId: number) => {
  const deletedUnit = await prisma.unit.delete({
    where: {
      id: unitId
    }
  })

	return deletedUnit;
}

export default { getAllUnits, getUnitsForProperty, createUnit, updateUnit, deleteUnit };

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