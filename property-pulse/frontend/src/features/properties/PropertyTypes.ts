import { Property, User, Unit } from '../../../../backend/utils/prisma-proxy';



export interface UnitWithTenants extends Omit<Unit, 'rent'> {tenants:User[], rent:number}
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