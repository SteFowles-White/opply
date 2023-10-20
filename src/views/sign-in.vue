<template>
	<div class="sign-in">
		<Form @authenticate="onAuthenticate" />
	</div>
</template>

<script setup>
import Form from "../components/login/form.vue";
import { useRouter } from "vue-router";

// Set up router
const router = useRouter();

const onAuthenticate = () => {
	router.push("/suppliers");
};
</script>

<style scoped>
.sign-in {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: var(--colour-purple);
}
</style>