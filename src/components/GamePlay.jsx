import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCrown, FiUser, FiEye, FiShield, FiArrowRight } = FiIcons;

const GamePlay = ({ players, roles, hakemRevealed, jaladGuess, onHakemReveal, onJaladGuess }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const hakem = Object.keys(roles).find(player => roles[player] === 'Hakem');
  const jalad = Object.keys(roles).find(player => roles[player] === 'Jalad');
  const harami = Object.keys(roles).find(player => roles[player] === 'Harami');
  const mofatish = Object.keys(roles).find(player => roles[player] === 'Mofatish');

  const handleJaladGuess = () => {
    if (selectedPlayer) {
      onJaladGuess(selectedPlayer);
    }
  };

  if (!hakemRevealed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8"
      >
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full inline-block mb-4">
            <SafeIcon icon={FiCrown} className="text-3xl text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Hakem's Turn</h3>
          <p className="text-gray-600">The Hakem must reveal themselves to start the game</p>
        </div>

        <div className="max-w-md mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              Are you the Hakem?
            </p>
            <p className="text-sm text-gray-600">
              If you have the Hakem role, click below to reveal yourself
            </p>
          </div>

          <button
            onClick={onHakemReveal}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto"
          >
            <SafeIcon icon={FiCrown} className="text-xl" />
            I am the Hakem!
          </button>
        </div>
      </motion.div>
    );
  }

  if (jaladGuess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="mb-6">
          <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
            <SafeIcon icon={FiUser} className="text-3xl text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Guess Made!</h3>
          <p className="text-gray-600">
            Jalad has guessed that <span className="font-semibold">{jaladGuess}</span> is the Harami
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <p className="text-gray-600">Calculating results...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-4 rounded-full inline-block mb-4">
          <SafeIcon icon={FiUser} className="text-3xl text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Jalad's Turn</h3>
        <p className="text-gray-600">The Jalad must identify who is the Harami</p>
      </div>

      <div className="mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6 text-center">
          <SafeIcon icon={FiCrown} className="text-2xl text-yellow-600 mb-2 mx-auto" />
          <p className="font-semibold text-gray-800">
            <span className="text-yellow-600">{hakem}</span> is the Hakem
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <p className="text-lg font-semibold text-gray-800 mb-4 text-center">
            Who do you think is the Harami?
          </p>

          <div className="space-y-3">
            {players.filter(player => player !== hakem).map((player) => (
              <motion.button
                key={player}
                onClick={() => setSelectedPlayer(player)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                  selectedPlayer === player
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <SafeIcon icon={FiEye} className="text-xl" />
                  <span className="font-semibold">{player}</span>
                  {selectedPlayer === player && (
                    <SafeIcon icon={FiArrowRight} className="text-xl ml-auto" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {selectedPlayer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 text-center"
              >
                <button
                  onClick={handleJaladGuess}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto"
                >
                  <SafeIcon icon={FiEye} className="text-xl" />
                  Accuse {selectedPlayer}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default GamePlay;