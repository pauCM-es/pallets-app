import React, { useEffect, useRef, useState } from "react";
import { DragEndEvent, DragMoveEvent, DragStartEvent } from "@dnd-kit/core";
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Pallet } from "@prisma/client";
import { EmptyShelf } from "@/types/shelf.types";
// import { updateAfterMove } from "@/app/services/camara.service";
import { ItemsByShelf, PalletItem } from "@/types/camara.types";
import { updatePositionOnShelf } from "@/helpers/camaras-interactions";
import "@/styles/EmptySpace.style.scss";

export const useMovePalet = (itemsGroupedByShelf: ItemsByShelf) => {
	const initialPositionsRef = useRef<ItemsByShelf>(itemsGroupedByShelf);
	const [currentPositions, setCurrentPositions] =
		useState<ItemsByShelf>(itemsGroupedByShelf);
	const [activePallet, setActivePallet] = useState<PalletItem | null>(null);
	const [movement, setMovement] = useState<{
		fromShelf: undefined | string;
		toShelf: undefined | string;
	}>({
		fromShelf: undefined,
		toShelf: undefined,
	});

	// useEffect(() => {
	// if (!movement.fromShelf || !movement.toShelf) return;
	// const shelvesInvolved = positions
	// 	.filter(
	// 		(shelf) =>
	// 			shelf.shelfId === movement.fromShelf ||
	// 			shelf.shelfId === movement.toShelf
	// 	)
	// 	.map((shelf) => {
	// 		if (
	// 			shelf.pallets.length === 1 &&
	// 			shelf.pallets[0].numberId === "empty"
	// 		) {
	// 			const mapShelf = { ...shelf, pallets: [] };
	//
	// 			return mapShelf as PalletsOnShelf;
	// 		} else {
	// 			return shelf;
	// 		}
	// 	});
	//
	// updateAfterMove(shelvesInvolved as PalletsOnShelf[])
	// 	.then((res) => {
	//
	// 	})
	// 	.catch((error) => {
	// 		//TODO: undo movement.
	//
	// 	});
	// setMovement({ fromShelf: undefined, toShelf: undefined });
	// }, [movement]);

	// useEffect(() => {
	// 	if (!activePallet) return;

	// }, [activePallet, currentPositions]);

	const onDragStart = (evt: DragStartEvent) => {
		const id = evt.active.id;
		const shelf: string = evt.active.data.current?.sortable.containerId;
		const index = evt.active.data.current?.sortable.index;
		const activePalletData = initialPositionsRef.current[shelf][index];
		console.log("activePalletData :", activePalletData);

		if (activePalletData?.numberId !== "empty") {
			activePalletData && setActivePallet(activePalletData);
			setMovement((oldState) => {
				return { ...oldState, fromShelf: shelf };
			});
		}
	};

	const onDragMove = (evt: DragMoveEvent) => {
		if (!activePallet || !activePallet?.position) return;

		const { active, over } = evt;
		let activePalletId = active?.data.current?.sortable?.index;

		let prevShelfId = activePallet.position.shelfId;
		let newShelfId: string = over?.data.current?.sortable?.containerId;
		let newPalletIndex: number = over?.data.current?.sortable?.index;

		if (prevShelfId !== newShelfId) {
			let prevPositions = { ...currentPositions };
			console.log("prevShelfId :", activePallet.position);
			console.log("prevPositions :", prevPositions);
			//remove pallet from prev shelf

			prevPositions[prevShelfId].splice(activePallet.position.index, 1);
			prevPositions[prevShelfId] = updatePositionOnShelf(
				prevPositions[prevShelfId]
			);

			// if (!prevPositions[newShelfId]?.length) {
			// 	prevPositions[newShelfId] = [activePallet];
			// } else {

			//insert pallet on newIndex into new shelf
			prevPositions[newShelfId]?.splice(newPalletIndex, 0, activePallet);
			prevPositions[newShelfId] = updatePositionOnShelf(
				prevPositions[newShelfId]
			);

			// }

			// if prev shelf gets empry, insert placeholder
			// if (prevPositions[prevShelfId]?.length === 0) {
			// 	prevPositions[prevShelfId] = [{ numberId: "empty" }];
			// }

			setActivePallet((oldState) => {
				if (oldState) {
					return {
						...oldState,
						position: {
							...oldState.position,
							shelfId: newShelfId,
							index: newPalletIndex,
						},
					};
				} else return null;
			});
			setCurrentPositions(prevPositions);
		} else {
			//doesn't considered empty shelf bc if you move something into the same shelf, it means it
			// was not empty and won't get empty after the movement
			if (
				+activePallet?.position.index === newPalletIndex ||
				newPalletIndex > currentPositions[newShelfId].length - 1
			)
				return;

			let prevPositions = { ...currentPositions };

			prevPositions[activePallet.position.shelfId] = arrayMove(
				prevPositions[activePallet.position.shelfId],
				+activePallet?.position.index,
				newPalletIndex
			);
			prevPositions[activePallet.position.shelfId] =
				updatePositionOnShelf(
					prevPositions[activePallet.position.shelfId]
				);

			setActivePallet((oldState) => {
				if (oldState) {
					return {
						...oldState,
						position: {
							...oldState.position,
							index: newPalletIndex,
						},
					};
				} else return null;
			});
			setCurrentPositions(prevPositions);
		}
	};

	const onDragEnd = (evt: DragEndEvent) => {
		setActivePallet(null);
		initialPositionsRef.current = currentPositions;
		setMovement((oldState) => {
			return { ...oldState, toShelf: activePallet?.position.shelfId };
		});
	};

	return {
		onDragStart,
		onDragMove,
		onDragEnd,
		initialPositionsRef,
		activePallet,
		currentPositions,
	};
};
