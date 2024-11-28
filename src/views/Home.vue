<script setup>
import { ref, computed, onMounted } from 'vue';
import Modal from '../components/Modal.vue'; // Contact Details Modal
import AddContactModal from '../components/AddContactModal.vue'; // Add Contact Modal
import EditContactModal from '../components/EditContactModal.vue'; // Import the edit modal

// Contacts list fetched from localStorage
const contacts = ref([]);
const selectedContact = ref(null); // Selected contact for details
const isModalOpen = ref(false); // Contact details modal visibility
const isAddModalOpen = ref(false); // Add contact modal visibility

// Load contacts from localStorage when the component is mounted
onMounted(() => {
  const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contacts.value = storedContacts;
});

// Ref for the sorting criteria (default: by last name)
const sortCriteria = ref('lastName');

// Computed property to sort contacts
const sortedContacts = computed(() => {
  return [...contacts.value].sort((a, b) =>
    a[sortCriteria.value].localeCompare(b[sortCriteria.value])
  );
});

// Group sorted contacts by the first letter of the selected sort criteria
const groupedContacts = computed(() => {
  const groups = {};
  sortedContacts.value.forEach((contact) => {
    const letter = contact[sortCriteria.value].charAt(0).toUpperCase();
    if (!groups[letter]) {
      groups[letter] = [];
    }
    groups[letter].push(contact);
  });
  return groups;
});

// Open modals
function openModal(contact) {
  selectedContact.value = contact;
  isModalOpen.value = true;
}

function openAddModal() {
  isAddModalOpen.value = true;
}

// Close modals
function closeModal() {
  isModalOpen.value = false;
  selectedContact.value = null;
}

function closeAddModal() {
  isAddModalOpen.value = false;
}

// Add a new contact to the list
function handleNewContact(newContact) {
  contacts.value.push(newContact); // Update the contact list
  localStorage.setItem('contacts', JSON.stringify(contacts.value)); // Save updated list to localStorage
  closeAddModal(); // Close the modal
}

// for edit contact section
const isEditModalOpen = ref(false); // State for edit modal visibility

function openEditModal(contact) {
  selectedContact.value = { ...contact }; // Clone the contact to edit
  isEditModalOpen.value = true;
}

function closeEditModal() {
  isEditModalOpen.value = false;
  selectedContact.value = null;
}

function handleContactUpdate(updatedContact) {
  const index = contacts.value.findIndex((c) => c.id === updatedContact.id);
  if (index !== -1) {
    contacts.value[index] = updatedContact; // Update the contact in the list
    localStorage.setItem('contacts', JSON.stringify(contacts.value)); // Save to localStorage
  }
  closeEditModal();
}


// add delete contact section
// Function to delete a contact with confirmation
function deleteContact(contactId) {
  // Ask for confirmation before deletion
  const isConfirmed = confirm('Are you sure you want to delete this contact?');
  if (!isConfirmed) {
    return; // Exit the function if user cancels
  }

  // Filter out the contact with the specified ID
  contacts.value = contacts.value.filter((contact) => contact.id !== contactId);

  // Update local storage
  localStorage.setItem('contacts', JSON.stringify(contacts.value));

  // Optional: Notify user about successful deletion
  alert('Contact deleted successfully!');
}



// add some static data
[
  { "id": 1, "firstName": "Alice", "lastName": "Anderson", "email": "alice.anderson@example.com" },
  { "id": 2, "firstName": "Alan", "lastName": "Archer", "email": "alan.archer@example.com" },
  { "id": 3, "firstName": "Xander", "lastName": "Xenon", "email": "xander.xenon@example.com" },
  { "id": 4, "firstName": "Sophie", "lastName": "Smith", "email": "sophie.smith@example.com" },
  { "id": 5, "firstName": "Sara", "lastName": "Xia", "email": "sara.sullivan@example.com" }
]
onMounted(async () => {
  const storedContacts = JSON.parse(localStorage.getItem('contacts'));

  if (!storedContacts || storedContacts.length === 0) {
    // Fetch contacts from server
    const response = await fetch('https://yourserver.com/default-contacts.json');
    const defaultContacts = await response.json();

    // Save to localStorage for future use
    localStorage.setItem('contacts', JSON.stringify(defaultContacts));
    contacts.value = defaultContacts;
  } else {
    contacts.value = storedContacts;
  }
});



</script>



<template>
  <div>
    <!-- Heading -->
    <h1 class="main-title">Contact Book</h1>

    <div class="contact-book">
      <!-- Container -->
      <div class="container">
        <!-- Filter and Button Section -->
        <div class="top-section" style="padding-bottom: 100px;">
          <!-- Filter Dropdown -->
          <div class="filter-section">
            <label for="filter">Filter by:</label>
            <select id="filter" v-model="sortCriteria">
              <option value="lastName">Last Name</option>
              <option value="firstName">First Name</option>
            </select>
          </div>

          <!-- Add New Contact Button -->
          <button class="add-button" @click="openAddModal">
            <i class="fas fa-plus"></i> Add New Contact
          </button>
        </div>

        <!-- Contact List Section -->
        <div class="contact-list">
          <div
            v-for="(contacts, letter) in groupedContacts"
            :key="letter"
            class="group"
          >
            <!-- Alphabet Circle -->
            <div class="contact-initial">{{ letter }}</div>
            <div
              v-for="contact in contacts"
              :key="contact.id"
              class="contact-item"
            >
              <!-- Contact Name -->
              <div class="contact-name">
                <strong>{{ contact.firstName }} {{ contact.lastName }}</strong>
              </div>
              <!-- Edit and Delete Icons -->
              <div class="contact-actions">
                <button @click="openEditModal(contact)">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteContact(contact.id)">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Details Modal -->
    <Modal v-if="isModalOpen" @close="closeModal">
      <h1>Contact Details</h1>
      <p><strong>First Name:</strong> {{ selectedContact.firstName }}</p>
      <p><strong>Last Name:</strong> {{ selectedContact.lastName }}</p>
      <p><strong>Email:</strong> {{ selectedContact.email }}</p>
    </Modal>

    <!-- Add Contact Modal -->
    <AddContactModal
      v-if="isAddModalOpen"
      @close="closeAddModal"
      @added="handleNewContact"
    />

    <!-- Edit Contact Modal -->
    <EditContactModal
      v-if="isEditModalOpen"
      :contact="selectedContact"
      @close="closeEditModal"
      @updated="handleContactUpdate"
    />
  </div>
</template>








<style scoped>
.contact-book {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #242424;
  color: #ffffff;
}

.main-title {
  text-align: center;
  margin-bottom: 45px;
  color: #ffffff;
}

.container {
  width: 70vw;
  background-color: #ffffff;
  color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.top-section {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping for responsiveness */
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-button {
  background-color: #d41356;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.add-button:hover {
  background-color: #333333;
}

.contact-list {
  margin-top: 20px;
}

.group {
  margin-top: 20px;
}

.contact-initial {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 50%;
  background-color: #d41356; /* Background for the circle */
  color: #ffffff;
  margin-bottom: 10px;
}

.contact-item {
  display: flex;
  justify-content: space-between; /* Align name and icons in one row */
  align-items: center; /* Vertically align items */
  border-bottom: 1px solid #838383;
  padding: 10px 0; /* Add spacing for better layout */
}

.contact-name {
  flex-grow: 1; /* Allow the name to take remaining space */
  white-space: nowrap; /* Prevent wrapping of text */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis; /* Add ellipsis for long text */
  color: #333;
}

.contact-name:hover {
  color: #d41356;
}

.contact-actions {
  display: flex;
  gap: 10px;
}

.contact-actions button {
  background: none;
  border: none;
  color: gray;
  cursor: pointer;
  font-size: 1.2rem;
}

.contact-actions button:hover {
  color: #d41356;
}

/* Make the layout responsive */
@media (max-width: 768px) {
  .contact-item {
    flex-wrap: wrap; /* Allow wrapping for smaller screens */
  }

  .contact-name {
    margin-bottom: 10px; /* Add spacing when wrapping */
  }

  .contact-actions {
    justify-content: flex-end;
    width: 100%; /* Make actions align properly on wrap */
  }
}
</style>







