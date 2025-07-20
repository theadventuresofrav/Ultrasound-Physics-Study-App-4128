import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import StudyGuide from './pages/StudyGuide';
import QuizMode from './pages/QuizMode';
import Progress from './pages/Progress';
import Multiplayer from './pages/Multiplayer';
import GameResults from './pages/GameResults';
import KnowledgeBase from './pages/KnowledgeBase';
import Knowledge from './pages/Knowledge';
import ContactsPage from './components/contacts/ContactsPage';
import GameNotifications from './components/GameNotifications';
import { StudyProvider } from './context/StudyContext';
import { GameProvider } from './context/GameContext';
import './index.css';

function App() {
  return (
    <StudyProvider>
      <GameProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-medical-50 via-primary-50 to-medical-100">
            <Header />
            <GameNotifications />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 ml-64 p-6">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/study/:section" element={<StudyGuide />} />
                    <Route path="/quiz/:mode" element={<QuizMode />} />
                    <Route path="/progress" element={<Progress />} />
                    <Route path="/multiplayer" element={<Multiplayer />} />
                    <Route path="/game-results" element={<GameResults />} />
                    <Route path="/knowledge" element={<Knowledge />} />
                    <Route path="/knowledge-base" element={<KnowledgeBase />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                  </Routes>
                </AnimatePresence>
              </main>
            </div>
          </div>
        </Router>
      </GameProvider>
    </StudyProvider>
  );
}

export default App;