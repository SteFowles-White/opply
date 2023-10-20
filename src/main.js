import * as Vue from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import * as VueRouter from "vue-router";
import routes from "./config/routes";
import "./utilities/validators";
import "./style.css";

// Create app
const app = Vue.createApp(App);
const pinia = createPinia();
const router = VueRouter.createRouter({
	history: VueRouter.createWebHistory(),
	routes,
});

// register plugins
app.use(router);
app.use(pinia);

app.mount("#app");
