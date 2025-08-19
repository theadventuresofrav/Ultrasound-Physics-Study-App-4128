import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChatTutor from '../components/ChatTutor';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft } = FiIcons;

function ChatTutorPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
        >
          <SafeIcon icon={FiArrowLeft} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
      
      <ChatTutor />
    </motion.div>
  );
}

export default ChatTutorPage;