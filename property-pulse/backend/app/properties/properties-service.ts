import { PrismaClient, Property, Prisma } from '@prisma/client';

const unitsWithTenants: Prisma.UnitInclude = {
  tenants: true
};

const prisma = new PrismaClient();

const createProperty = async (user, property: Property) => {
  const { name, description } = property;

  const createdProperty = await prisma.property.create({
    data: {
      ownerId: user.id,
      name,
      description
    }
  })

  console.log(createdProperty)
  return createdProperty;
}

const getProperty = async (propertyId: number) => {
  return await prisma.property.findUnique({
    where: {
      id: propertyId
    }
  })
}

const getAllProperties = async (user) => {
  return await prisma.property.findMany({
    select: {
      id:true,
      name: true,
      description: true,
      owner: {
        select: {
          id: true,
          name: true
        }
      },
      units: {
        include: unitsWithTenants
      }
    },
    where: {
      ownerId: user.id
    }
  })
}

const updateProperty = async (propertyId: number, data: Property) => {
  const { name, description } = data;

  const updatedProperty = await prisma.property.update({
    where: {
      id: propertyId
    },
    data: {
      name,
      description
    }
  })

  return updatedProperty;
}

const deleteProperty = async (propertyId: number) => {
  const deletedProperty = await prisma.property.delete({
    where: {
      id: propertyId
    }
  })

  return deletedProperty;
}

export default { createProperty, getProperty, getAllProperties, updateProperty, deleteProperty };