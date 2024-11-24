<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute(); // Access route parameters
const contact = ref(null); // Ref to hold the contact's details

onMounted(() => {
  const contactId = route.params.id; // Get the contact ID from the route
  const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
  contact.value = contacts.find((c) => c.id === Number(contactId)); // Find the contact by ID
});
</script>

<template>
  <div class="add-contact-page">
    <div class="contact-details">
      <h1>Contact Details</h1>
      <div v-if="contact">
        <p><strong>First Name:</strong> {{ contact.firstName }}</p>
        <p><strong>Last Name:</strong> {{ contact.lastName }}</p>
        <p><strong>Email:</strong> {{ contact.email }}</p>
      </div>
      <div v-else>
        <p>Contact not found.</p>
      </div>
      <button @click="$router.push('/')">Back to Contacts</button>
    </div>
  </div>
</template>

<style scoped>
.contact-details {
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #333;
}

h1 {
  text-align: center;
  color: #d41356;
  margin-top: 0;
}

button {
  background-color: #d41356;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #333;
}

.add-contact-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full viewport height */
  background-color: #242424; /* Same as global background */
  /* padding: 20px; */
}
</style>
