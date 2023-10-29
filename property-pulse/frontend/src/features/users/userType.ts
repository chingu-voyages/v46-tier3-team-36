import { User, Property, Unit } from "../../../../backend/utils/prisma-proxy";

interface UnitWithProperty extends Unit {
	property: Property
};

interface UserWithResidence extends User {
	residence: UnitWithProperty [],
	properties: Property []
};

export default UserWithResidence;