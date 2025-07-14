import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameSetup from './components/GameSetup';
import GameBoard from './components/GameBoard';
import GameResults from './components/GameResults';
import Header from './components/Header';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('setup'); // setup, playing, results
  const [players, setPlayers] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [scores, setScores] = useState({});
  const [gameHistory, setGameHistory] = useState([]);

  const startGame = (playerNames) => {
    setPlayers(playerNames);
    const initialScores = {};
    playerNames.forEach(name => {
      initialScores[name] = 0;
    });
    setScores(initialScores);
    setGameState('playing');
    setCurrentRound(1);
    setGameHistory([]);
  };

  const endRound = (roundResult) => {
    setScores(prev => {
      const newScores = { ...prev };
      if (roundResult.winner) {
        newScores[roundResult.winner] += roundResult.points;
      }
      return newScores;
    });
    
    setGameHistory(prev => [...prev, roundResult]);
    setCurrentRound(prev => prev + 1);
  };

  const endGame = () => {
    setGameState('results');
  };

  const resetGame = () => {
    setGameState('setup');
    setPlayers([]);
    setCurrentRound(1);
    setScores({});
    setGameHistory([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {gameState === 'setup' && (
            <motion.div
              key="setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <GameSetup onStartGame={startGame} />
            </motion.div>
          )}
          
          {gameState === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <GameBoard
                players={players}
                currentRound={currentRound}
                scores={scores}
                onEndRound={endRound}
                onEndGame={endGame}
              />
            </motion.div>
          )}
          
          {gameState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <GameResults
                players={players}
                scores={scores}
                gameHistory={gameHistory}
                onResetGame={resetGame}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;