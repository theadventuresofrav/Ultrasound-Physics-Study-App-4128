import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import ContactDetails from './ContactDetails';

const { FiUsers, FiSearch, FiPlus, FiFilter, FiDownload, FiUpload } = FiIcons;

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  // Fetch contacts on component mount
  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts when search term or filter category changes
  useEffect(() => {
    filterContacts();
  }, [searchTerm, filterCategory, contacts]);

  const fetchContacts = async () => {
    // In a real application, this would be an API call
    // For now, we'll use mock data
    const mockContacts = [
      {
        id: '1',
        name: 'Dr. Sarah Johnson',
        role: 'Sonographer',
        facility: 'City General Hospital',
        email: 'sarah.johnson@citygeneral.org',
        phone: '+1 (555) 123-4567',
        specialty: 'Cardiac',
        category: 'healthcare',
        notes: 'Expert in pediatric cardiac imaging',
        image: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      {
        id: '2',
        name: 'Prof. Michael Chen',
        role: 'Medical Physicist',
        facility: 'University Medical Center',
        email: 'mchen@umc.edu',
        phone: '+1 (555) 987-6543',
        specialty: 'Ultrasound Physics',
        category: 'academic',
        notes: 'Published researcher in harmonic imaging',
        image: 'https://randomuser.me/api/portraits/men/42.jpg'
      },
      {
        id: '3',
        name: 'Lisa Rodriguez',
        role: 'Equipment Specialist',
        facility: 'MedTech Solutions',
        email: 'lisa.r@medtechsolutions.com',
        phone: '+1 (555) 789-0123',
        specialty: 'System Configuration',
        category: 'vendor',
        notes: 'Contact for equipment issues and upgrades',
        image: 'https://randomuser.me/api/portraits/women/63.jpg'
      },
      {
        id: '4',
        name: 'Dr. James Wilson',
        role: 'Radiologist',
        facility: 'Riverside Medical Center',
        email: 'jwilson@riverside.org',
        phone: '+1 (555) 456-7890',
        specialty: 'Abdominal Imaging',
        category: 'healthcare',
        notes: 'Available for consultation Tue-Thu',
        image: 'https://randomuser.me/api/portraits/men/22.jpg'
      },
      {
        id: '5',
        name: 'Emily Martinez',
        role: 'Ultrasound Program Director',
        facility: 'State University',
        email: 'e.martinez@state.edu',
        phone: '+1 (555) 234-5678',
        specialty: 'Education',
        category: 'academic',
        notes: 'Coordinates student rotations and internships',
        image: 'https://randomuser.me/api/portraits/women/17.jpg'
      }
    ];

    setContacts(mockContacts);
    setFilteredContacts(mockContacts);
  };

  const filterContacts = () => {
    let results = [...contacts];

    // Apply search filter
    if (searchTerm) {
      results = results.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      results = results.filter(contact => contact.category === filterCategory);
    }

    setFilteredContacts(results);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleAddContact = (newContact) => {
    // Generate a unique ID (in a real app, the server would do this)
    const id = (contacts.length + 1).toString();
    const contactWithId = { ...newContact, id };
    setContacts([...contacts, contactWithId]);
    setIsFormOpen(false);
  };

  const handleEditContact = (updatedContact) => {
    const updatedContacts = contacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    setSelectedContact(updatedContact);
    setIsDetailsOpen(true);
    setIsFormOpen(false);
  };

  const handleDeleteContact = (id) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    setContacts(updatedContacts);
    setSelectedContact(null);
    setIsDetailsOpen(false);
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setIsDetailsOpen(true);
  };

  const exportContacts = () => {
    const dataStr = JSON.stringify(contacts, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'contacts.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importContacts = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedContacts = JSON.parse(e.target.result);
          setContacts([...contacts, ...importedContacts]);
        } catch (error) {
          console.error("Error parsing contacts file:", error);
          alert("Invalid contacts file format");
        }
      };
      reader.readAsText(file);
    }
    // Reset the file input
    event.target.value = null;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-mystical font-bold text-white mb-2">
            Contacts Directory
          </h1>
          <p className="text-slate-300">
            Manage your ultrasound physics contacts and resources
          </p>
        </motion.div>

        {/* Controls Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex-1 min-w-[280px]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-3 pl-10 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mystic-500"
              />
              <SafeIcon
                icon={FiSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                value={filterCategory}
                onChange={handleFilterChange}
                className="p-3 pl-10 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mystic-500 appearance-none"
              >
                <option value="all">All Categories</option>
                <option value="healthcare">Healthcare</option>
                <option value="academic">Academic</option>
                <option value="vendor">Vendor</option>
                <option value="student">Student</option>
                <option value="other">Other</option>
              </select>
              <SafeIcon
                icon={FiFilter}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-mystic-500 to-cosmic-500 text-white font-cosmic font-semibold rounded-lg hover:shadow-lg hover:shadow-mystic-500/25 transition-all duration-300"
            >
              <SafeIcon icon={FiPlus} />
              <span>Add Contact</span>
            </motion.button>

            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportContacts}
                className="p-3 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-slate-300 hover:bg-slate-800 transition-all duration-300"
                title="Export Contacts"
              >
                <SafeIcon icon={FiDownload} />
              </motion.button>

              <label className="cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-slate-800/50 border border-mystic-500/30 rounded-lg text-slate-300 hover:bg-slate-800 transition-all duration-300"
                  title="Import Contacts"
                >
                  <SafeIcon icon={FiUpload} />
                </motion.div>
                <input
                  type="file"
                  accept=".json"
                  onChange={importContacts}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Contacts Grid */}
        {filteredContacts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredContacts.map(contact => (
              <ContactCard
                key={contact.id}
                contact={contact}
                onClick={() => handleContactClick(contact)}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiUsers} className="text-slate-400 text-2xl" />
            </div>
            <h3 className="text-xl font-mystical font-bold text-white mb-2">
              No contacts found
            </h3>
            <p className="text-slate-400 mb-6">
              Try adjusting your search or filters, or add a new contact
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-mystic-500 to-cosmic-500 text-white font-cosmic font-semibold rounded-lg hover:shadow-lg hover:shadow-mystic-500/25 transition-all duration-300"
            >
              <SafeIcon icon={FiPlus} />
              <span>Add Contact</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddContact}
        initialData={null}
        mode="add"
      />

      {/* Contact Details Modal */}
      <ContactDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        contact={selectedContact}
        onEdit={() => {
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteContact}
      />

      {/* Edit Form Modal */}
      {selectedContact && (
        <ContactForm
          isOpen={isFormOpen && isDetailsOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleEditContact}
          initialData={selectedContact}
          mode="edit"
        />
      )}
    </div>
  );
};

export default ContactsPage;