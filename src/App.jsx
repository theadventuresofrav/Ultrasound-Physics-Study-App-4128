import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';

import { questConfig } from './config/questConfig';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import TrialBanner from './components/TrialBanner';
import StudyGuide from './pages/StudyGuide';
import QuizMode from './pages/QuizMode';
import Progress from './pages/Progress';
import Analytics from './pages/Analytics';
import JeopardyGame from './pages/JeopardyGame';
import Knowledge from './pages/Knowledge';
import KnowledgeBase from './pages/KnowledgeBase';
import ChatTutorPage from './pages/ChatTutorPage';
import PhysicsTools from './pages/PhysicsTools';
import SPIMockExam from './pages/SPIMockExam';
import ComprehensiveExam from './components/exam/ComprehensiveExam';
import Pricing from './pages/Pricing';
import Membership from './pages/Membership';
import Contacts from './pages/Contacts';
import Courses from './pages/Courses';

import { AuthProvider } from './context/AuthContext';
import { StudyProvider } from './context/StudyContext';

function App() {
  return (
    <AuthProvider>
      <StudyProvider>
        <QuestProvider
          apiKey={questConfig.APIKEY}
          entityId={questConfig.ENTITYID}
          apiType="PRODUCTION"
        >
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-medical-50 via-primary-50 to-medical-100">
              <TrialBanner />
              <Header />
              
              <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-64 p-6">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/study/:section" element={<StudyGuide />} />
                      <Route path="/quiz/:mode" element={<QuizMode />} />
                      <Route path="/progress" element={<Progress />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/jeopardy" element={<JeopardyGame />} />
                      <Route path="/knowledge" element={<Knowledge />} />
                      <Route path="/knowledge-base" element={<KnowledgeBase />} />
                      <Route path="/chat-tutor" element={<ChatTutorPage />} />
                      <Route path="/physics-tools" element={<PhysicsTools />} />
                      <Route path="/spi-mock-exam" element={<SPIMockExam />} />
                      <Route path="/comprehensive-exam" element={<ComprehensiveExam />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/membership" element={<Membership />} />
                      <Route path="/contacts" element={<Contacts />} />
                      <Route path="/courses/*" element={<Courses />} />
                    </Routes>
                  </AnimatePresence>
                </main>
              </div>
            </div>
          </Router>
        </QuestProvider>
      </StudyProvider>
    </AuthProvider>
  );
}

export default App;