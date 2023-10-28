import {PrismaClient} from '@prisma/client';
export * from '@prisma/client';

const ProxyPrisma = new Proxy(PrismaClient, {
	construct(target, args) {
		if (typeof window !== "undefined") return {};
		globalThis["db"] = globalThis["db"] || new target(...args);
		return globalThis["db"];
	},
});

const prisma = new ProxyPrisma();

export default prisma;