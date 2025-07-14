import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrophy, FiStar, FiRotateCcw, FiBarChart3 } = FiIcons;

const GameResults = ({ players, scores, gameHistory, onResetGame }) => {
  const sortedPlayers = [...players].sort((a, b) => scores[b] - scores[a]);
  const winner = sortedPlayers[0];
  const maxScore = scores[winner];

  const getPositionSuffix = (position) => {
    if (position === 1) return 'st';
    if (position === 2) return 'nd';
    if (position === 3) return 'rd';
    return 'th';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Winner Announcement */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl p-8 text-center text-white">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Game Over!</h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            <SafeIcon icon={FiTrophy} className="text-3xl" />
            <span className="text-2xl font-bold">{winner} Wins!</span>
          </div>
          <p className="text-lg opacity-90">
            Final Score: {maxScore} points
          </p>
        </motion.div>
      </div>

      {/* Final Leaderboard */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <SafeIcon icon={FiBarChart3} className="text-2xl text-orange-600" />
          <h3 className="text-2xl font-bold text-gray-800">Final Leaderboard</h3>
        </div>

        <div className="space-y-4">
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-xl border-2 ${
                index === 0
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                  : index === 1
                  ? 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-300'
                  : index === 2
                  ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-300'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    index === 0
                      ? 'bg-yellow-500 text-white'
                      : index === 1
                      ? 'bg-gray-500 text-white'
                      : index === 2
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                >
                  {index + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-gray-800">{player}</span>
                    {index === 0 && <SafeIcon icon={FiStar} className="text-yellow-500" />}
                  </div>
                  <span className="text-sm text-gray-600">
                    {index + 1}{getPositionSuffix(index + 1)} Place
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">{scores[player]}</div>
                <div className="text-sm text-gray-600">points</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Game Statistics */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Game Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{gameHistory.length}</div>
            <div className="text-gray-600">Rounds Played</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {gameHistory.filter(round => round.correctGuess).length}
            </div>
            <div className="text-gray-600">Correct Guesses</div>
          </div>
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {gameHistory.filter(round => !round.correctGuess).length}
            </div>
            <div className="text-gray-600">Harami Escapes</div>
          </div>
        </div>
      </div>

      {/* Round History */}
      {gameHistory.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Round History</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {gameHistory.map((round, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border ${
                  round.correctGuess ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-gray-800">Round {round.round}</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        round.correctGuess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {round.correctGuess ? 'Correct' : 'Wrong'}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">+{round.points}</div>
                    <div className="text-sm text-gray-600">{round.winner}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Play Again Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <button
          onClick={onResetGame}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto"
        >
          <SafeIcon icon={FiRotateCcw} className="text-xl" />
          Play Again
        </button>
      </motion.div>
    </motion.div>
  );
};

export default GameResults;