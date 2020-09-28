import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Hello from '../components/Hello.vue'

const routes: Array<RouteRecordRaw> = [
	{
	  path: '/',
	  name: 'Hello',
	  component: Hello
	}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
