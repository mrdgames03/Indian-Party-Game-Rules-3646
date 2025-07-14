import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPlus, FiX, FiPlay, FiUsers } = FiIcons;

const GameSetup = ({ onStartGame }) => {
  const [playerNames, setPlayerNames] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const handleNameChange = (index, value) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
    setError('');
  };

  const handleStartGame = () => {
    const validNames = playerNames.filter(name => name.trim() !== '');
    
    if (validNames.length !== 4) {
      setError('Please enter names for all 4 players');
      return;
    }

    const uniqueNames = new Set(validNames);
    if (uniqueNames.size !== 4) {
      setError('Player names must be unique');
      return;
    }

    onStartGame(validNames);
  };

  const clearName = (index) => {
    handleNameChange(index, '');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-full">
              <SafeIcon icon={FiUsers} className="text-3xl text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Setup Game</h2>
          <p className="text-gray-600">Enter names for all 4 players to begin</p>
        </motion.div>

        <div className="space-y-4 mb-8">
          {playerNames.map((name, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="relative"
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Player {index + 1}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                  placeholder={`Enter player ${index + 1} name`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 pr-12"
                  maxLength={20}
                />
                {name && (
                  <button
                    onClick={() => clearName(index)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <SafeIcon icon={FiX} className="text-lg" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
          >
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <button
            onClick={handleStartGame}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
          >
            <SafeIcon icon={FiPlay} className="text-xl" />
            Start Game
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200"
        >
          <h3 className="font-semibold text-gray-800 mb-2">Game Rules:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Each player gets a secret role: Hakem, Jalad, Harami, or Mofatish</li>
            <li>• Hakem reveals themselves first</li>
            <li>• Jalad must identify the Harami</li>
            <li>• Correct guess: Jalad and Hakem get points</li>
            <li>• Wrong guess: Harami and Mofatish get points</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GameSetup;