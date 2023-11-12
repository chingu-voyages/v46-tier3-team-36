import { Unit as PrismaUnit, Property } from '../../../../backend/utils/prisma-proxy';
import { User } from '../users/userType';

export interface Unit extends Omit<PrismaUnit, 'rent' | 'id'> {
	id?: number;
	rent: number;
};

export interface UnitWithProperty extends Unit {
	property: Property
};

export interface UnitWithPropertyTenants extends UnitWithProperty {
	tenants: User[];
}