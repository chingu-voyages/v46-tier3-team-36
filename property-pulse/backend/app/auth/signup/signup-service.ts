import { User } from "@prisma/client";

const bcrypt = require('bcrypt');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const saveUser = async (email: string, password: string): Promise<User> => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = prisma.user.create({
    data: {
      email,
      password: passwordHash
    }
  });

  return user;
};

export default { saveUser };