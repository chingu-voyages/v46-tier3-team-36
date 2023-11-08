import { Unit as PrismaUnit, Property } from "../../../../backend/utils/prisma-proxy";

export interface Unit extends Omit<PrismaUnit, "rent"> {
	rent: number;
};

export interface UnitWithProperty extends Unit {
	property: Property
};