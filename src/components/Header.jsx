import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCrown, FiUser, FiShield, FiEye } = FiIcons;

const Header = () => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-2"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            حاكم، جلّاد، مفتش، حرامي
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl opacity-90 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Hakem, Jalad, Mofatish, Harami
          </motion.p>
          <motion.div
            className="flex justify-center items-center gap-6 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <SafeIcon icon={FiCrown} className="text-yellow-300" />
              <span>Hakem</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon icon={FiUser} className="text-blue-300" />
              <span>Jalad</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon icon={FiEye} className="text-red-300" />
              <span>Harami</span>
            </div>
            <div className="flex items-center gap-2">
              <SafeIcon icon={FiShield} className="text-green-300" />
              <span>Mofatish</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;