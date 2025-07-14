import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShuffle, FiEye, FiEyeOff, FiCheck } = FiIcons;

const roles = ['Hakem', 'Jalad', 'Harami', 'Mofatish'];
const roleIcons = {
  Hakem: '👑',
  Jalad: '🧙‍♂️',
  Harami: '🥷',
  Mofatish: '🛡️'
};
const roleColors = {
  Hakem: 'from-yellow-400 to-orange-500',
  Jalad: 'from-blue-400 to-purple-500',
  Harami: 'from-red-400 to-pink-500',
  Mofatish: 'from-green-400 to-teal-500'
};

const RoleAssignment = ({ players, onRolesAssigned }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [assignedRoles, setAssignedRoles] = useState({});
  const [shuffledRoles, setShuffledRoles] = useState([]);
  const [showRole, setShowRole] = useState(false);
  const [allRolesAssigned, setAllRolesAssigned] = useState(false);

  const shuffleRoles = () => {
    const shuffled = [...roles].sort(() => Math.random() - 0.5);
    setShuffledRoles(shuffled);
    setCurrentPlayerIndex(0);
    setAssignedRoles({});
    setShowRole(false);
    setAllRolesAssigned(false);
  };

  const revealRole = () => {
    setShowRole(true);
  };

  const confirmRole = () => {
    const currentPlayer = players[currentPlayerIndex];
    const currentRole = shuffledRoles[currentPlayerIndex];
    setAssignedRoles(prev => ({ ...prev, [currentPlayer]: currentRole }));

    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(prev => prev + 1);
      setShowRole(false);
    } else {
      setAllRolesAssigned(true);
    }
  };

  const startGame = () => {
    onRolesAssigned(assignedRoles);
  };

  if (shuffledRoles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="mb-6">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-full inline-block mb-4">
            <SafeIcon icon={FiShuffle} className="text-3xl text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Assign Roles</h3>
          <p className="text-gray-600">Click to shuffle and assign roles to players</p>
        </div>

        <button
          onClick={shuffleRoles}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto"
        >
          <SafeIcon icon={FiShuffle} className="text-xl" />
          Shuffle Roles
        </button>
      </motion.div>
    );
  }

  if (allRolesAssigned) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="mb-6">
          <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
            <SafeIcon icon={FiCheck} className="text-3xl text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">All Roles Assigned!</h3>
          <p className="text-gray-600 mb-6">Everyone has received their secret role</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {players.map((player, index) => (
            <div key={player} className="bg-gray-50 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">👤</div>
              <div className="font-semibold text-gray-800">{player}</div>
              <div className="text-sm text-gray-600">Role Assigned</div>
            </div>
          ))}
        </div>

        <button
          onClick={startGame}
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto"
        >
          <SafeIcon icon={FiCheck} className="text-xl" />
          Start Playing
        </button>
      </motion.div>
    );
  }

  const currentPlayer = players[currentPlayerIndex];
  const currentRole = shuffledRoles[currentPlayerIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8"
    >
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full inline-block mb-4">
          Player {currentPlayerIndex + 1} of {players.length}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentPlayer}</h3>
        <p className="text-gray-600">It's your turn to see your role</p>
      </div>

      <div className="max-w-md mx-auto">
        {!showRole ? (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center">
            <div className="bg-gray-100 rounded-2xl p-8 mb-6">
              <SafeIcon icon={FiEyeOff} className="text-4xl text-gray-400 mb-4 mx-auto" />
              <p className="text-gray-600 mb-4">Your role is hidden</p>
              <p className="text-sm text-gray-500">Make sure others can't see your screen</p>
            </div>

            <button
              onClick={revealRole}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto"
            >
              <SafeIcon icon={FiEye} className="text-xl" />
              Reveal My Role
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <div className={`bg-gradient-to-r ${roleColors[currentRole]} rounded-2xl p-8 mb-6 text-white`}>
              <div className="text-6xl mb-4">{roleIcons[currentRole]}</div>
              <h4 className="text-2xl font-bold mb-2">You are the</h4>
              <h3 className="text-4xl font-bold">{currentRole}</h3>
            </div>

            <button
              onClick={confirmRole}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-teal-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-3 mx-auto"
            >
              <SafeIcon icon={FiCheck} className="text-xl" />
              Got It!
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RoleAssignment;