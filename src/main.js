import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import './assets/style.css'
import FontAwesome from '@/plugins/FontAwesome'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(FontAwesome)

const components = import.meta.glob('./components/App*.vue', { eager: true })
Object.keys(components).forEach((path) => {
  const name = path.match(/(.*)components\/(.*)\.vue$/)[2]
  const component = components[path].default
  app.component(name, component)
})

app.mount('#app')
