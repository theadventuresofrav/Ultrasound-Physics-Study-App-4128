import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMessageSquare, FiUser, FiCopy, FiThumbsUp, FiRefreshCw } = FiIcons;

function ConversationStarters({ userInfo, contactInfo = null }) {
  const [starters, setStarters] = useState([]);
  const [copied, setCopied] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Generate conversation starters based on user info and contact info
  const generateStarters = () => {
    setRefreshing(true);
    
    const targetPerson = contactInfo || userInfo || {};
    
    // Define categories of starters based on person's information
    const basicStarters = [
      `What aspects of ultrasound physics do you find most challenging?`,
      `Have you been studying ultrasound physics for long?`,
      `What's your background in medical imaging?`,
      `Are you preparing for a specific certification exam?`,
      `What resources have you found most helpful in your studies?`
    ];

    // Personalized starters based on role
    const roleBasedStarters = generateRoleBasedStarters(targetPerson);
    
    // Facility-based starters
    const facilityBasedStarters = generateFacilityBasedStarters(targetPerson);
    
    // Specialty-based starters
    const specialtyBasedStarters = generateSpecialtyBasedStarters(targetPerson);
    
    // Category-based starters
    const categoryBasedStarters = generateCategoryBasedStarters(targetPerson);

    // Combine and shuffle starters
    const allStarters = [
      ...basicStarters,
      ...roleBasedStarters,
      ...facilityBasedStarters,
      ...specialtyBasedStarters,
      ...categoryBasedStarters
    ].sort(() => Math.random() - 0.5);
    
    // Select a subset
    setStarters(allStarters.slice(0, 6));
    setTimeout(() => setRefreshing(false), 600);
  };

  // Generate role-specific conversation starters
  const generateRoleBasedStarters = (person) => {
    const role = person.role?.toLowerCase() || '';
    
    if (role.includes('sonographer')) {
      return [
        `I see you're a sonographer. What specialty do you enjoy scanning most?`,
        `How long have you been working as a sonographer?`,
        `What's the most interesting case you've encountered recently?`,
        `Do you have any tips for optimizing image quality in challenging patients?`,
        `What continuing education opportunities have you found most valuable?`
      ];
    }
    
    if (role.includes('physicist')) {
      return [
        `As a medical physicist, what aspects of ultrasound technology excite you most?`,
        `How do you stay current with advances in ultrasound physics?`,
        `What's your experience with quality assurance protocols?`,
        `Have you been involved in any research projects recently?`,
        `What advice would you give to students studying ultrasound physics?`
      ];
    }
    
    if (role.includes('radiologist')) {
      return [
        `What's your preferred imaging modality and why?`,
        `How has ultrasound technology evolved in your practice?`,
        `What role does ultrasound play in your diagnostic workflow?`,
        `Any interesting cases where ultrasound was particularly helpful?`,
        `How do you approach teaching residents about ultrasound physics?`
      ];
    }
    
    if (role.includes('student')) {
      return [
        `What year are you in your program?`,
        `Which ultrasound physics concepts do you find most challenging?`,
        `How are you preparing for your clinical rotations?`,
        `What study methods work best for you?`,
        `Are you considering any particular specialty after graduation?`
      ];
    }
    
    if (role.includes('educator') || role.includes('instructor') || role.includes('professor')) {
      return [
        `How long have you been teaching ultrasound physics?`,
        `What teaching methods work best for complex physics concepts?`,
        `How do you keep students engaged during theory-heavy sessions?`,
        `What changes have you seen in ultrasound education over the years?`,
        `Any tips for explaining wave propagation to visual learners?`
      ];
    }
    
    return [
      `What's your role in ${person.facility || 'your organization'}?`,
      `How did you get started in medical imaging?`,
      `What aspects of your work do you find most rewarding?`
    ];
  };

  // Generate facility-specific conversation starters
  const generateFacilityBasedStarters = (person) => {
    const facility = person.facility?.toLowerCase() || '';
    
    if (facility.includes('hospital')) {
      return [
        `What's the patient volume like at ${person.facility}?`,
        `How is the ultrasound department organized at your hospital?`,
        `What equipment do you primarily work with?`,
        `How do you handle emergency ultrasound requests?`,
        `What's the most challenging aspect of hospital-based imaging?`
      ];
    }
    
    if (facility.includes('university') || facility.includes('college')) {
      return [
        `What programs does ${person.facility} offer in medical imaging?`,
        `How do you balance teaching with clinical work?`,
        `What research opportunities are available for students?`,
        `How has online learning affected ultrasound education?`,
        `What partnerships do you have with local healthcare facilities?`
      ];
    }
    
    if (facility.includes('clinic')) {
      return [
        `What types of studies do you primarily perform at your clinic?`,
        `How does working in a clinic compare to hospital settings?`,
        `What's your patient scheduling like?`,
        `Do you specialize in particular types of ultrasound exams?`
      ];
    }
    
    return person.facility ? [
      `How long have you been with ${person.facility}?`,
      `What's the work environment like there?`,
      `What opportunities for professional development do they offer?`
    ] : [];
  };

  // Generate specialty-specific conversation starters
  const generateSpecialtyBasedStarters = (person) => {
    const specialty = person.specialty?.toLowerCase() || '';
    
    if (specialty.includes('cardiac')) {
      return [
        `Cardiac imaging must be fascinating! What drew you to that specialty?`,
        `How do you handle the technical challenges of cardiac ultrasound?`,
        `What's the most complex cardiac case you've worked on?`,
        `How important is understanding hemodynamics in your work?`,
        `Any tips for getting clear cardiac images in difficult patients?`
      ];
    }
    
    if (specialty.includes('vascular')) {
      return [
        `Vascular ultrasound requires such precision. How did you develop your skills?`,
        `What's your approach to Doppler optimization?`,
        `How do you stay current with vascular imaging protocols?`,
        `What's the most challenging vascular study you perform?`,
        `Any advice for students learning vascular techniques?`
      ];
    }
    
    if (specialty.includes('abdominal')) {
      return [
        `Abdominal imaging covers so many organs. Do you have a favorite?`,
        `How do you approach imaging patients with difficult body habitus?`,
        `What's your strategy for comprehensive abdominal surveys?`,
        `How has contrast-enhanced ultrasound changed your practice?`,
        `What pathology do you find most interesting to image?`
      ];
    }
    
    if (specialty.includes('obstetric') || specialty.includes('ob')) {
      return [
        `OB ultrasound must be so rewarding! What's your favorite part?`,
        `How do you handle the emotional aspects of prenatal imaging?`,
        `What's the most memorable scan you've performed?`,
        `How do you explain findings to expectant parents?`,
        `What advances in fetal imaging excite you most?`
      ];
    }
    
    if (specialty.includes('physics')) {
      return [
        `What aspects of ultrasound physics do you focus on?`,
        `How do you explain complex physics concepts to clinicians?`,
        `What's your experience with quality assurance programs?`,
        `Are you involved in any research or equipment evaluation?`,
        `What physics principles do you think are most misunderstood?`
      ];
    }
    
    return person.specialty ? [
      `${person.specialty} sounds interesting. How did you choose that specialty?`,
      `What's the most rewarding aspect of working in ${person.specialty}?`,
      `What challenges do you face in your specialty area?`
    ] : [];
  };

  // Generate category-specific conversation starters
  const generateCategoryBasedStarters = (person) => {
    const category = person.category || '';
    
    if (category === 'academic') {
      return [
        `What's your favorite topic to teach in ultrasound physics?`,
        `How do you make complex physics concepts accessible to students?`,
        `What changes would you like to see in ultrasound education?`,
        `How do you incorporate hands-on learning in your curriculum?`,
        `What research projects are you currently involved in?`
      ];
    }
    
    if (category === 'vendor') {
      return [
        `What ultrasound systems do you work with most often?`,
        `How do you help customers optimize their imaging protocols?`,
        `What's the most common technical issue you help resolve?`,
        `How has ultrasound technology evolved recently?`,
        `What training do you provide to new users?`
      ];
    }
    
    if (category === 'healthcare') {
      return [
        `What's a typical day like in your clinical practice?`,
        `How do you stay current with best practices?`,
        `What's the most challenging aspect of patient care?`,
        `How has technology improved your workflow?`,
        `What advice would you give to new graduates entering the field?`
      ];
    }
    
    return [];
  };

  // Generate starters on initial render
  useEffect(() => {
    generateStarters();
  }, [userInfo, contactInfo]);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const personName = contactInfo?.name || userInfo?.name || 'this person';
  const headerText = contactInfo ? 
    `Conversation starters for connecting with ${personName}` : 
    'Conversation starters for networking';

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-medical-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <SafeIcon icon={FiMessageSquare} className="text-2xl text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-medical-900">Conversation Starters</h2>
            <p className="text-sm text-medical-600">{headerText}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generateStarters}
          disabled={refreshing}
          className={`p-2 rounded-full ${refreshing ? 'bg-medical-100' : 'bg-primary-100 hover:bg-primary-200'} transition-colors`}
        >
          <SafeIcon 
            icon={FiRefreshCw} 
            className={`text-xl ${refreshing ? 'text-medical-400 animate-spin' : 'text-primary-600'}`} 
          />
        </motion.button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {refreshing ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <SafeIcon icon={FiRefreshCw} className="text-3xl text-medical-400 animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key="starters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {starters.map((starter, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white rounded-xl border border-medical-200 hover:border-primary-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-primary-50 rounded-full">
                      <SafeIcon icon={FiUser} className="text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-medical-800">{starter}</p>
                      <div className="mt-2 flex justify-end">
                        <button
                          onClick={() => handleCopy(starter, index)}
                          className="flex items-center space-x-1 text-xs text-primary-600 hover:text-primary-700"
                        >
                          <SafeIcon icon={copied === index ? FiThumbsUp : FiCopy} className="text-xs" />
                          <span>{copied === index ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 text-center text-sm text-medical-600">
        {contactInfo ? 
          `Personalized conversation starters based on ${personName}'s background` :
          'Use these conversation starters to engage with other students and instructors'
        }
      </div>
    </div>
  );
}

export default ConversationStarters;