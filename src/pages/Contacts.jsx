import React from 'react';
import { motion } from 'framer-motion';
import ContactsPage from '../components/contacts/ContactsPage';

function Contacts() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full">
      <ContactsPage />
    </motion.div>
  );
}

export default Contacts;