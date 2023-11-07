import { User as PrismaUser, Property } from "../../../../backend/utils/prisma-proxy";
import { UnitWithProperty } from "../units/unitType";

export interface User extends Omit<PrismaUser, 'id' | 'password' | 'emailVerified' | 'image'> {
	id: number | undefined;
	password: string | undefined;
}

export interface UserWithResidence extends User {
	residence: UnitWithProperty []
};

export interface UserWithResidenceProperty {
	residence: UnitWithProperty [],
	properties: Property []
};