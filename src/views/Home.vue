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
</script>



<template>
  <div>
    <!-- Heading -->
    <h1 class="main-title">Contact Book</h1>

    <div class="contact-book">
      <!-- Container -->
      <div class="container">
        <!-- Filter Section -->
        <div class="filter-section">
          <label for="filter">Filter by:</label>
          <select id="filter" v-model="sortCriteria">
            <option value="lastName">Last Name</option>
            <option value="firstName">First Name</option>
          </select>
        </div>

        <!-- Main Content -->
        <div class="main-content">
          <!-- Buttons Section -->
          <div class="button-container">
            <button class="search-button">
              <i class="fas fa-search"></i> Search Contact
            </button>
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
              <div>
                <div
                  v-for="contact in contacts"
                  :key="contact.id"
                  class="contact-item"
                >
                  <div class="contact-name" @click="openModal(contact)">
                    <strong>{{ contact.firstName }} {{ contact.lastName }}</strong>
                  </div>

                  <!-- Edit and Delete Icons -->
                  <div class="contact-actions">
                    <button @click="openEditModal(contact)">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button>
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>

                </div>
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

    <!-- add edit contact modal -->
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
  min-height: 100vh;
  background-color: #242424;
  color: #ffffff;
}

.main-title {
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
}

.container {
  width: 70vw;
  background-color: #ffffff;
  color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.search-button,
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

.button-container {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
}

.search-button:hover,
.add-button:hover {
  background-color: #333333;
}

.contact-list {
  margin-top: 20px;
}

.group {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 20px;
}

.contact-initial {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #d41356;
  color: #ffffff;
  font-size: 18px;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #838383;
}

.contact-name {
  width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  color: #333;
}

.contact-name:hover {
  color: #d41356;
}

.contact-actions button {
  background: none;
  border: none;
  color: gray;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 8px;
}

.contact-actions button:hover {
  color: #d41356;
}
</style>

