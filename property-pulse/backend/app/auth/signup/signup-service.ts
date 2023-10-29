import { User } from "@prisma/client";

import { hash } from '../../../utils/passwordUtils';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const saveUser = async (name: string, email: string, password: string): Promise<User> => {
  const passwordHash = await hash(password);

  const user = prisma.user.create({
    data: {
      name,
      email,
      password: passwordHash
    }
  });

  return user;
};

export default { saveUser };