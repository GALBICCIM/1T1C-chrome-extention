import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Card from "./Card";
import "./popup.css";

const CARD_IMAGES = [
	{
		src: "../static/imgs/symbol-1.jpg",
		matched: false
	},
	{
		src: "../static/imgs/symbol-2.jpg",
		matched: false
	},
	{
		src: "../static/imgs/symbol-3.jpg",
		matched: false
	},
	{
		src: "../static/imgs/symbol-4.jpg",
		matched: false
	},
	{
		src: "../static/imgs/symbol-5.jpg",
		matched: false
	},
	{
		src: "../static/imgs/symbol-6.jpg",
		matched: false
	}
];

const App: React.FC<{}> = () => {
	const [cards, setCards] = useState([]);
	const [turn, setTurn] = useState(0);

	const clickBtn = () => {
		// 카드 섞기
		const suffledCards = [...CARD_IMAGES, ...CARD_IMAGES]
			.sort(() => Math.random() - 0.5)
			.map((cardSrc) => ({
				id: Math.random(),
				...cardSrc
			}));

		setCards(suffledCards);
		setTurn(0);
	};

	return (
		<div>
			<h1>메모리 게임</h1>
			<button className="start-btn" onClick={clickBtn}>
				시작
			</button>

			<div className="card-grid">
				{cards.map((card) => (
					<Card key={card.id} card={card} />
				))}
			</div>
		</div>
	);
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
