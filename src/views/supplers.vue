<template>
	<div class="container">
		<header class="header">
			<h1>Supplier & Quotes</h1>
			<h2>Welcome Stephen</h2>
		</header>

		<h2 class="supplier-header">List of our suppliers</h2>
		<section class="content-container">
			<div class="supplier-block" :class="[!hasSuppliers ? 'empty' : '']">
				<div v-if="hasSuppliers" class="supplier-headings">
					<p>Name of Supplier</p>
				</div>
				<div
					v-for="(supplier, index) in store.suppliers"
					:key="`${supplier.id}-${index}`"
					class="supplier-card"
				>
					<SupplierCard :data="supplier" />
				</div>
				<Empty v-if="!hasSuppliers" value="suppliers" />
			</div>
		</section>
		<h2 class="supplier-header">List of quotes</h2>
		<section class="content-container">
			<div class="quotes-block" :class="[!hasQuotes ? 'empty' : '']">
				<div
					v-for="(supplier, index) in store.quotes"
					:key="`${supplier.id}-${index}`"
				>
					<QuoteCard :data="supplier" />
				</div>
				<Empty v-if="!hasQuotes" value="quotes" />
			</div>
		</section>
	</div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "../store/store";
import SupplierCard from "../components/supplier-card.vue";
import QuoteCard from "../components/quote-card.vue";
import Empty from "../components/empty.vue";

// Store
const store = useStore();

// Computed
const hasSuppliers = computed(() => {
	return store.suppliers.length;
});

const hasQuotes = computed(() => {
	return store.quotes.length;
});

// Hooks
onMounted(() => {
	store.getSuppliers();
	store.getQuotes();
});
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

.content-container {
	display: flex;
	flex-direction: column;
	grid-column: 2 / span 10;
	height: fit-content;
	width: 100%;
	background-color: var(--colour-white);
	margin-bottom: 1.5rem;
}

.supplier-block {
	padding: 1rem 1rem;
}

.supplier-block.empty {
	display: flex;
	justify-content: center;
	margin: 1rem 0;
}

.supplier-headings {
	display: grid;
	grid-template-columns: 1fr;
	column-gap: 1rem;
	align-items: center;
	width: 100%;
	margin-bottom: 1rem;
	font-size: 1rem;
	font-weight: 600;
}

.supplier-headings p {
	margin: 0;
}

.supplier-card {
	margin-bottom: 1rem;
}

.quotes-block {
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 1rem;
	row-gap: 1rem;
	padding: 1rem;
}

/* override quote block layout is no quotes */
.quotes-block.empty {
	display: flex;
	grid-template-columns: 1fr;
	justify-content: center;
	margin: 1rem 0;
}

@media only screen and (max-width: 800px) {
	.supplier-headings {
		display: none;
	}

	.quotes-block {
		grid-template-columns: 1fr;
	}
}
</style>