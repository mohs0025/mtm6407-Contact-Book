<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Form fields
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const router = useRouter();

// Handle form submission
function saveContact() {
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  const newContact = {
    id: Date.now(), // Generate unique ID based on timestamp
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  };

  contacts.push(newContact); // Add the new contact
  localStorage.setItem('contacts', JSON.stringify(contacts)); // Save to localStorage
  router.push('/'); // Navigate back to the home page
}
</script>

<template>
  <div class="add-contact">
    <h1>Add New Contact</h1>
    <form @submit.prevent="saveContact">
      <div>
        <label for="firstName">First Name:</label>
        <input v-model="firstName" id="firstName" type="text" required />
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input v-model="lastName" id="lastName" type="text" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<style scoped>
.add-contact {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  /* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); */
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #d41356;
  padding-bottom: 20px;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #d41356;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
}

button:hover {
  background-color: #a20d43;
}
</style>
