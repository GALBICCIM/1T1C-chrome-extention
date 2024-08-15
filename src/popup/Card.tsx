import React from "react";
import "./Card.css";

type Card = {
	id: string;
	src: string;
};

interface CardProps {
	card: Card;
}

const Card: React.FC<CardProps> = ({ card }) => {
	return (
		<div className="card">
			<img className="cart-front" src={card.src} alt="front" />
			<img className="cart-back" src="../static/imgs/back.jpg" alt="back" />
		</div>
	);
};

export default Card;
