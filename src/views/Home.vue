<script setup>
import { ref, computed, onMounted } from 'vue';
import Modal from '../components/Modal.vue'; // Import the modal component
import { useRouter } from 'vue-router';

const router = useRouter(); // Get router instance

// Contacts list fetched from localStorage
const contacts = ref([]);

// Modal state for contact details
const selectedContact = ref(null); // Currently selected contact
const isModalOpen = ref(false); // Modal visibility

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

// Navigate to AddContact view
function goToAddContact() {
  router.push('/add'); // Navigate to the /add route
}

// Open the modal with selected contact details
function openModal(contact) {
  selectedContact.value = contact;
  isModalOpen.value = true;
}

// Close the modal
function closeModal() {
  isModalOpen.value = false;
  selectedContact.value = null;
}
</script>

<template>
  <div>
    <!-- Heading Outside -->
    <h1 class="main-title">Contact Book</h1>

    <div class="contact-book">
      <!-- White Background Container -->
      <div class="container">
        <!-- Filter Section -->
        <div class="filter-section">
          <label for="filter">Filter by:</label>
          <select id="filter" v-model="sortCriteria">
            <option value="lastName">Last Name</option>
            <option value="firstName">First Name</option>
          </select>
        </div>

        <div class="main-content">
          <!-- Buttons Section -->
          <div class="button-container">
            <button class="search-button">
              <i class="fas fa-search"></i> Search Contact
            </button>
            <button class="add-button" @click="goToAddContact">
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
                  
                  <div class="contact-actions">
                    <button>
                      <i class="fas fa-edit"></i> <!-- Edit Icon -->
                    </button>
                    <button>
                      <i class="fas fa-trash"></i> <!-- Delete Icon -->
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Component -->
    <Modal v-if="isModalOpen" @close="closeModal">
      <h1>Contact Details</h1>
      <p><strong>First Name:</strong> {{ selectedContact.firstName }}</p>
      <p><strong>Last Name:</strong> {{ selectedContact.lastName }}</p>
      <p><strong>Email:</strong> {{ selectedContact.email }}</p>
    </Modal>
  </div>
</template>

<style scoped>
.contact-book {
  display: flex;
  justify-content: center;
  /* Center the container horizontally */
  align-items: center;
  /* Center the container vertically */
  min-height: 100vh;
  /* Full viewport height */
  background-color: #242424;
  color: #ffffff;
}

.main-title {
  /* font-size: 2rem; */
  /* font-weight: bold; */
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
}

.container {
  width: 70vw;
  /* Set container width */
  background-color: #ffffff;
  color: #000000;
  padding: 20px;
  border-radius: 8px;
  /* Optional: Add rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  /* Optional: Add shadow */
}

.filter-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-section label {
  margin-right: 0;
}

.filter-section select {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
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
  /* Align buttons to the right */
  gap: 10px;
  /* Add spacing between the buttons */
  margin-top: 10px;
  /* Optional: Add spacing above the buttons */
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #242424;
  color: #ffffff;
  font-size: 20px;
  font-weight: bold;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #838383;
}

.contact-actions button {
  background: none;
  border: none;
  color: #d41356;
  cursor: pointer;
  font-size: 1.2rem; /* Adjust size of icons */
  margin-left: 8px; /* Add some spacing between icons */
}

.contact-name {
  width: 500px;
  /* Set a specific width, e.g., 50% of the parent container */
  white-space: nowrap;
  /* Prevent text from wrapping */
  overflow: hidden;
  /* Hide overflow text */
  text-overflow: ellipsis;
  /* Add ellipsis for overflowed text */
  cursor: pointer;
}

.contact-name:hover {
  color: #d41356;
}
</style>
