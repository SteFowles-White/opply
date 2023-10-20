<template>
	<router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "./store/store";
import { useRouter } from "vue-router";

// Set up router
const router = useRouter();

// Store
const store = useStore();

// Hooks
onMounted(() => {
	// Check to see if has access to app otherwise redirect to signin page
	if (!store.token && !Object.keys(store.user).length) {
		router.push("/");
	}
});
</script>
