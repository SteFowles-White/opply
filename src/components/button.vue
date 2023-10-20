<template>
	<button
		class="button"
		:class="[props.colour.length ? props.colour : '']"
		:type="type"
	>
		<slot />
	</button>
</template>

<script setup>
const props = defineProps({
	type: {
		type: String,
		default: "button",
	},

	// TODO: add validation for colours
	colour: {
		type: String,
		default: "",
	},
});
</script >

<style scope>
.button {
	display: flex;
	justify-content: center;
	padding: 0.5rem 1rem 0.5rem 1rem;
	background-color: var(--colour-yellow);
	border: none;
	border-radius: 4px;
	font-weight: 600;
	cursor: pointer;
}

.none {
	background-color: inherit;
}
</style>;
