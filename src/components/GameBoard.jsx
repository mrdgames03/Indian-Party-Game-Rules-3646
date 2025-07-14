import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import RoleAssignment from './RoleAssignment';
import GamePlay from './GamePlay';
import ScoreBoard from './ScoreBoard';
import SafeIcon from '../common/SafeIcon';

const GameBoard = ({ players, currentRound, scores, onEndRound, onEndGame }) => {
  const [gamePhase, setGamePhase] = useState('assignment'); // assignment, playing, scoring
  const [roles, setRoles] = useState({});
  const [hakemRevealed, setHakemRevealed] = useState(false);
  const [jaladGuess, setJaladGuess] = useState(null);
  const [roundResult, setRoundResult] = useState(null);

  useEffect(() => {
    // Reset phase when starting new round
    setGamePhase('assignment');
    setHakemRevealed(false);
    setJaladGuess(null);
    setRoundResult(null);
  }, [currentRound]);

  const assignRoles = (assignedRoles) => {
    setRoles(assignedRoles);
    setGamePhase('playing');
  };

  const handleHakemReveal = () => {
    setHakemRevealed(true);
  };

  const handleJaladGuess = (guess) => {
    setJaladGuess(guess);
    calculateRoundResult(guess);
  };

  const calculateRoundResult = (guess) => {
    const hakem = Object.keys(roles).find(player => roles[player] === 'Hakem');
    const jalad = Object.keys(roles).find(player => roles[player] === 'Jalad');
    const harami = Object.keys(roles).find(player => roles[player] === 'Harami');
    const mofatish = Object.keys(roles).find(player => roles[player] === 'Mofatish');

    const isCorrect = guess === harami;
    const points = 100;

    let result;
    if (isCorrect) {
      result = {
        winner: jalad,
        points: points,
        correctGuess: true,
        roles: roles,
        guess: guess,
        actualHarami: harami,
        round: currentRound
      };
    } else {
      result = {
        winner: harami,
        points: points,
        correctGuess: false,
        roles: roles,
        guess: guess,
        actualHarami: harami,
        round: currentRound
      };
    }

    setRoundResult(result);
    setGamePhase('scoring');
  };

  const handleNextRound = () => {
    onEndRound(roundResult);
  };

  const handleEndGame = () => {
    onEndRound(roundResult);
    onEndGame();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-semibold">
            Round {currentRound}
          </div>
          <div className="text-gray-600">
            Phase: <span className="font-medium capitalize">{gamePhase}</span>
          </div>
        </div>
        <ScoreBoard players={players} scores={scores} />
      </div>

      <AnimatePresence mode="wait">
        {gamePhase === 'assignment' && (
          <motion.div
            key="assignment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <RoleAssignment players={players} onRolesAssigned={assignRoles} />
          </motion.div>
        )}

        {gamePhase === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <GamePlay
              players={players}
              roles={roles}
              hakemRevealed={hakemRevealed}
              jaladGuess={jaladGuess}
              onHakemReveal={handleHakemReveal}
              onJaladGuess={handleJaladGuess}
            />
          </motion.div>
        )}

        {gamePhase === 'scoring' && roundResult && (
          <motion.div
            key="scoring"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <RoundResult
              result={roundResult}
              onNextRound={handleNextRound}
              onEndGame={handleEndGame}
              currentRound={currentRound}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RoundResult = ({ result, onNextRound, onEndGame, currentRound }) => {
  const { FiCheck, FiX, FiArrowRight, FiFlag } = FiIcons;
  
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
          result.correctGuess ? 'bg-green-100' : 'bg-red-100'
        }`}>
          <SafeIcon 
            icon={result.correctGuess ? FiCheck : FiX} 
            className={`text-2xl ${result.correctGuess ? 'text-green-600' : 'text-red-600'}`} 
          />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {result.correctGuess ? 'Correct Guess!' : 'Wrong Guess!'}
        </h3>
        
        <p className="text-gray-600 mb-4">
          Jalad guessed: <span className="font-semibold">{result.guess}</span>
        </p>
        
        <p className="text-gray-600 mb-6">
          Actual Harami was: <span className="font-semibold">{result.actualHarami}</span>
        </p>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mb-6">
          <p className="text-lg font-semibold text-gray-800 mb-2">
            🎉 {result.winner} wins {result.points} points!
          </p>
          <p className="text-sm text-gray-600">
            {result.correctGuess 
              ? 'Jalad successfully identified the Harami!' 
              : 'Harami escaped detection!'}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onNextRound}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
          >
            <SafeIcon icon={FiArrowRight} />
            Next Round
          </button>
          
          <button
            onClick={onEndGame}
            className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
          >
            <SafeIcon icon={FiFlag} />
            End Game
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameBoard;