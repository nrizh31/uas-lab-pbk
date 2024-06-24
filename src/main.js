import { createApp } from 'vue'
import { Quasar } from 'quasar'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Import router
import router from './router/router.js'

// Import App component
import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {} // Import Quasar plugins and add here if needed
})

myApp.use(router)

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
