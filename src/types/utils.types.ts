import { EmptyShelf } from "./shelf.types";

export type HalfPartial<T, P extends keyof T> = {
	[Key in keyof T]: Key extends P ? T[Key] : T[Key] | undefined;
};

export type InferStringLiteral<S> = S extends string
	? string
	: S extends number
	? number
	: S;

export type MakeMutable<T extends {}> = {
	-readonly [P in keyof T]: T[P];
};

export type MakeGenericObj<T extends {}> = {
	[P in keyof T]: InferStringLiteral<T[P]>;
};

export type PosibleTypesOnArray<T extends {}[]> = MakeMutable<T[number]>;

export type ListByProperty<
	T extends readonly {}[],
	K extends keyof T[number]
> = T[number][K];

export type ObjInInmutableArray<T extends readonly {}[]> = {
	-readonly [key in keyof T[number]]: T[number][key];
};

export type ObjInMutableArray<T extends {}[]> = {
	[key in keyof T[number]]: T[number][key];
};

export type ObjInArray<T> = T extends {}[]
	? ObjInMutableArray<T>
	: T extends readonly {}[]
	? ObjInInmutableArray<T>
	: never;

export type ReplaceObjPropType<T extends {}, K extends keyof T, S> = {
	[P in keyof T]: P extends K ? S : T[P];
};
