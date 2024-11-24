<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <slot></slot> <!-- Slot for custom content -->
      <button class="close-button" @click="close">Close</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(['close']);

function close() {
  emits('close');
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
  color: #333;
}

::v-deep(.modal-content h1) {
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove padding */
  font-size: 2rem; /* Adjust font size as needed */
  margin-bottom: 10px; /* Optional: Adjust spacing below heading */
  color: #d41356; /* Ensure correct color is applied */
}

.close-button {
  background-color: #d41356;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 20px;
}

.close-button:hover {
  background-color: #333;
}
</style>
