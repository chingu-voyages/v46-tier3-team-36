import { User, Property, Unit } from "../../../../backend/utils/prisma-proxy";

interface UserWithResidence extends User {
	residence: Property,
	unit: Unit
}

export default UserWithResidence;