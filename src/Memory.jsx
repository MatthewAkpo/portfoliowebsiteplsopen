import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// Card data (you can replace it with actual content)
const cardData = [
  { id: 1, content: "🍏" },
  { id: 2, content: "🍌" },
  { id: 3, content: "🍒" },
  { id: 4, content: "🍩" },
  { id: 5, content: "🍏" },
  { id: 6, content: "🍌" },
  { id: 7, content: "🍒" },
  { id: 8, content: "🍩" },

];


const Memory = () => {
  const navigate = useNavigate()
  const [cards, setCards] = useState([]);
  const [TextColor, setTextColor] = useState("blue");
  let [score,setScore] = useState(0)
  let [highScore, setHighScore] = useState(localStorage.getItem("HighScore"||0))
  const [RingColor ,setRingColor] = useState("")
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // Flag to start the game
  const [cardsRevealed, setCardsRevealed] = useState(true); // To track card reveal timing
  const [showModal, setShowModal] = useState(); // For popup modal when game is won
  const [showModal2, setShowModal2] = useState(); // For popup modal when game is won

  // Shuffle the cards
  const shuffle = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]]; // Swap elements
    }
    return cards;
  };
  const gOback=()=>{
    navigate('/personal2')
  }
  // Initialize the game with shuffled cards and show all cards for a short time
  useEffect(() => {
    const shuffledCards = shuffle([...cardData,...cardData]);
    setCards(shuffledCards);
      setCardsRevealed(false);
  }, [  ]);

  // Handle card flip
  const handleCardClick = (card) => {
    if (
        flippedCards.length === 2 || 
        flippedCards.includes(card.id) || 
        matchedCards.includes(card.id) ||
        !gameStarted
      ) {
        return;
      }
  
      setFlippedCards((prev) => [...prev, card.id]);
      if (flippedCards.length === 1) {
        const [firstCardId] = flippedCards;
        const firstCard = cards.find((card) => card.id === firstCardId);
        const secondCard = card;
        setMoves((prev) => prev + 1);
  
        if (firstCard.content === secondCard.content) {
          setMatchedCards((prev) => [...prev, firstCardId, secondCard.id]);
          setScore((prev)=> prev + (moves + (Math.floor(Math.random()*moves))) )
        }
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
  };
  
  useEffect(() => {
    if(moves === 36 && gameStarted){
      setShowModal2(true)
      setRingColor("red")
      setHighScore(score)
      localStorage.setItem("HighScore", score)
    }
    if (moves <= 5) {
      setTextColor("black")
    } else if (moves <= 10) {
      setTextColor("yellow")
    }
    else if (moves <= 15) {
      setTextColor("orange")
    }
    else if (moves <= 36) {
      setTextColor("red")
    }
  }, [moves,gameStarted])
  
  

  useEffect(() => {
    let matching = matchedCards.length*2;
    // Only show modal if all cards are matched and the game has started
    if (matching === cards.length &&  gameStarted) {
      setShowModal(true);
      setRingColor("green")
      if (score>highScore) {
        setHighScore(score)
        localStorage.setItem("HighScore",score)
      }
    }
  }, [matchedCards, cards,gameStarted]);

  // Start the game when the button is clicked
  const startGame = () => {
    setCardsRevealed(true);
    setGameStarted(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  return (
    <div  id='gun' className="min-h-screen flex flex-col justify-center items-center bg-gray-100" >
      <dd className=" fixed top-2 left-2 inset">
          <dl className="font-extrabold">High Score : {highScore}</dl>
          <dl className="font-bold">Score: {score}</dl>

      </dd>
      <div className="text-3xl font-bold mb-4">Memory  Game</div>
      <nav
       className={`text-xl mb-4 font-bold transition-all`}
       style={{
        color: TextColor
       }}
      >Moves: {moves}</nav>

      <button
      className=" bg-blue-400 font-extrabold text-4xl rounded-3xl h-20 w-20 active:bg-gray-500 scale-75"
      onClick={gOback}
      >
        ←
      </button>

      {/* Cards grid */}
      <div className="grid grid-cols-4 gap-4 p-4">
        {cards.map((card) => (
          <div
          style={
            {borderColor:RingColor
          }}
            className={`relative cursor-pointer w-24 h-24 border-4 rounded-lg transition-transform transform hover:outline-none ${flippedCards.includes(card.id) || matchedCards.includes(card.id) ? " active:ring-8 active:ring-blue-500" : " active:ring-8 active:ring-blue-300"}  ${
               flippedCards.includes(card.id) || matchedCards.includes(card.id)
                ? "bg-white"
                : "bg-gray-400"
            }`}
            onClick={() => handleCardClick(card)}
          >
            {/* Card content */}
            <div
              key={card.id}
              className={`absolute inset-0 flex justify-center items-center text-4xl font-semibold transition-opacity ${
                flippedCards.includes(card.id) || matchedCards.includes(card.id) ? "opacity-100" : "opacity-0"
              }`}
            >
              {card.content}
            </div>
            <div
              className={`absolute inset-0 bg-gray-300 rounded-lg ${
                flippedCards.includes(card.id) || matchedCards.includes(card.id) ? "opacity-0" : "opacity-100"
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Start Game Button */}
      {!gameStarted && !cardsRevealed && (
        <div className="fixed inset-0  bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <button
              className="mt-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
              onClick={startGame}
            >
              Start Game Now
            </button>
          </div>
        </div>
      )}

      {/* Modal for Congratulations */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg">
          <div className="text-2xl font-bold">Congratulations!</div>
          <div className="mt-4">You matched all the cards!</div>
          <button
            className="mt-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
            onClick={closeModal}
          >
            Close and Restart
          </button>
          <button
            className="mt-4 bg-blue-500 text-white p-3 ml-4 rounded-md hover:bg-blue-600"
            onClick={gOback}
          >
            Go Back
          </button>
        </div>
      </div>
      )}

            {/* Modal for Congratulations */}
            {showModal2 && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <div className="text-2xl font-bold">Sheesh You Failed </div>
            <div className="mt-4">Moves Expired Restart Or Pay $10</div>
            <button
              className="mt-4 bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
              onClick={closeModal}
            >
              Close and Restart
            </button>
            <button
              className="mt-4 bg-blue-500 text-white p-3 ml-4 rounded-md hover:bg-blue-600"
              onClick={gOback}            >
              Go back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Memory;
