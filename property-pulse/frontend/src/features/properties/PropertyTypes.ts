import { Property, User } from '../../../../backend/utils/prisma-proxy';
import { Unit } from '../units/unitType';

export interface UnitWithTenants extends Unit {tenants:User[], rent:number}
export interface PropertyWithOwner extends Omit<Property, 'units'> {owner:User, units:UnitWithTenants[]}

export type NewPropertyData = {
  name: string;
  description: string;
};

export type UpdatePropertyData = {
  id: number;
  ownerId: number;
  name: string;
  description: string;
};