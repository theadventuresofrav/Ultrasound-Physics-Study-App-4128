import React, { createContext, useContext, useReducer, useEffect } from 'react';
import supabase from '../lib/supabase';
import { allQuestions } from '../data/questions';

const GameContext = createContext();

const initialState = {
  gameId: null,
  players: [],
  currentRound: 0,
  scores: {},
  isActive: false,
  timeLeft: 0,
  aiDifficulty: 'medium',
  gameMode: 'solo',
  roundResults: [],
  gameStatus: 'waiting', // waiting, playing, finished
  currentQuestion: null,
  playerAnswers: {},
  error: null,
};

const AI_ACCURACY = {
  easy: 0.6,
  medium: 0.75,
  hard: 0.9
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'CREATE_GAME':
      return {
        ...state,
        gameId: action.payload.gameId,
        players: action.payload.players,
        gameMode: action.payload.gameMode,
        aiDifficulty: action.payload.aiDifficulty,
        gameStatus: 'waiting',
        scores: action.payload.players.reduce((acc, player) => ({
          ...acc,
          [player.id]: 0
        }), {})
      };

    case 'START_GAME':
      return {
        ...state,
        isActive: true,
        gameStatus: 'playing',
        currentRound: 0,
        timeLeft: 20,
        currentQuestion: action.payload.question
      };

    case 'SUBMIT_ANSWER':
      return {
        ...state,
        playerAnswers: {
          ...state.playerAnswers,
          [action.payload.playerId]: {
            answer: action.payload.answer,
            timeElapsed: action.payload.timeElapsed
          }
        }
      };

    case 'AI_ANSWER':
      const aiAccuracy = AI_ACCURACY[state.aiDifficulty];
      const correctAnswer = state.currentQuestion.correct;
      const willAnswerCorrectly = Math.random() < aiAccuracy;
      const aiAnswer = willAnswerCorrectly ? correctAnswer : 
        Math.floor(Math.random() * 4);
      const aiDelay = Math.random() * 10000 + 5000; // 5-15 seconds

      return {
        ...state,
        playerAnswers: {
          ...state.playerAnswers,
          ai: {
            answer: aiAnswer,
            timeElapsed: aiDelay
          }
        }
      };

    case 'END_ROUND':
      const roundScores = {};
      Object.entries(state.playerAnswers).forEach(([playerId, data]) => {
        const isCorrect = data.answer === state.currentQuestion.correct;
        const timeBonus = Math.max(0, (20 - data.timeElapsed / 1000) * 50);
        roundScores[playerId] = isCorrect ? 1000 + timeBonus : 0;
      });

      return {
        ...state,
        currentRound: state.currentRound + 1,
        scores: Object.entries(state.scores).reduce((acc, [playerId, score]) => ({
          ...acc,
          [playerId]: score + (roundScores[playerId] || 0)
        }), {}),
        roundResults: [...state.roundResults, {
          question: state.currentQuestion,
          answers: state.playerAnswers,
          scores: roundScores
        }],
        playerAnswers: {},
        currentQuestion: action.payload.nextQuestion
      };

    case 'END_GAME':
      return {
        ...state,
        isActive: false,
        gameStatus: 'finished'
      };

    case 'UPDATE_TIME':
      return {
        ...state,
        timeLeft: action.payload
      };
      
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    if (state.gameId && state.gameMode === 'multiplayer') {
      try {
        const channel = supabase
          .channel(`game:${state.gameId}`)
          .on('broadcast', { event: 'answer' }, ({ payload }) => {
            dispatch({ type: 'SUBMIT_ANSWER', payload });
          })
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              console.log('Successfully subscribed to game channel');
            } else if (status === 'CHANNEL_ERROR') {
              dispatch({ 
                type: 'SET_ERROR', 
                payload: 'Error connecting to game channel. Using offline mode.'
              });
            }
          });

        return () => {
          channel.unsubscribe().catch(err => {
            console.error('Error unsubscribing from channel:', err);
          });
        };
      } catch (error) {
        console.error('Error setting up real-time channel:', error);
        dispatch({ 
          type: 'SET_ERROR', 
          payload: 'Connection error. Using offline mode.'
        });
      }
    }
  }, [state.gameId, state.gameMode]);

  useEffect(() => {
    if (state.isActive && state.timeLeft > 0) {
      const timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIME', payload: state.timeLeft - 1 });
      }, 1000);

      return () => clearInterval(timer);
    } else if (state.isActive && state.timeLeft === 0 && state.currentQuestion) {
      // Auto-submit timeout answer if player hasn't answered
      if (!state.playerAnswers['player1'] && state.gameStatus === 'playing') {
        // Submit a timeout answer (no selection)
        submitAnswer(null);
        
        // If playing against AI, trigger AI answer too
        if (state.gameMode === 'ai' && !state.playerAnswers['ai']) {
          dispatch({ type: 'AI_ANSWER' });
        }
        
        // Move to next question or end game
        const nextQuestionIndex = state.currentRound + 1;
        if (nextQuestionIndex < 10) {
          const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
          dispatch({
            type: 'END_ROUND',
            payload: { nextQuestion: shuffledQuestions[nextQuestionIndex] }
          });
        } else {
          dispatch({ type: 'END_GAME' });
        }
      }
    }
  }, [state.isActive, state.timeLeft, state.currentQuestion, state.playerAnswers, state.gameStatus, state.currentRound, state.gameMode]);

  const createGame = (mode = 'solo', aiDifficulty = 'medium') => {
    try {
      const gameId = Math.random().toString(36).substring(7);
      const players = [{ id: 'player1', name: 'You', isHuman: true }];

      if (mode === 'ai') {
        players.push({ id: 'ai', name: 'AI Opponent', isHuman: false });
      }

      dispatch({
        type: 'CREATE_GAME',
        payload: { gameId, players, gameMode: mode, aiDifficulty }
      });

      // Only attempt Supabase operations if we're in multiplayer mode
      if (mode === 'multiplayer') {
        // Wrap in try/catch to handle connection errors gracefully
        try {
          // We'll do this asynchronously but won't wait for it
          supabase.from('games').insert([
            { id: gameId, status: 'waiting', mode }
          ]).then(({ error }) => {
            if (error) {
              console.error('Error creating game in Supabase:', error);
              dispatch({ 
                type: 'SET_ERROR', 
                payload: 'Error saving game data. Playing in offline mode.' 
              });
            }
          });
        } catch (error) {
          console.error('Error in Supabase operation:', error);
          dispatch({ 
            type: 'SET_ERROR', 
            payload: 'Connection error. Using offline mode.'
          });
        }
      }
    } catch (error) {
      console.error('Error creating game:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to create game. Please try again.' 
      });
    }
  };

  const startGame = () => {
    try {
      const shuffledQuestions = [...allQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      dispatch({
        type: 'START_GAME',
        payload: { question: shuffledQuestions[0] }
      });
    } catch (error) {
      console.error('Error starting game:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to start game. Please try again.' 
      });
    }
  };

  const submitAnswer = (answer) => {
    try {
      const payload = {
        playerId: 'player1',
        answer,
        timeElapsed: (20 - state.timeLeft) * 1000
      };

      dispatch({ type: 'SUBMIT_ANSWER', payload });

      if (state.gameMode === 'multiplayer') {
        // Wrap in try/catch to handle connection errors gracefully
        try {
          // We'll do this asynchronously but won't wait for it
          supabase
            .channel(`game:${state.gameId}`)
            .send({
              type: 'broadcast',
              event: 'answer',
              payload
            })
            .catch(err => {
              console.error('Error broadcasting answer:', err);
              dispatch({ 
                type: 'SET_ERROR', 
                payload: 'Error sending answer. Playing in offline mode.' 
              });
            });
        } catch (error) {
          console.error('Error in Supabase operation:', error);
          dispatch({ 
            type: 'SET_ERROR', 
            payload: 'Connection error. Using offline mode.'
          });
        }
      } else if (state.gameMode === 'ai') {
        dispatch({ type: 'AI_ANSWER' });
      }
      
      // After a short delay to show the result, move to next question
      setTimeout(() => {
        const nextQuestionIndex = state.currentRound + 1;
        if (nextQuestionIndex < 10) {
          const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
          dispatch({
            type: 'END_ROUND',
            payload: { nextQuestion: shuffledQuestions[nextQuestionIndex] }
          });
        } else {
          dispatch({ type: 'END_GAME' });
        }
      }, 2000);
    } catch (error) {
      console.error('Error submitting answer:', error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to submit answer. Please try again.' 
      });
    }
  };

  return (
    <GameContext.Provider value={{ state, dispatch, createGame, startGame, submitAnswer }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}