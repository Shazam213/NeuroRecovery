// import { useEffect, useState, useRef } from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";

// function MentalMath() {
//   const [isOn, setIsOn] = useState(false);
//   const [isOver, setIsOver] = useState(false);
//   const [value, setValue] = useState('');
//   const [lastScore, setLastScore] = useState(null);
//   const inputRef = useRef(null);

//   const initPlay = {
//     score: 0,
//     numberOne: getRandom(),
//     numberTwo: getRandom(),
//   };

//   const [play, setPlay] = useState(initPlay);
//   const [time, setTime] = useState(30);
//   const [isRunning, setIsRunning] = useState(false);
//   const [playerScore, setPlayerScore] = useState(0);

//   // Auto focus effect when game starts
//   useEffect(() => {
//     if (isOn && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isOn]);

//   useEffect(() => {
//     if (isOn) {
//       setIsRunning(true);
//     }
//   }, [isOn]);

//   function getRandom() {
//     return Math.floor(Math.random() * 10 + 2);
//   }

//   useEffect(() => {
//     let interval = null;
//     if (isRunning) {
//       if (time < 0) {
//         setPlayerScore(play.score);
//         setLastScore(play.score);
//         setPlay(initPlay);
//         setTime(30);
//         setIsRunning(false);
//         setIsOn(false);
//         setIsOver(true);
//       }
//       interval = setInterval(() => {
//         setTime((time) => time - 1);
//       }, 1000);
//     } else if (!isRunning && time !== 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isRunning, time]);

//   async function handleInputChange(e) {
//     const inputValue = e.target.value;
//     setValue(inputValue);
//     const answer = play.numberOne * play.numberTwo;
//     if (inputValue == answer) {
//       const gameContainer = document.querySelector('.game-container');
//       gameContainer?.classList.add('correct-answer');
//       setTimeout(() => {
//         gameContainer?.classList.remove('correct-answer');
//       }, 300);
      
//       setPlay({
//         ...play,
//         numberOne: getRandom(),
//         numberTwo: getRandom(),
//         score: play.score + 1,
//       });
//       setValue('');
//     }
//   }

//   const handleKeyDown = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//     }
//   };

//   if (isOn) {
//     return (
//       <Board>
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="space-y-8 game-container"
//         >
//           <div className="flex justify-between items-center">
//             <Level>{play.score}</Level>
//             <div className={`text-2xl font-bold rounded-full px-6 py-2 ${
//               time <= 10 ? 'bg-red-500/20 text-red-300 animate-pulse' : 'bg-blue-500/20 text-blue-300'
//             }`}>
//               {time}s
//             </div>
//           </div>
          
//           <div className="flex flex-col items-center space-y-6">
//             <motion.div
//               key={play.numberOne + play.numberTwo}
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               className="text-5xl font-bold text-white text-center bg-white/5 rounded-lg px-8 py-4"
//             >
//               {play.numberOne} × {play.numberTwo}
//             </motion.div>
            
//             <input
//               ref={inputRef}
//               type="number"
//               value={value}
//               onKeyDown={handleKeyDown}
//               onChange={handleInputChange}
//               className="w-40 h-20 text-4xl text-center bg-white/20 rounded-lg border-2 border-white/20 
//                        text-white placeholder-white/30 focus:outline-none focus:border-white/40 
//                        focus:ring-2 focus:ring-white/40 transition-all duration-200"
//               style={{
//                 caretColor: 'white',
//                 textShadow: '0 0 10px rgba(255,255,255,0.3)'
//               }}
//               autoFocus
//             />
//           </div>
//         </motion.div>

//         <style jsx global>{`
//           .game-container.correct-answer {
//             animation: flash 0.3s ease-out;
//           }

//           @keyframes flash {
//             0% { background-color: rgba(255, 255, 255, 0); }
//             50% { background-color: rgba(255, 255, 255, 0.2); }
//             100% { background-color: rgba(255, 255, 255, 0); }
//           }

//           input[type=number]::-webkit-inner-spin-button, 
//           input[type=number]::-webkit-outer-spin-button { 
//             -webkit-appearance: none; 
//             margin: 0; 
//           }
//           input[type=number] {
//             -moz-appearance: textfield;
//           }
//         `}</style>
//       </Board>
//     );
//   } else if (isOver) {
//     return (
//       <Board>
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center space-y-8"
//         >
//           <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-4">
//             Game Over!
//           </h1>
          
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ delay: 0.2, type: "spring" }}
//             className="text-7xl font-bold text-white mb-8"
//           >
//             {playerScore}
//           </motion.div>
          
//           <p className="text-blue-200 text-xl mb-8">
//             {playerScore > (lastScore || 0) ? "New High Score! 🎉" : "Great effort! 👏"}
//           </p>
          
//           <Button
//             variant="outline"
//             size="lg"
//             onClick={() => {
//               setIsOn(true);
//               setIsOver(false);
//             }}
//             className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 transition-all duration-300 text-lg px-8 py-6"
//           >
//             Play again
//           </Button>
//         </motion.div>
//       </Board>
//     );
//   } else {
//     return (
//       <Board>
//         <Titlescreen
//           title="Mental Math"
//           symbol="🧮"
//           button="Start Game"
//           onStatusChange={setIsOn}
//         >
//           Challenge your multiplication skills! Solve as many problems as you can in 30 seconds.
//         </Titlescreen>
//       </Board>
//     );
//   }
// }

// // Board component with gradient background
// const Board = ({ children }) => (
//   <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
//     <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
//       <CardContent className="p-8">
//         {children}
//       </CardContent>
//     </Card>
//   </div>
// );

// // Enhanced Level component
// const Level = ({ children }) => (
//   <div className="relative">
//     <div className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
//       Level: {children}
//     </div>
//   </div>
// );

// // Enhanced Titlescreen component
// const Titlescreen = ({ title, symbol, button, onStatusChange, children }) => (
//   <motion.div 
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="text-center"
//   >
//     <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
//       {title}
//     </h1>
//     <div className="text-8xl mb-8 animate-bounce">{symbol}</div>
//     <p className="text-xl mb-10 text-blue-100 max-w-md mx-auto leading-relaxed">
//       {children}
//     </p>
//     <Button 
//       variant="outline"
//       size="lg"
//       onClick={() => onStatusChange(true)}
//       className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 transition-all duration-300 text-lg px-8 py-6"
//     >
//       {button}
//     </Button>
//   </motion.div>
// );

// export default MentalMath;

import { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';


function MentalMath() {
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [value, setValue] = useState('');
  const [lastScore, setLastScore] = useState(null);
  const inputRef = useRef(null);

  const initPlay = {
    score: 0,
    numberOne: getRandom(),
    numberTwo: getRandom(),
  };

  const [play, setPlay] = useState(initPlay);
  const [time, setTime] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);

  // Retrieve last score from localStorage when component mounts
  useEffect(() => {
    const storedScore = localStorage.getItem('playerScore');
    if (storedScore) {
      setLastScore(parseInt(storedScore, 10));
    }
  }, []);

  // Auto focus effect when game starts
  useEffect(() => {
    if (isOn && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn) {
      setIsRunning(true);
    }
  }, [isOn]);

  function getRandom() {
    return Math.floor(Math.random() * 10 + 2);
  }

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      if (time < 0) {
        setPlayerScore(play.score);
        setLastScore(play.score);
        
        // Save the score to localStorage
        localStorage.setItem('playerScore', play.score);

        setPlay(initPlay);
        setTime(30);
        setIsRunning(false);
        setIsOn(false);
        setIsOver(true);
        // setTimeout(() => {
        //   navigate('/test2');
        // }, 2000);      
      }
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  async function handleInputChange(e) {
    const inputValue = e.target.value;
    setValue(inputValue);
    const answer = play.numberOne * play.numberTwo;
    if (inputValue == answer) {
      const gameContainer = document.querySelector('.game-container');
      gameContainer?.classList.add('correct-answer');
      setTimeout(() => {
        gameContainer?.classList.remove('correct-answer');
      }, 300);
      
      setPlay({
        ...play,
        numberOne: getRandom(),
        numberTwo: getRandom(),
        score: play.score + 1,
      });
      setValue('');
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  if (isOn) {
    return (
      <Board>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8 game-container"
        >
          <div className="flex justify-between items-center">
            <Level>{play.score}</Level>
            <div className={`text-2xl font-bold rounded-full px-6 py-2 ${
              time <= 10 ? 'bg-red-500/20 text-red-300 animate-pulse' : 'bg-blue-500/20 text-blue-300'
            }`}>
              {time}s
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-6">
            <motion.div
              key={play.numberOne + play.numberTwo}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-bold text-white text-center bg-white/5 rounded-lg px-8 py-4"
            >
              {play.numberOne} × {play.numberTwo}
            </motion.div>
            
            <input
              ref={inputRef}
              type="number"
              value={value}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
              className="w-40 h-20 text-4xl text-center bg-white/20 rounded-lg border-2 border-white/20 
                       text-white placeholder-white/30 focus:outline-none focus:border-white/40 
                       focus:ring-2 focus:ring-white/40 transition-all duration-200"
              style={{
                caretColor: 'white',
                textShadow: '0 0 10px rgba(255,255,255,0.3)'
              }}
              autoFocus
            />
          </div>
        </motion.div>

        <style jsx global>{`
          .game-container.correct-answer {
            animation: flash 0.3s ease-out;
          }

          @keyframes flash {
            0% { background-color: rgba(255, 255, 255, 0); }
            50% { background-color: rgba(255, 255, 255, 0.2); }
            100% { background-color: rgba(255, 255, 255, 0); }
          }

          input[type=number]::-webkit-inner-spin-button, 
          input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}</style>
      </Board>
    );
  } else if (isOver) {
    return (
      <Board>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-4">
            Game Over!
          </h1>
          
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-7xl font-bold text-white mb-8"
          >
            {playerScore}
          </motion.div>
          
          <p className="text-blue-200 text-xl mb-8">
            {playerScore > (lastScore || 0) ? "New High Score! 🎉" : "Great effort! 👏"}
          </p>
          
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/test2')}
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 transition-all duration-300 text-lg px-8 py-6"
          >
            Next
          </Button>
        </motion.div>
      </Board>
    );
  } else {
    return (
      <Board>
        <Titlescreen
          title="Mental Math"
          symbol="🧮"
          button="Start Game"
          onStatusChange={setIsOn}
        >
          Challenge your multiplication skills! Solve as many problems as you can in 30 seconds.
        </Titlescreen>
      </Board>
    );
  }
}

// Board component with gradient background
const Board = ({ children }) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
    <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
      <CardContent className="p-8">
        {children}
      </CardContent>
    </Card>
  </div>
);

// Enhanced Level component
const Level = ({ children }) => (
  <div className="relative">
    <div className="text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 text-transparent bg-clip-text">
      Level: {children}
    </div>
  </div>
);

// Enhanced Titlescreen component
const Titlescreen = ({ title, symbol, button, onStatusChange, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center"
  >
    <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
      {title}
    </h1>
    <div className="text-8xl mb-8 animate-bounce">{symbol}</div>
    <p className="text-xl mb-10 text-blue-100 max-w-md mx-auto leading-relaxed">
      {children}
    </p>
    <Button 
      variant="outline"
      size="lg"
      onClick={() => onStatusChange(true)}
      className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 transition-all duration-300 text-lg px-8 py-6"
    >
      {button}
    </Button>
  </motion.div>
);

export default MentalMath;
