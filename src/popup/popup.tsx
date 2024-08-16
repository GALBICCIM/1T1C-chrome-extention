import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import Card from "./Card";
import "./popup.css";

const CARD_IMAGES = [
	{
		src: "/imgs/symbol-1.jpg",
		matched: false
	},
	{
		src: "/imgs/symbol-2.jpg",
		matched: false
	},
	{
		src: "/imgs/symbol-3.jpg",
		matched: false
	},
	{
		src: "/imgs/symbol-4.jpg",
		matched: false
	},
	{
		src: "/imgs/symbol-5.jpg",
		matched: false
	},
	{
		src: "/imgs/symbol-6.jpg",
		matched: false
	}
];

const turnStyle = {
	marginLeft: "10px",
	fontSize: "25px",
	color: "orange"
};

const App: React.FC<{}> = () => {
	const [isStart, setStart] = useState(false);
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceFirst, setChoiceFirst] = useState(null);
	const [choiceSecond, setChoiceSecond] = useState(null);

	const clickBtn = () => {
		console.log("The game was started.");
		setStart((prev) => !prev);

		// 카드 섞기
		const suffledCards = [...CARD_IMAGES, ...CARD_IMAGES]
			.sort(() => Math.random() - 0.5)
			.map((cardSrc) => ({
				id: Math.random(),
				...cardSrc
			}));

		setCards(suffledCards);
		setTurns(0);
	};

	const handleChoice = (card: Card) => {
		// console.log(card);
		choiceFirst ? setChoiceSecond(card) : setChoiceFirst(card);
	};

	const distinctionCard = () => {
		// 카드 두 개가 선택되어 있을 때
		if (choiceFirst && choiceSecond) {
			if (choiceFirst.src === choiceSecond.src) {
				console.log("카드가 같음.");
				setCards((prevCards) => {
					return prevCards.map((card) => {
						if (card.src === choiceFirst.src) {
							return {
								...card,
								matched: true
							};
						} else {
							return card;
						}
					});
				});

				resetTurn();
			} else {
				console.log("카드가 다름.");
				setTimeout(() => resetTurn(), 1000);
			}
		}
	};

	const resetTurn = () => {
		setChoiceFirst(null);
		setChoiceSecond(null);
		setTurns((prev) => prev + 1);

		console.log(turns);
	};

	useEffect(distinctionCard, [choiceFirst, choiceSecond]);
	return (
		<div>
			<h1>메모리 게임</h1>
			<button className="start-btn" onClick={clickBtn}>
				시작
			</button>
			{isStart ? <span style={turnStyle}>Try : {turns}</span> : ""}

			<div className="card-grid">
				{cards.map((card) => (
					<Card key={card.id} card={card} handleChoice={handleChoice} flipped={card === choiceFirst || card === choiceSecond || card.matched} />
				))}
			</div>
		</div>
	);
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
