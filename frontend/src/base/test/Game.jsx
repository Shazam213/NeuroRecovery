// // Game.jsx
// import React, { useState, useEffect } from 'react';
// import { useTheme } from '../../contexts/ThemeContext';
// import { useNavigate } from 'react-router-dom';


// const Board = ({ theme, children }) => (
//   <div className={`min-h-screen flex items-center justify-center p-4 ${
//     theme === 'dark'
//       ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
//       : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'
//   }`}>
//     <div className="w-full max-w-md">
//       {children}
//     </div>
//   </div>
// );

// const Titlescreen = ({ theme, title, symbol, button, children, onStatusChange }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div className={`p-8 rounded-2xl shadow-xl transition-all border ${
//       theme === 'dark'
//         ? 'bg-gray-800 text-white border-gray-700'
//         : 'bg-white/10 backdrop-blur-lg text-white border-white/20'
//     }`}>
//       <div className="text-center space-y-6">
//         <div className="flex flex-col items-center space-y-4">
//           <span className="text-6xl animate-bounce">{symbol}</span>
//           <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
//         </div>
        
//         <p className={`text-lg leading-relaxed ${
//           theme === 'dark' ? 'text-gray-300' : 'text-gray-300'
//         }`}>
//           {children}
//         </p>

//         <button
//           onClick={() => onStatusChange(true)}
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//           className={`
//             w-full py-4 px-8 
//             text-lg font-semibold
//             rounded-xl
//             transform transition-all duration-200
//             ${isHovered ? 
//               'scale-105 shadow-lg shadow-green-500/30' : 
//               'scale-100'
//             }
//             ${theme === 'dark' ? 'bg-blue-600' : 'bg-green-600'}
//             hover:bg-green-500
//             active:scale-95
//             text-white
//           `}
//         >
//           {button}
//         </button>
//       </div>
//     </div>
//   );
// };

// const Game = () => {
//   const [gameState, setGameState] = useState('initial'); // initial, waiting, ready, clicked
//   const [startTime, setStartTime] = useState(null);
//   const [reactionTime, setReactionTime] = useState(null);
//   const { theme } = useTheme(); // Getting theme from context
//   const navigate = useNavigate();


//   useEffect(() => {
//     if (gameState === 'waiting') {
//       const timeout = setTimeout(() => {
//         setGameState('ready');
//         setStartTime(Date.now());
//       }, Math.random() * 3000 + 1000);
//       return () => clearTimeout(timeout);
//     }
//   }, [gameState]);

//   const handleClick = () => {
//     if (gameState === 'ready') {
//       const endTime = Date.now();
//       setReactionTime(endTime - startTime);
//       setGameState('clicked');
//       localStorage.setItem('reactionTime', reaction);
//       setTimeout(() => {
//         navigate('/test4');
//       }, 2000);

//     } else if (gameState === 'clicked') {
//       setGameState('waiting');
//       setReactionTime(null);
//     } else {
//       setGameState('waiting');
//     }
//   };

//   return (
//     <Board theme={theme}>
//       {gameState === 'initial' ? (
//         <Titlescreen
//           theme={theme}
//           title="Reaction Time"
//           symbol="⚡"
//           button="Start Game"
//           onStatusChange={() => setGameState('waiting')}
//         >
//           When the red box turns green, click as fast as you can!
//         </Titlescreen>
//       ) : (
//         <div
//           onClick={handleClick}
//           className={`w-full aspect-square rounded-2xl transition-all duration-150 cursor-pointer
//             flex items-center justify-center text-2xl font-bold 
//             ${gameState === 'waiting' ? 'bg-red-500' : ''}
//             ${gameState === 'ready' ? 'bg-green-500' : ''}
//             ${gameState === 'clicked' ? 'bg-blue-500' : ''}
//             ${theme === 'dark' ? 'text-gray-200' : 'text-white'}`}
//         >
//           {gameState === 'waiting' && "Wait..."}
//           {gameState === 'ready' && "Click!"}
//           {gameState === 'clicked' && (
//             <div className="text-center">
//               <div className="text-4xl mb-2">{reactionTime}ms</div>
//               <div className="text-lg">Click to try again</div>
//             </div>
//           )}
//         </div>
//       )}
//     </Board>
//   );
// };

// export default Game;


// Game.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";


const Board = ({ theme, children }) => (
  <div className={`min-h-screen flex items-center justify-center p-4 ${
    theme === 'dark'
      ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
      : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900'
  }`}>
    <div className="w-full max-w-md">
      {children}
    </div>
  </div>
);

const Titlescreen = ({ theme, title, symbol, button, children, onStatusChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`p-8 rounded-2xl shadow-xl transition-all border ${
      theme === 'dark'
        ? 'bg-gray-800 text-white border-gray-700'
        : 'bg-white/10 backdrop-blur-lg text-white border-white/20'
    }`}>
      <div className="text-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <span className="text-6xl animate-bounce">{symbol}</span>
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
        </div>
        
        <p className={`text-lg leading-relaxed ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-300'
        }`}>
          {children}
        </p>

        <button
          onClick={() => onStatusChange('waiting')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            w-full py-4 px-8 
            text-lg font-semibold
            rounded-xl
            transform transition-all duration-200
            ${isHovered ? 
              'scale-105 shadow-lg shadow-green-500/30' : 
              'scale-100'
            }
            ${theme === 'dark' ? 'bg-blue-600' : 'bg-green-600'}
            hover:bg-green-500
            active:scale-95
            text-white
          `}
        >
          {button}
        </button>
      </div>
    </div>
  );
};

const Game = () => {
  const [gameState, setGameState] = useState('initial'); // initial, waiting, ready, clicked
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const { theme } = useTheme(); // Getting theme from context
  const navigate = useNavigate();

  useEffect(() => {
    // Set timeout only when the state is "waiting"
    if (gameState === 'waiting') {
      const timeout = setTimeout(() => {
        setGameState('ready');
        setStartTime(Date.now());
      }, Math.random() * 3000 + 1000); // Random delay between 1-4 seconds

      return () => clearTimeout(timeout); // Cleanup on component unmount or gameState change
    }
  }, [gameState]);

  const handleClick = () => {
    if (gameState === 'ready') {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      setReactionTime(reaction);
      setGameState('clicked');
      localStorage.setItem('reactionTime', reaction);

      // Navigate to /test4 after a 2-second delay
      // setTimeout(() => {
      //   navigate('/test4');
      // }, 2000);
      <button onClick={() => navigate('/test4')}>
  Next
</button>


    } else if (gameState === 'clicked') {
      // Reset the game back to waiting state
      setGameState('waiting');
      setReactionTime(null);
    } else if (gameState === 'waiting') {
      // Ignore clicks in the "waiting" state to avoid accidental restarts
    } else {
      setGameState('waiting'); // Start game for the first time
    }
  };

  return (
    <Board theme={theme}>
      {gameState === 'initial' ? (
        <Titlescreen
          theme={theme}
          title="Reaction Time"
          symbol="⚡"
          button="Start Game"
          onStatusChange={() => setGameState('waiting')}
        >
          When the red box turns green, click as fast as you can!
        </Titlescreen>
      ) : (
        <div
          onClick={handleClick}
          className={`w-full aspect-square rounded-2xl transition-all duration-150 cursor-pointer
            flex items-center justify-center text-2xl font-bold 
            ${gameState === 'waiting' ? 'bg-red-500' : ''}
            ${gameState === 'ready' ? 'bg-green-500' : ''}
            ${gameState === 'clicked' ? 'bg-blue-500' : ''}
            ${theme === 'dark' ? 'text-gray-200' : 'text-white'}`}
        >
          {gameState === 'waiting' && "Wait..."}
          {gameState === 'ready' && "Click!"}
          {gameState === 'clicked' && (
            <div className="text-center">
              <div className="text-4xl mb-2">{reactionTime}ms</div>
              <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-200"
              onClick={() => navigate('/test4')}
            >
              Next
            </Button>
              {/* <div className="text-lg">Click to try again</div> */}
            </div>
          )}
        </div>
      )}
    </Board>
  );
};

export default Game;
