import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";


const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const VisualMemory = () => {
    const navigate = useNavigate();

  const [isOn, setIsOn] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const numberList = Array.from(Array(36).keys()).map((i) => i.toString());

  const initPlay = {
    isDisplay: false,
    userTurn: false,
    score: 7,
    correct: 0,
    tilePattern: [],
    userGuess: [],
    mask: [],
    userCorrect: []
  };

  const [play, setPlay] = useState(initPlay);
  const [flashTile, setFlashTile] = useState([]);
  const [wrongTile, setWrongTile] = useState([]);
  const [rewardTile, setRewardTile] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerTrial, setPlayerTrial] = useState(0);

  // Turn on game
  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  // Select next tile in sequence
  useEffect(() => {
    if (isOn && play.isDisplay) {
      let patternIdsSet = new Set();
      let maskTrue = Array.from(Array(25).keys()).map(() => true);
      let maskFalse = Array.from(Array(25).keys()).map(() => false);
      let maskDistribution = maskTrue.concat(maskFalse);
      let mask = maskDistribution.sort(() => 0.5 - Math.random());

      while (patternIdsSet.size < play.score) {
        patternIdsSet.add(Math.floor(Math.random() * 36).toString());
      }

      let patternIds = Array.from(patternIdsSet);
      setPlay({ ...play, tilePattern: patternIds, mask: mask });
    }
  }, [isOn, play.isDisplay]);

  // Display sequence of tiles
  useEffect(() => {
    if (playerTrial > 9) {
        localStorage.setItem('playerScores', playerScore);
      setIsOver(true);
      setIsOn(false);
      // setTimeout(() => {
      //   navigate('/results');
      // }, 2000);
      <button onClick={() => navigate('/results')}>
  Results
</button>

    } else if (isOn && play.isDisplay && play.tilePattern.length) {
      displayTiles();
    }
  }, [isOn, play.isDisplay, play.tilePattern.length]);

  async function displayTiles() {
    await timeout(1000);
    setFlashTile(play.tilePattern);

    if (play.mask[playerTrial]) {
      await timeout(1000);
      setFlashTile(numberList);
    }

    await timeout(1000);
    setFlashTile([]);
    setPlay({ ...play, isDisplay: false, userTurn: true });
  }

  async function tileClickHandle(number) {
    if (!play.isDisplay && play.userTurn) {
      let userGuess = number.toString();
      play.userGuess.push(userGuess);
      
      if (play.tilePattern.includes(userGuess)) {
        let correct = play.userGuess.filter(guess => play.tilePattern.includes(guess));
        setFlashTile(correct);
        
        if (play.tilePattern.length === new Set(play.userGuess).size) {
          await timeout(500);
          setRewardTile(play.tilePattern);
          await timeout(500);
          setRewardTile([]);
          setFlashTile(numberList);
          await timeout(500);
          setFlashTile([]);

          setPlayerTrial(playerTrial + 1);
          setPlayerScore(playerScore + 1);

          setPlay({
            ...play,
            isDisplay: true,
            userTurn: false,
            userCorrect: [...play.userCorrect, 1],
            tilePattern: [],
            userGuess: []
          });
        }
      } else {
        setFlashTile([userGuess]);
        setWrongTile([userGuess]);
        await timeout(500);
        setWrongTile([]);
        setFlashTile(numberList);
        await timeout(500);
        setFlashTile([]);

        setPlayerTrial(playerTrial + 1);

        setPlay({
          ...play,
          isDisplay: true,
          userTurn: false,
          userCorrect: [...play.userCorrect, 0],
          tilePattern: [],
          userGuess: []
        });
      }
    }
  }

  const TitleScreen = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold text-white">Visual Memory</h1>
      <div className="text-6xl">🧠</div>
      <p className="text-white text-lg text-center max-w-md">
        Remember the 7 tile pattern on a 6 x 6 grid.
        The game is repeated 10 times.
      </p>
      <button
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-md font-semibold text-white transition-colors"
        onClick={() => setIsOn(true)}
      >
        Start
      </button>
    </div>
  );

  const GameBoard = () => (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-6 gap-1">
        {numberList.map((v) => (
          <button
            key={v}
            className={`aspect-square rounded-md transition-all duration-200 ${
              rewardTile.includes(v)
                ? 'bg-green-400'
                : wrongTile.includes(v)
                ? 'bg-red-500'
                : 'bg-white'
            } ${
              flashTile.includes(v) ? 'opacity-100' : 'opacity-20'
            } hover:opacity-30`}
            onClick={() => tileClickHandle(v)}
          />
        ))}
      </div>
      <div className="mt-6 text-center text-white text-lg">
        Trial: {playerTrial + 1}/10 | Score: {playerScore}
      </div>
    </div>
  );

  const GameOver = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className="text-4xl font-bold text-white mb-4">Visual Memory</h1>
      <h2 className="text-2xl font-semibold text-white">
        Score: {playerScore} / 10
      </h2>
      <h3 className="text-3xl font-bold text-white mt-4">
        Thank you for playing!
      </h3>
      <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-200"
              onClick={() => navigate('/results')}
            >
              Results
            </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex items-center justify-center">
        {!isOn && !isOver && <TitleScreen />}
        {isOn && <GameBoard />}
        {isOver && <GameOver />}
      </div>
    </div>
  );
};

export default VisualMemory;