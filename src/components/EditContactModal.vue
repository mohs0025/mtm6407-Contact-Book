<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h1>Edit Contact</h1>
        <form @submit.prevent="updateContact">
          <div>
            <label for="firstName">First Name:</label>
            <input v-model="editedContact.firstName" id="firstName" type="text" required />
          </div>
          <div>
            <label for="lastName">Last Name:</label>
            <input v-model="editedContact.lastName" id="lastName" type="text" required />
          </div>
          <div>
            <label for="email">Email:</label>
            <input v-model="editedContact.email" id="email" type="email" required />
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
  import { ref, watch } from 'vue';
  
  const emits = defineEmits(['close', 'updated']);
  
  const editedContact = ref({});
  
  // Prop to pass the contact to edit
  const props = defineProps({
    contact: {
      type: Object,
      required: true,
    },
  });
  
  // Watch the `contact` prop to populate the form fields
  watch(
    () => props.contact,
    (newContact) => {
      editedContact.value = { ...newContact };
    },
    { immediate: true }
  );
  
  function updateContact() {
    emits('updated', editedContact.value); // Emit the updated contact to the parent
    close();
  }
  
  function close() {
    emits('close'); // Notify the parent to close the modal
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

.modal-overlay h1 {
  margin-bottom: 20px;
  color: #d41356;
  margin-top: 0;
  padding-bottom: 20px;
  font-size: 1.5rem;
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
  width: 100%; /* Ensure input uses full width */
  padding: 8px 20px 8px 8px; /* Add 20px padding to the right, 8px padding to the left */
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Ensure padding doesn't reduce the field size */
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
  