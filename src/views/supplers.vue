<template>
	<div class="container">
		<header class="header">
			<h1>Supplier & Quotes</h1>
			<h2>Welcome Stephen</h2>
		</header>
		<h2 class="supplier-header">List of Suppliers</h2>
		<Supplers />
		<h2 class="supplier-header">List of quotes</h2>
		<Quotes />
	</div>
</template>

<script setup>
import Supplers from "../components/supplers.vue";
import Quotes from "../components/quotes.vue";
</script>

<style scoped>
.container {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-rows: min-content;
	column-gap: 1rem;
	row-gap: 1rem;
	width: 100vw;
	min-height: 100vh;
	background-color: var(--colour-light-blue);
}

.header {
	grid-column: 2 / span 10;
	height: fit-content;
	text-align: center;
	background-color: var(--colour-white);
	border-bottom-right-radius: 2rem;
	border-bottom-left-radius: 2rem;
	padding: 2rem 0;
	margin-bottom: 2rem;
}

.header h1 {
	font-size: 3rem;
	margin-bottom: 1rem;
}
.header h2 {
	font-size: 1.5rem;
}

.supplier-header {
	grid-column: 2 / span 10;
	height: fit-content;
	text-align: center;
	background-color: var(--colour-purple);
	padding: 1rem;
	border-radius: 2rem;
	color: var(--colour-white);
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 1rem;
}
</style>