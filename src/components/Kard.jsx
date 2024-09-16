import React, { useEffect } from "react";
import cover from "../assets/card.jpg";
import "./Kard.css";

function Kard({ card, handleChoice, flipped, disable }) {
  const handleClick = () => {
    if (!disable) handleChoice(card);
  };
  useEffect(() => {
    const img = new Image();
    img.src = cover;
  }, []);
  return (
    <div className="card relative">
      <div className={flipped ? "flipped" : ""}>
        <img
          className="front bg-white w-[100%] block border-[2px] border-white rounded-md mb-2"
          src={card.img}
          alt="card front"
        />
        <img
          className="back w-[100%] block border-[2px] rounded-md"
          src={cover}
          alt="card back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default Kard;
