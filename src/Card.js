import React from "react";

function Card({ card }) {
	return <img style={{ width: "100px" }} src={card.image} alt={card.code} />;
}

export default Card;
