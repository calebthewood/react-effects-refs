import React from "react";

function DrawButton({ drawCard, disabled }) {
	return (
		<button onClick={drawCard} disabled={disabled}>
			GIMME A CARD!
		</button>
	);
}

export default DrawButton;
