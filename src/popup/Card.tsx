import React from "react";
import "./Card.css";

type Card = {
	id: string;
	src: string;
};

interface CardProps {
	card: Card;
	handleChoice(card: Card): void;
	flipped: boolean;
}

const Card: React.FC<CardProps> = ({ card, handleChoice, flipped }) => {
	const clickedCard = () => {
		handleChoice(card);
	};

	return (
		<div className="card">
			{flipped ? <img className="card-front" src={card.src} alt="front" /> : <img className="card-back" onClick={clickedCard} src="/imgs/back.jpg" alt="back" />}
		</div>
	);
};

export default Card;
