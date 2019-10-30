import Vue from 'vue'
import VueRouter from 'vue-router'
import Contacts from './views/Contacts.vue'
import FaxStatus from './views/FaxStatus.vue'
import SendFax from './views/SendFax.vue'
import config from './views/Config.vue'

// const Category = () => System.import('./theme/Category.vue')
// const Login = () => System.import('./theme/Login.vue')
// const NotFound = () => System.import('./theme/NotFound.vue')

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'is-active',
    routes: [
        { path: '/contacts', component: Contacts },
        { path: '/faxStatus', component: FaxStatus },
        { path: '/sendFax', component: SendFax },
        { path: '/supersecertpagethatwillallowyoutoedittheconfig', component: config}
    ]
})

export default router