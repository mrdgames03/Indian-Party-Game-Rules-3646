import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTrophy, FiStar } = FiIcons;

const ScoreBoard = ({ players, scores }) => {
  const sortedPlayers = [...players].sort((a, b) => scores[b] - scores[a]);
  const maxScore = Math.max(...Object.values(scores));

  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
      <div className="flex items-center gap-2 mb-3">
        <SafeIcon icon={FiTrophy} className="text-lg text-orange-600" />
        <h4 className="font-semibold text-gray-800">Scores</h4>
      </div>
      
      <div className="space-y-2">
        {sortedPlayers.map((player, index) => (
          <motion.div
            key={player}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-2 rounded-lg ${
              scores[player] === maxScore && maxScore > 0
                ? 'bg-yellow-100 border border-yellow-300'
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {scores[player] === maxScore && maxScore > 0 && (
                <SafeIcon icon={FiStar} className="text-yellow-500" />
              )}
              <span className="font-medium text-sm">{player}</span>
            </div>
            <span className="font-bold text-sm text-gray-800">{scores[player]}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;