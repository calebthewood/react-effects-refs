import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card.js";
import DrawButton from "./DrawButton.js";

const BASE_CARD_API = "http://deckofcardsapi.com/api/deck";

function Cards() {
	const [deck, setDeck] = useState({
		deckId: null,
		drawnCards: [],
		isShuffling: false,
		deckFinished: false,
	});

	useEffect(function getDeckIdOnMount() {
		async function getDeckId() {
			const resp = await axios.get(
				`${BASE_CARD_API}/new/shuffle/?deck_count=1`
			);
			setDeck(() => ({
				...deck,
				deckId: resp.data.deck_id,
			}));
		}
		getDeckId();
	}, []);

	async function drawCard() {
		const resp = await axios.get(
			`${BASE_CARD_API}/${deck.deckId}/draw/?count=1`
		);

		if (resp.data.success) {
			setDeck(() => ({
				...deck,
				drawnCards: [...deck.drawnCards, resp.data.cards[0]],
			}));
		}
		if (resp.data.remaining === 0) {
			setDeck(() => ({
				...deck,
				deckFinished: true,
			}));
		}
	}

	function renderCards() {
		return (
			<div>
				{deck.drawnCards.map((card) => (
					<Card key={card.code} card={card} />
				))}
			</div>
		);
	}

	return (
		<div>
			<DrawButton drawCard={drawCard} disabled={deck.deckFinished} />
			{renderCards()}
		</div>
	);
}

export default Cards;
