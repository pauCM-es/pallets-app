import React, { useEffect, useRef, useState } from "react";
import { DragEndEvent, DragMoveEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { ItemsByShelf, PalletItem } from "@/types/camara.types";
import { updatePositionOnShelf } from "@/helpers/camaras-interactions";
import { updateAfterMove } from "@/app/services/camara.service";
import "@/styles/EmptySpace.style.scss";
import { CamaraState } from "@/libs/features/camaras/camaraSlice";

export const useMovePalet = (
	palletsGroupedByShelf: CamaraState["palletsGroupedByShelf"]
) => {
	const initialPositionsRef = useRef<ItemsByShelf | undefined>(
		palletsGroupedByShelf
	);
	const [currentPositions, setCurrentPositions] = useState<
		ItemsByShelf | undefined
	>(palletsGroupedByShelf);
	const [activePallet, setActivePallet] = useState<PalletItem | null>(null);
	const [movement, setMovement] = useState<{
		fromShelf: undefined | string;
		toShelf: undefined | string;
	}>({
		fromShelf: undefined,
		toShelf: undefined,
	});

	useEffect(() => {
		setCurrentPositions(palletsGroupedByShelf);
		initialPositionsRef.current = palletsGroupedByShelf;
	}, [palletsGroupedByShelf]);

	useEffect(() => {
		if (!movement.fromShelf || !movement.toShelf || !currentPositions)
			return;
		const shelvesInvolved: ItemsByShelf = {
			[movement.fromShelf]: currentPositions[movement.fromShelf],
			[movement.toShelf]: currentPositions[movement.toShelf],
		};

		updateAfterMove(shelvesInvolved)
			.then((res) => {
				initialPositionsRef.current = currentPositions;
				console.log(res.data);
			})
			.catch((error) => {
				setCurrentPositions(initialPositionsRef.current);
				console.log("error :", error);
			});
		console.log("shelvesInvolved :", shelvesInvolved);
		setMovement({ fromShelf: undefined, toShelf: undefined });
	}, [movement]);

	const onDragStart = (evt: DragStartEvent) => {
		if (!currentPositions) return;

		const id = evt.active.id;
		const shelf: string = evt.active.data.current?.sortable.containerId;
		const index = evt.active.data.current?.sortable.index;
		const activePalletData = initialPositionsRef.current?.[shelf][index];

		if (activePalletData?.numberId !== "empty") {
			activePalletData && setActivePallet(activePalletData);
			setMovement((oldState) => {
				return { ...oldState, fromShelf: shelf };
			});
		}
	};

	const onDragMove = (evt: DragMoveEvent) => {
		if (!activePallet || !activePallet?.position || !currentPositions)
			return;

		const { active, over } = evt;
		let activePalletId = active?.data.current?.sortable?.index;

		let prevShelfId = activePallet.position.shelfId;
		let newShelfId: string = over?.data.current?.sortable?.containerId;
		let newPalletIndex: number = over?.data.current?.sortable?.index;

		//move involve diferent shelves
		if (prevShelfId !== newShelfId) {
			let prevPositions = { ...currentPositions };

			//remove pallet from prev shelf and update it if there's still items on it.
			prevPositions[prevShelfId].splice(activePallet.position.index, 1);
			if (prevPositions[prevShelfId].length) {
				prevPositions[prevShelfId] = updatePositionOnShelf(
					prevPositions[prevShelfId]
				);
				console.log(
					"updating prev shelf to:",
					prevPositions[prevShelfId]
				);
			}
			console.log(
				"NO update prev shelf. to:",
				prevPositions[prevShelfId]
			);

			const palletUpdated = {
				...activePallet,
				position: {
					...activePallet.position,
					shelfId: newShelfId,
					index: newPalletIndex,
				},
			};
			if (!prevPositions[newShelfId]?.length) {
				prevPositions[newShelfId] = [palletUpdated];
			} else {
				//insert pallet on newIndex into new shelf
				prevPositions[newShelfId]?.splice(
					newPalletIndex,
					0,
					palletUpdated
				);
				prevPositions[newShelfId] = updatePositionOnShelf(
					prevPositions[newShelfId]
				);
			}

			// if prev shelf gets empry, insert placeholder
			// if (prevPositions[prevShelfId]?.length === 0) {
			// 	prevPositions[prevShelfId] = [{ numberId: "empty" }];
			// }

			// update position on pallet
			setActivePallet(palletUpdated);

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
		console.log("Positions on END :", currentPositions);

		setActivePallet(null);
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
