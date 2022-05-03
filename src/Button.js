import React from "react";
//take 3 pieces of state, handleClick, disabled, btnText. Would make btn comp. more reusable.
function Button({ handleClick, btnText, disabled }) {
	return (
		<button className="Deck-gimme" onClick={handleClick} disabled={disabled}>
			{btnText}
		</button>
	);
}

export default Button;
