import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Timer, Trophy } from "lucide-react";
import { useTheme } from '../../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom';

// Ambient background component with animated gradient


const AnimatedBackground = ({theme}) => (
   

    <div className="fixed inset-0 -z-10">
    <div
      className={`absolute inset-0 ${theme === 'dark'
        ? 'bg-gray-800 text-white border-gray-700'
        : 'bg-white/10 backdrop-blur-lg text-white border-white/20'} animate-[gradient_10s_infinite]`}
      
    />
    <div
      className={`absolute inset-0 opacity-20 ${theme === 'dark'
        ? 'bg-gray-800 text-white border-gray-700'
        : 'bg-white/10 backdrop-blur-lg text-white border-white/20'}`}
      
    />
  </div>
);

const Board = ({ children }) => {
    const { theme } = useTheme();
  
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <AnimatedBackground theme={theme} />
        <div className="relative z-10">{children}</div>
      </div>
    );
  };

const Titlescreen = ({ title, symbol, button, children, onStatusChange }) => (
  <div className="text-center space-y-6 animate-fade-in">
    <div className="mb-8">
      <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
        {title}
      </h1>
      <div className="text-7xl mb-6 animate-[bounce_2s_infinite]">{symbol}</div>
      <p className="text-xl text-slate-300 leading-relaxed max-w-md mx-auto">
        {children}
      </p>
    </div>
    <Button
      variant="default"
      size="lg"
      onClick={() => onStatusChange(true)}
      className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-200"
    >
      {button}
    </Button>
  </div>
);

const OneToFifty = () => {
    const [isOn, setIsOn] = useState(false);
    const { theme } = useTheme();
    const navigate = useNavigate();

    const [isOver, setIsOver] = useState(false);
    const initPlay = {
      time: 0,
      numberListDisplay: [],
      numberListExtra: [],
      clicked: [],
      currentNumber: 1
    };
  
    const [play, setPlay] = useState(initPlay);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [lastClicked, setLastClicked] = useState(null);
  
    useEffect(() => {
      let interval = null;
      if (isRunning) {
        interval = setInterval(() => {
          setTime(time => time + 0.01);
        }, 10);
      } else if (!isRunning && time !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isRunning, time]);
  
    useEffect(() => {
      if (isOn) {
        setIsRunning(true);
      }
    }, [isOn]);
  
    useEffect(() => {
      const shuffle = array => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
  
      const numberList_1to25 = Array.from({ length: 25 }, (_, i) => i + 1);
      const numberList_26to50 = Array.from({ length: 25 }, (_, i) => i + 26);
  
      shuffle(numberList_1to25);
      shuffle(numberList_26to50);
  
      setPlay({
        ...play,
        numberListDisplay: numberList_1to25,
        numberListExtra: numberList_26to50
      });
    }, [isOn]);
  
    async function tileClickHandle(number) {
      if (number === play.currentNumber && play.currentNumber !== 50) {
        setLastClicked(number);
        const copySequence = [...play.clicked, number];
        if (number < 26) {
          play.numberListDisplay = play.numberListDisplay.map(n =>
            n === number ? play.numberListExtra.pop() : n
          );
        }
        setPlay({
          ...play,
          clicked: copySequence,
          currentNumber: play.currentNumber + 1
        });
      } else if (play.currentNumber === 50) {
        const finalScore = Math.floor(time);
    setPlayerScore(finalScore);
    console.log(finalScore);
    
    localStorage.setItem('oneToFifty', finalScore);

        setPlay({ ...initPlay, time: time });
        setIsRunning(false);
        setTime(0);
        setIsOn(false);
        setIsOver(true);
        // setTimeout(() => {
        //     navigate('/test3');
        //   }, 2000);
        <button onClick={() => navigate('/test3')}>
  Next
</button>

      }
    }
  
    if (isOn) {
      return (
        <Board>
          <Card className="bg-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-2xl animate-fade-in">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6 bg-slate-800/60 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Timer className="h-6 w-6 text-blue-400" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                    Time:
                  </span>
                </div>
                <span className="text-2xl font-mono font-bold text-blue-400">
                  {Math.round(time * 100) / 100}s
                </span>
              </div>
              <div className="grid grid-cols-5 gap-3 max-w-[400px] mx-auto">
                {play.numberListDisplay &&
                  play.numberListDisplay.map((v) => (
                    <Button
                      key={v}
                      variant={v < 26 ? "outline" : "secondary"}
                      className={`
                        h-16 w-full relative overflow-hidden
                        ${play.clicked.includes(v) ? 'opacity-0 pointer-events-none transition-opacity duration-500' : 'opacity-100'}
                        ${v < 26 
                          ? 'bg-gradient-to-br from-slate-800 to-slate-900 hover:from-blue-500 hover:to-purple-500 border-slate-700 hover:border-blue-400' 
                          : 'bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700'
                        }
                        ${lastClicked === v ? 'bg-green-500 animate-pulse' : ''}
                        transform hover:scale-105 transition-transform duration-200
                      `}
                      onClick={() => tileClickHandle(v)}
                    >
                      <span className={`text-2xl font-bold ${v < 26 ? 'text-slate-200' : 'text-white'}`}>
                        {v}
                      </span>
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </Board>
      );
    } else if (isOver) {
      return (
        <Board>
          <div className="text-center space-y-8 animate-fade-in">
            <Trophy className="w-24 h-24 mx-auto text-yellow-400 animate-bounce" />
            <div>
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                Game Complete!
              </h1>
              <h2 className="text-6xl font-bold text-white mb-2">
                {playerScore}s
              </h2>
              <p className="text-slate-400 text-lg">Final Time</p>
            </div>
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-200"
              onClick={() => navigate('/test3')}
            >
              Next
            </Button>
          </div>
        </Board>
      );
    }
  
    return (
      <Board>
        <Titlescreen
          title="1 to 50"
          symbol="🔢"
          button="Start Game"
          onStatusChange={setIsOn}
        >
          Click numbers in ascending order from 1 to 50 as fast as possible!
        </Titlescreen>
      </Board>
    );
  };
  
  export default OneToFifty;