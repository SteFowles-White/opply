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

// For when brower refreshes
pinia.use((context) => {
	// Sync store with sessionStorage
	const fromStorage = JSON.parse(window.sessionStorage.getItem("store"));

	if (fromStorage) {
		context.store.$patch(fromStorage);
	}

	context.store.$subscribe((mutation, state) => {
		window.sessionStorage.setItem("store", JSON.stringify(state));
	});
});

// register plugins
app.use(router);
app.use(pinia);

app.mount("#app");
