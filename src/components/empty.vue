<template>
	<div class="empty">
		<img class="alert" src="../../public/alert.png" alt="An alert icon" />
		<p class="message">There are currently no {{ props.value }} to view</p>
		<p>If this continues please contact us</p>
	</div>
</template>

<script setup>
const props = defineProps({
	value: {
		type: String,
		required: true,
	},
});
</script>


<style scoped>
.empty {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	max-width: 500px;
	background-color: var(--colour-faded);
	text-align: center;
	padding: 5rem 1rem;
}

.alert {
	width: 50px;
	margin: auto;
	margin-bottom: 1rem;
}

.message {
	font-size: 1.25rem;
	font-weight: 500;
}
</style>