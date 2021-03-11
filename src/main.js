import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import Routes from './routes.js'
//import PageContent from "@/components/PageContent";

Vue.config.productionTip = false
// Use Vue Router
Vue.use(VueRouter)
// Register component globally
// Vue.component(PageContent)

const myRouter = new VueRouter({
    routes: Routes,
    mode: 'history'
})
new Vue({
    render: h => h(App),
    router: myRouter
}).$mount('#app')
