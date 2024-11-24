<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
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
        <div class="form-buttons">
          <button type="submit">Save</button>
          <button type="button" @click="close">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emits = defineEmits(['close', 'added']);

const firstName = ref('');
const lastName = ref('');
const email = ref('');

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
  emits('added', newContact); // Notify parent of the new contact
  close();
}

function close() {
  emits('close'); // Notify parent to close the modal
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  max-width: 500px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  text-align: left;
  color: #333;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
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
  margin: 5px;
}

button:hover {
  background-color: #a20d43;
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>
