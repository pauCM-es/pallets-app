// const prisma = require("@/libs/prismadb")
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const users = [
	{
		name: "paula",
		roles: "ADMIN",
	},
	{
		name: "pepe",
		roles: "USER",
	},
	{
		name: "pilar",
		roles: "READER",
	},
];

const pallets = [
	{
		numberId: "1",
		product: "MA",
		size: "B",
		pieces: 48,
		boxBrand: "lidl",
		camaraCode: "C01",
	},
	{
		numberId: "2",
		product: "MA",
		size: "3A",
		pieces: 16,
		boxBrand: "gen",
		camaraCode: "C01",
	},
	{
		numberId: "3",
		product: "NB",
		size: "2A",
		pieces: 20,
		boxBrand: "eps",
		camaraCode: "C01",
	},
	{
		numberId: "4",
		product: "NB",
		size: "A",
		pieces: 36,
		boxBrand: "ifco",
		camaraCode: "C01",
	},
];

const products = [
	{
		code: "MA",
		name: "melocoton amarillo",
		calibers: ["4A", "3A", "2A", "A", "B", "C", "D"],
	},
	{
		code: "MB",
		name: "melocoton blanco",
		calibers: ["4A", "3A", "2A", "A", "B", "C", "D"],
	},
	{
		code: "MR",
		name: "melocoton rojo",
		calibers: ["4A", "3A", "2A", "A", "B", "C", "D"],
	},
	{
		code: "NA",
		name: "nectarina amarilla",
		calibers: ["4A", "3A", "2A", "A", "B", "C", "D"],
	},
	{
		code: "NB",
		name: "nectarina blanca",
		calibers: ["4A", "3A", "2A", "A", "B", "C", "D"],
	},
];

const boxBrands = [
	{
		code: "LIDL",
		name: "lidl",
	},
	{
		code: "IFCO",
		name: "ifco",
	},
	{
		code: "EPS",
		name: "europool system",
	},
	{
		code: "ALDI",
		name: "aldi",
	},
	{
		code: "GEN",
		name: "generica",
	},
	{
		code: "MER1",
		name: "mercado I",
	},
	{
		code: "MER2",
		name: "mercado II",
	},
];

const camaras = [
	{
		code: "C01",
		name: "expediciones",
	},
];

const shelves = [
	{
		name: "01",
		length: 8,
		height: 1,
		camaraId: "C01",
	},
	{
		name: "02",
		length: 8,
		height: 1,
		camaraId: "C01",
	},
	{
		name: "03",
		length: 8,
		height: 1,
		camaraId: "C01",
	},
	{
		name: "04",
		length: 8,
		height: 1,
		camaraId: "C01",
	},
	{
		name: "05",
		length: 8,
		height: 1,
		camaraId: "C01",
	},
	{
		name: "06",
		length: 6,
		height: 1,
		camaraId: "C01",
	},
];

const seed = async (
	pallets,
	camaras,
	shelves,
	usersSeeds,
	products,
	boxBrands
) => {
	try {
		// const camarasCreated = await prisma.camara.createMany({ data: camaras });
		const shelvesCreated = await prisma.shelf.createMany({ data: shelves });

		// const usersCreated = await prisma.user.createMany({
		// 	data: usersSeeds,
		// });

		// const palletsCreated = await prisma.pallet.createMany({
		// 	data: pallets,
		// });
		// const productsCreated = await prisma.product.createMany({
		// 	data: products,
		// });
		// const boxBrandsCreated = await prisma.boxBrand.createMany({
		// 	data: boxBrands,
		// });
		console.log(
			// palletsCreated
			// camarasCreated,
			shelvesCreated
		);
	} catch (error) {
		console.log(error);
	}
};

seed(pallets, camaras, shelves)
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
