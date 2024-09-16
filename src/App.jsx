/* eslint-disable no-unused-vars */

import c1 from "./assets/1.png";
import c2 from "./assets/2.png";
import c3 from "./assets/3.png";
import c4 from "./assets/4.png";
import c5 from "./assets/5.png";
import c6 from "./assets/6.png";
import c7 from "./assets/7.png";
import c8 from "./assets/8.png";
import c9 from "./assets/9.png";
import { useEffect, useState } from "react";
import Kard from "./components/Kard";

const cardImages = [c1, c2, c3, c4, c5, c6];

function preloadImages(images) {
  images.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
}

function App() {
  const [cards, setCards] = useState([]);
  const [ch1, setCh1] = useState(null);
  const [ch2, setCh2] = useState(null);
  const [disable, setDisable] = useState();

  const shuffle = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        img: card,
        matched: false,
        id: Math.random(),
      }));

    setCards(shuffledCards);
  };

  // Handle choice
  const handleChoice = (card) => {
    ch1 ? setCh2(card) : setCh1(card);
  };

  // Compare choices
  useEffect(() => {
    if (ch1 && ch2) {
      setDisable(true);
      if (ch1.img === ch2.img) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.img === ch1.img) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => {
          reset();
        }, 1200);
      }
    }
  }, [ch1, ch2]);

  // Reset choices
  const reset = () => {
    setCh1(null);
    setCh2(null);
    setDisable(false);
  };

  // Preload images on mount
  useEffect(() => {
    preloadImages(cardImages);
    shuffle();
  }, []);

  return (
    <>
      <div className="max-w-[860px] my-[40px] mx-auto flex flex-col items-center">
        <button
          className="  px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={shuffle}
        >
          Shuffle Cards
        </button>
        <div className="card-grid grid mt-[40px]  grid-cols-4 gap-[10px]">
          {cards.map((card) => (
            <Kard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === ch1 || card === ch2 || card.matched}
              disable={disable}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
