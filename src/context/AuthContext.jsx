import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  membership: {
    tier: 'free', // free, premium, pro
    expiresAt: null,
    features: [],
    trial: {
      active: false,
      startDate: null,
      endDate: null
    }
  },
  loading: true
};

// Membership tiers and their features
export const MEMBERSHIP_TIERS = {
  free: {
    name: 'Free',
    price: 0,
    features: [
      'Access to basic physics questions',
      '5 practice quizzes per day',
      'Basic progress tracking',
      'Limited study materials'
    ],
    limits: {
      dailyQuizzes: 5,
      mockExams: 1,
      studyMaterials: 3
    }
  },
  premium: {
    name: 'Premium',
    price: 9.99,
    period: 'month',
    features: [
      'All free features',
      'Unlimited practice quizzes',
      'Full SPI mock exams',
      'All study materials',
      'Advanced analytics',
      'Study streak rewards',
      'Priority support'
    ],
    limits: {
      dailyQuizzes: Infinity,
      mockExams: Infinity,
      studyMaterials: Infinity
    }
  },
  pro: {
    name: 'Pro',
    price: 19.99,
    period: 'month',
    features: [
      'All premium features',
      'AI-powered study recommendations',
      'Custom study plans',
      'Advanced physics simulations',
      'Peer networking features',
      'Certification tracking',
      'Download content for offline study',
      '1-on-1 expert consultations'
    ],
    limits: {
      dailyQuizzes: Infinity,
      mockExams: Infinity,
      studyMaterials: Infinity,
      consultations: 2
    }
  }
};

function authReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        membership: action.payload.membership,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGOUT':
      return { ...initialState, loading: false };
    case 'UPDATE_MEMBERSHIP':
      return { ...state, membership: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload, loading: false };
    case 'START_TRIAL':
      return { 
        ...state, 
        membership: {
          ...state.membership,
          tier: action.payload.tier,
          trial: {
            active: true,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate
          }
        } 
      };
    case 'END_TRIAL':
      return { 
        ...state, 
        membership: {
          ...state.membership,
          tier: 'free',
          trial: {
            active: false,
            startDate: null,
            endDate: null
          }
        } 
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('sonography-school-user');
    const savedMembership = localStorage.getItem('sonography-school-membership');

    if (savedUser && savedMembership) {
      dispatch({
        type: 'LOGIN',
        payload: {
          user: JSON.parse(savedUser),
          membership: JSON.parse(savedMembership)
        }
      });
    } else {
      // Set default free membership
      const freeMembership = {
        tier: 'free',
        expiresAt: null,
        features: MEMBERSHIP_TIERS.free.features,
        limits: MEMBERSHIP_TIERS.free.limits,
        trial: {
          active: false,
          startDate: null,
          endDate: null
        }
      };
      dispatch({ type: 'UPDATE_MEMBERSHIP', payload: freeMembership });
      localStorage.setItem('sonography-school-membership', JSON.stringify(freeMembership));
    }

    dispatch({ type: 'SET_LOADING', payload: false });
  }, []);

  // Check if trial has expired
  useEffect(() => {
    if (state.membership?.trial?.active) {
      const now = new Date();
      const endDate = new Date(state.membership.trial.endDate);
      
      if (now > endDate) {
        // Trial has expired
        endTrial();
      }
    }
  }, [state.membership]);

  const login = (email, password) => {
    // Mock login - in real app, this would call your auth service
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: email,
      avatar: '👨‍⚕️',
      joinDate: new Date().toISOString()
    };

    const membership = JSON.parse(localStorage.getItem('sonography-school-membership')) || {
      tier: 'free',
      expiresAt: null,
      features: MEMBERSHIP_TIERS.free.features,
      limits: MEMBERSHIP_TIERS.free.limits,
      trial: {
        active: false,
        startDate: null,
        endDate: null
      }
    };

    dispatch({
      type: 'LOGIN',
      payload: {
        user: mockUser,
        membership
      }
    });

    localStorage.setItem('sonography-school-user', JSON.stringify(mockUser));
    localStorage.setItem('sonography-school-membership', JSON.stringify(membership));
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('sonography-school-user');
    localStorage.removeItem('sonography-school-membership');
  };

  const upgradeMembership = (tier) => {
    const newMembership = {
      tier: tier,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      features: MEMBERSHIP_TIERS[tier].features,
      limits: MEMBERSHIP_TIERS[tier].limits,
      upgradedAt: new Date().toISOString(),
      trial: {
        active: false,
        startDate: null,
        endDate: null
      }
    };

    dispatch({ type: 'UPDATE_MEMBERSHIP', payload: newMembership });
    localStorage.setItem('sonography-school-membership', JSON.stringify(newMembership));
  };

  const startTrial = (tier) => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3); // 3-day trial

    const trialData = {
      tier: tier,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };

    const newMembership = {
      ...state.membership,
      tier: tier,
      features: MEMBERSHIP_TIERS[tier].features,
      limits: MEMBERSHIP_TIERS[tier].limits,
      trial: {
        active: true,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }
    };

    dispatch({ type: 'START_TRIAL', payload: trialData });
    localStorage.setItem('sonography-school-membership', JSON.stringify(newMembership));
  };

  const endTrial = () => {
    const freeMembership = {
      tier: 'free',
      expiresAt: null,
      features: MEMBERSHIP_TIERS.free.features,
      limits: MEMBERSHIP_TIERS.free.limits,
      trial: {
        active: false,
        startDate: null,
        endDate: null
      }
    };

    dispatch({ type: 'END_TRIAL' });
    localStorage.setItem('sonography-school-membership', JSON.stringify(freeMembership));
  };

  const hasFeature = (featureName) => {
    return state.membership.features.some(feature =>
      feature.toLowerCase().includes(featureName.toLowerCase())
    );
  };

  const canUseFeature = (featureType, currentUsage = 0) => {
    const limit = state.membership.limits[featureType];
    return limit === Infinity || currentUsage < limit;
  };

  const hasRole = (role) => {
    // Mock role checking - in real app, roles would be stored with user
    if (role === 'admin') {
      return state.user?.email === 'admin@example.com';
    }
    return true;
  };

  const getDaysLeftInTrial = () => {
    if (!state.membership?.trial?.active) return 0;
    
    const now = new Date();
    const endDate = new Date(state.membership.trial.endDate);
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        upgradeMembership,
        startTrial,
        endTrial,
        hasFeature,
        canUseFeature,
        hasRole,
        getDaysLeftInTrial,
        MEMBERSHIP_TIERS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}