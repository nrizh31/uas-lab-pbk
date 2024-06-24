import { createRouter, createWebHistory } from 'vue-router'

// Import your components here
import App from '../App.vue'

const routes = [
  { path: '/', component: App }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
