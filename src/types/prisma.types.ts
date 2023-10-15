export interface Camara {
	id: string;
	name: string;
	code: string;
	shelvesNum: number | null;
	heights: number | null;
	perShelf: number | null;
	perHeight: number | null;
}

export interface Pallet {
	id?: string;
	numberId: string;
	product: string;
	size: string | null;
	pieces: number | null;
	boxBrand: string | null;
	position: number[];
	camaraCode: string;
	shipped?: boolean;
	selected?: boolean;
	tagsId?: string[];
	createdAt?: Date;
	updatedAt?: Date;
}
