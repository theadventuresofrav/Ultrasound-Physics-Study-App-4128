/**
 * Contact Service for managing contacts in the ultrasound physics app
 */

// Default categories for organizing contacts
export const CONTACT_CATEGORIES = [
  { id: 'healthcare', label: 'Healthcare Professional', color: 'emerald' },
  { id: 'academic', label: 'Academic/Educator', color: 'blue' },
  { id: 'vendor', label: 'Vendor/Equipment', color: 'amber' },
  { id: 'student', label: 'Student', color: 'purple' },
  { id: 'other', label: 'Other', color: 'slate' }
];

// Helper function to validate contact data
export function validateContact(contact) {
  // Required fields
  if (!contact.name || contact.name.trim() === '') {
    return { valid: false, error: 'Name is required' };
  }
  
  // Email format validation if provided
  if (contact.email && !isValidEmail(contact.email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  // Phone number format validation if provided
  if (contact.phone && !isValidPhone(contact.phone)) {
    return { valid: false, error: 'Invalid phone number format' };
  }
  
  return { valid: true };
}

// Helper function to format a contact for display
export function formatContact(contact) {
  return {
    ...contact,
    name: contact.name || 'Unknown Contact',
    role: contact.role || 'Not specified',
    facility: contact.facility || 'Not specified',
    specialty: contact.specialty || 'Not specified',
    category: contact.category || 'other'
  };
}

// Helper function to search contacts
export function searchContacts(contacts, query) {
  if (!query || query.trim() === '') {
    return contacts;
  }
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(normalizedQuery) ||
      (contact.role && contact.role.toLowerCase().includes(normalizedQuery)) ||
      (contact.facility && contact.facility.toLowerCase().includes(normalizedQuery)) ||
      (contact.specialty && contact.specialty.toLowerCase().includes(normalizedQuery)) ||
      (contact.email && contact.email.toLowerCase().includes(normalizedQuery)) ||
      (contact.notes && contact.notes.toLowerCase().includes(normalizedQuery))
    );
  });
}

// Helper function to filter contacts by category
export function filterContactsByCategory(contacts, category) {
  if (!category || category === 'all') {
    return contacts;
  }
  
  return contacts.filter(contact => contact.category === category);
}

// Helper function to sort contacts by different fields
export function sortContacts(contacts, sortBy = 'name', sortOrder = 'asc') {
  return [...contacts].sort((a, b) => {
    let valueA = (a[sortBy] || '').toString().toLowerCase();
    let valueB = (b[sortBy] || '').toString().toLowerCase();
    
    if (valueA < valueB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

// Helper function to group contacts by category
export function groupContactsByCategory(contacts) {
  const groupedContacts = {};
  
  CONTACT_CATEGORIES.forEach(category => {
    groupedContacts[category.id] = [];
  });
  
  contacts.forEach(contact => {
    const category = contact.category || 'other';
    if (!groupedContacts[category]) {
      groupedContacts[category] = [];
    }
    groupedContacts[category].push(contact);
  });
  
  return groupedContacts;
}

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function to validate phone format
function isValidPhone(phone) {
  // Allow various phone formats with optional country code
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/;
  return phoneRegex.test(phone);
}

// Helper function to generate a vCard for a contact
export function generateVCard(contact) {
  let vCard = 'BEGIN:VCARD\n';
  vCard += 'VERSION:3.0\n';
  vCard += `FN:${contact.name || ''}\n`;
  vCard += `TITLE:${contact.role || ''}\n`;
  
  if (contact.email) {
    vCard += `EMAIL;TYPE=WORK:${contact.email}\n`;
  }
  
  if (contact.phone) {
    vCard += `TEL;TYPE=WORK:${contact.phone}\n`;
  }
  
  if (contact.facility) {
    vCard += `ORG:${contact.facility}\n`;
  }
  
  if (contact.notes) {
    vCard += `NOTE:${contact.notes}\n`;
  }
  
  vCard += 'END:VCARD';
  
  return vCard;
}

// Helper function to export contacts to vCard format
export function exportContactsToVCard(contacts) {
  return contacts.map(contact => generateVCard(contact)).join('\n');
}

// Helper function to export contacts to CSV format
export function exportContactsToCSV(contacts) {
  const headers = ['Name', 'Role', 'Facility', 'Email', 'Phone', 'Specialty', 'Category', 'Notes'];
  const rows = contacts.map(contact => [
    contact.name || '',
    contact.role || '',
    contact.facility || '',
    contact.email || '',
    contact.phone || '',
    contact.specialty || '',
    contact.category || '',
    contact.notes || ''
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
  ].join('\n');
  
  return csvContent;
}