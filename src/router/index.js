import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AddContact from '../views/AddContact.vue';
import ContactDetails from '../views/ContactDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/add', component: AddContact },
  { path: '/details/:id', component: ContactDetails }, // New route for contact details
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
