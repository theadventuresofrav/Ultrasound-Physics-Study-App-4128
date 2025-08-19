import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';
import { questConfig } from './config/questConfig';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
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
import Pricing from './pages/Pricing';
import Membership from './pages/Membership';
import Contacts from './pages/Contacts';

import { AuthProvider, useAuth } from './context/AuthContext';
import { StudyProvider } from './context/StudyContext';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-dark-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-400">Loading your study session...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Login />;
  }
  
  return children;
}

// Main App Layout
function AppLayout({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-gradient">
        {children}
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-dark-gradient">
      <TrialBanner />
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="dark">
      <AuthProvider>
        <StudyProvider>
          <QuestProvider
            apiKey={questConfig.APIKEY}
            entityId={questConfig.ENTITYID}
            apiType="PRODUCTION"
          >
            <Router>
              <AppLayout>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/study/:section" element={
                    <ProtectedRoute>
                      <StudyGuide />
                    </ProtectedRoute>
                  } />
                  <Route path="/quiz/:mode" element={
                    <ProtectedRoute>
                      <QuizMode />
                    </ProtectedRoute>
                  } />
                  <Route path="/progress" element={
                    <ProtectedRoute>
                      <Progress />
                    </ProtectedRoute>
                  } />
                  <Route path="/analytics" element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  } />
                  <Route path="/jeopardy" element={
                    <ProtectedRoute>
                      <JeopardyGame />
                    </ProtectedRoute>
                  } />
                  <Route path="/knowledge" element={
                    <ProtectedRoute>
                      <Knowledge />
                    </ProtectedRoute>
                  } />
                  <Route path="/knowledge-base" element={
                    <ProtectedRoute>
                      <KnowledgeBase />
                    </ProtectedRoute>
                  } />
                  <Route path="/chat-tutor" element={
                    <ProtectedRoute>
                      <ChatTutorPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/physics-tools" element={
                    <ProtectedRoute>
                      <PhysicsTools />
                    </ProtectedRoute>
                  } />
                  <Route path="/spi-mock-exam" element={
                    <ProtectedRoute>
                      <SPIMockExam />
                    </ProtectedRoute>
                  } />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/membership" element={
                    <ProtectedRoute>
                      <Membership />
                    </ProtectedRoute>
                  } />
                  <Route path="/contacts" element={
                    <ProtectedRoute>
                      <Contacts />
                    </ProtectedRoute>
                  } />
                </Routes>
              </AppLayout>
            </Router>
          </QuestProvider>
        </StudyProvider>
      </AuthProvider>
    </div>
  );
}

export default App;