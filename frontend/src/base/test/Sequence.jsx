import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";


const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Sequence = () => {
    const navigate = useNavigate();

  const { theme } = useTheme();
  const [isOn, setIsOn] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const numberList = Array.from(Array(16).keys()).map((i) => i.toString());

  const initPlay = {
    isDisplay: false,
    userTurn: false,
    score: 0,
    tileSequence: [],
    userGuess: [],
    prevTile: ''
  };

  const [play, setPlay] = useState(initPlay);
  const [flashTile, setFlashTile] = useState('');
  const [playerScore, setPlayerScore] = useState(0);

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let tileID = Math.floor(Math.random() * 16);
      if (play.tileSequence.length > 0 && numberList[tileID] === play.prevTile) {
        tileID = tileID === 15 ? 0 : tileID + 1;
      }
      const newTile = numberList[tileID];
      const copySequence = [...play.tileSequence, newTile];
      setPlay({ ...play, prevTile: newTile, tileSequence: copySequence });
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.tileSequence.length) {
      displayTiles();
    }
  }, [isOn, play.isDisplay, play.tileSequence.length]);

  async function displayTiles() {
    await timeout(500);
    for (let i = 0; i < play.tileSequence.length; i++) {
      await timeout(300);
      setFlashTile(play.tileSequence[i]);
      await timeout(300);
      setFlashTile('');

      if (i === play.tileSequence.length - 1) {
        setPlay({
          ...play,
          isDisplay: false,
          userTurn: true,
          userGuess: [...play.tileSequence].reverse()
        });
      }
    }
  }

  async function tileClickHandle(number) {
    if (!play.isDisplay && play.userTurn) {
      const copyTiles = [...play.userGuess];
      const lastTile = copyTiles.pop();
      setFlashTile(number.toString());

      if (number.toString() === lastTile) {
        if (copyTiles.length) {
          setPlay({ ...play, userGuess: copyTiles });
        } else {
          setPlay({
            ...play,
            isDisplay: true,
            userTurn: false,
            score: play.tileSequence.length,
            userGuess: []
          });
        }
      } else {
        await timeout(200);
        setPlayerScore(play.score);
        localStorage.setItem('sequence', play.score);

        setPlay({ ...initPlay, score: play.tileSequence.length });
        setIsOn(false);
        setIsOver(true);
        // setTimeout(() => {
        //     navigate('/test5');
        //   }, 2000);
        <button onClick={() => navigate('/test5')}>
  Next
</button>

      }
      await timeout(200);
      setFlashTile('');
    }
  }

  const TitleScreen = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Sequence Memory
      </h1>
      <div className="text-6xl">🧠</div>
      <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        Remember the sequence of tiles!
      </p>
      <button
        className={`px-6 py-3 rounded-md font-semibold transition-colors ${
          theme === 'dark' ? 'bg-yellow-500 hover:bg-yellow-400 text-gray-900' : 'bg-blue-500 hover:bg-blue-400 text-white'
        }`}
        onClick={() => setIsOn(true)}
      >
        Start
      </button>
    </div>
  );

  const GameBoard = () => (
    <div className="w-full max-w-md">
      <div className={`text-2xl mb-4 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        Level: {play.score}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {numberList.map((v) => (
          <button
            key={v}
            className={`aspect-square rounded-md transition-opacity duration-200 ${
              flashTile === v
                ? theme === 'dark' ? 'bg-yellow-400' : 'bg-blue-400'
                : theme === 'dark' ? 'bg-gray-700 opacity-70' : 'bg-gray-300 opacity-70'
            }`}
            onClick={() => tileClickHandle(v)}
          />
        ))}
      </div>
    </div>
  );

  const GameOver = () => (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Sequence Memory
      </h1>
      <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        Level: {playerScore}
      </h2>
      <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-200"
              onClick={() => navigate('/test5')}
            >
              Next
            </Button>
    </div>
  );

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="w-full max-w-xl">
        {!isOn && !isOver && <TitleScreen />}
        {isOn && <GameBoard />}
        {isOver && <GameOver />}
      </div>
    </div>
  );
};

export default Sequence;
