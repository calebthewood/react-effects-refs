import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card.js";
import Button from "./Button.js";
import "./Cards.css";

const BASE_CARD_API = "http://deckofcardsapi.com/api/deck";
/**
 * Cards Componenet,
 * 	State: deck: { deckId: str,
 * 								drawnCards: arr,
 * 								isShuffling: bool,
 * 								deckFinished: bool }
 *
 * Renders a draw button and up to 52 cards from a given deck.
 */
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
			setDeck((deck) => ({
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
		const {success, remaining, cards} = resp.data;

		if (success) {
			setDeck((deck) => ({
				...deck,
				drawnCards: [...deck.drawnCards, cards[0]],
				deckFinished: remaining === 0,
			}));
		}
		// if (remaining === 0) {
		// 	setDeck((deck) => ({
		// 		...deck,

		// 	}));
		// }
	}

	async function shuffleCards() {
		setDeck((deck)=> ({
			...deck,
			isShuffling: true
		}));

		const resp = await axios.get(
			`${BASE_CARD_API}/${deck.deckId}/shuffle`
			);

		if (resp.data.success) {
			setDeck((deck) => ({
				...deck,
				drawnCards: [],
				deckFinished: false,
				isShuffling: false
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
		<div className="Deck-cardarea Deck">
			<Button handleClick={drawCard} btnText="GIMME A CARD" disabled={deck.deckFinished} />
			<Button handleClick={shuffleCards} btnText="Shuffle Cards" disabled={deck.isShuffling} />
			{renderCards()}
		</div>
	);
}

export default Cards;
