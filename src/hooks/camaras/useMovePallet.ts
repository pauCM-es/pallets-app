import React, { useCallback, useEffect, useRef, useState } from "react";
import "@/styles/EmptySpace.style.scss";
import {
	DndContext,
	DragEndEvent,
	DragMoveEvent,
	DragOverlay,
	DragStartEvent,
	DroppableContainer,
	UniqueIdentifier,
	closestCenter,
	closestCorners,
} from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Pallet } from "@prisma/client";
import { EmptyShelf } from "@/types/shelf.types";
import { updateAfterMove } from "@/app/services/camara.service";
import { ItemsOnShelf } from "@/types/camara.types";

export const useMovePalet = (itemsGroupedByShelf: ItemsOnShelf[]) => {
	const positionRef = useRef<Pallet[]>(palletsOnCamara);
	const [positions, setPositions] = useState<Pallet[]>(palletsOnCamara);
	const [activePallet, setActivePallet] = useState<{
		pallet: Pallet;
		indexOnShelf: number;
		shelfId: string;
	} | null>(null);
	const [movement, setMovement] = useState<{
		fromShelf: undefined | string;
		toShelf: undefined | string;
	}>({
		fromShelf: undefined,
		toShelf: undefined,
	});

	useEffect(() => {
		if (!movement.fromShelf || !movement.toShelf) return;

		const shelvesInvolved = positions
			.filter(
				(shelf) =>
					shelf.shelfId === movement.fromShelf ||
					shelf.shelfId === movement.toShelf
			)
			.map((shelf) => {
				if (
					shelf.pallets.length === 1 &&
					shelf.pallets[0].numberId === "empty"
				) {
					const mapShelf = { ...shelf, pallets: [] };
					console.log(mapShelf);
					return mapShelf as PalletsOnShelf;
				} else {
					return shelf;
				}
			});
		console.log(shelvesInvolved);

		updateAfterMove(shelvesInvolved as PalletsOnShelf[])
			.then((res) => {
				console.log(res);
			})
			.catch((error) => {
				//TODO: undo movement.
				console.log(error);
			});

		setMovement({ fromShelf: undefined, toShelf: undefined });
	}, [movement]);

	const getShelf = (
		shelfId: string
	): [PalletsOnShelf | EmptyShelf, number] | [undefined, undefined] => {
		const shelfFound = palletsOnCamara?.find(
			(shelf) => shelf.shelfId === shelfId
		);
		if (!shelfFound) return [undefined, undefined];
		const indexShelf = palletsOnCamara.findIndex(
			(shelf) => shelf.shelfId === shelfFound.shelfId
		);
		return [shelfFound, indexShelf];
	};
	const findPalletOnShelf = (id: UniqueIdentifier, shelfId: string) => {
		const [shelf] = getShelf(shelfId);
		if (shelf && isShelfEmpty(shelf)) return null;

		const palletFound = shelf?.pallets.find((pallet) => pallet.numberId === id);
		return palletFound || null;
	};

	const onDragStart = (evt: DragStartEvent) => {
		const id = evt.active.id;
		const shelf: string = evt.active.data.current?.sortable.containerId;
		const index = evt.active.data.current?.sortable.index;
		const activePalletData = findPalletOnShelf(id, shelf);

		if (activePalletData?.numberId !== "empty") {
			activePalletData &&
				setActivePallet({
					pallet: activePalletData,
					indexOnShelf: index,
					shelfId: shelf,
				});
			setMovement((oldState) => {
				return { ...oldState, fromShelf: shelf };
			});
		}
	};

	const onDragMove = (evt: DragMoveEvent) => {
		if (!activePallet) return;

		const { active, over } = evt;
		let newShelfId: string = over?.data.current?.sortable?.containerId;
		let activePalletId = active?.data.current?.sortable?.index;
		let newPalletIndex: number = over?.data.current?.sortable?.index;
		let [prevShelf, prevIndexShelf] = getShelf(activePallet?.shelfId!);

		if (activePallet?.shelfId !== newShelfId) {
			let [newShelf, newIndexShelf] = getShelf(newShelfId);
			let prevPositions = [...positions];
			//remove pallet from prev shelf
			prevPositions[prevIndexShelf!]?.pallets?.splice(
				activePallet?.indexOnShelf!,
				1
			);
			if (newShelf?.pallets?.some((pallet) => pallet.numberId === "empty")) {
				prevPositions[newIndexShelf!].pallets = [activePallet?.pallet!];
			} else {
				//insert pallet on newIndex into new shelf
				prevPositions[newIndexShelf!]?.pallets?.splice(
					newPalletIndex,
					0,
					activePallet?.pallet!
				);
			}
			//if prev shelf gets empry, insert placeholder
			if (prevPositions[prevIndexShelf!]?.pallets?.length === 0) {
				prevPositions[prevIndexShelf!].pallets = [{ numberId: "empty" }];
			}
			setActivePallet((oldState) => {
				if (oldState) {
					return {
						...oldState,
						indexOnShelf: newPalletIndex,
						shelfId: newShelfId,
					};
				} else return null;
			});
			setPositions(prevPositions);
		} else {
			//doesn't considered empty shelf bc if you move something into the same shelf, it means it
			// was not empty and won't get empty after the movement
			if (activePallet?.indexOnShelf === newPalletIndex) return;

			let prevPositions = [...positions] as PalletsOnShelf[];
			prevPositions[prevIndexShelf!].pallets = arrayMove(
				prevPositions[prevIndexShelf!].pallets,
				activePallet.indexOnShelf,
				newPalletIndex
			);
			setActivePallet((oldState) => {
				if (oldState) {
					return {
						...oldState,
						indexOnShelf: newPalletIndex,
					};
				} else return null;
			});
			setPositions(prevPositions);
		}
	};

	const onDragEnd = (evt: DragEndEvent) => {
		console.log(evt, positions, activePallet);
		setActivePallet(null);
		positionRef.current = positions;
		setMovement((oldState) => {
			return { ...oldState, toShelf: activePallet?.shelfId };
		});
	};

	return { onDragStart, onDragMove, onDragEnd, positionRef, activePallet };
};
