import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AddContact from '../views/AddContact.vue';
// import ContactDetails from '../views/ContactDetails.vue';

const router = createRouter({
  history: createWebHistory(), //  modern browser history API for clean URLs
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home, // The main page showing the contact list
    },
    {
      path: '/add',
      name: 'add',
      component: AddContact, // Page for adding a new contact
    },
  ],
});

export default router;
