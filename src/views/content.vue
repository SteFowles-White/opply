<template>
	<div class="container">
		<header class="header">
			<h1>Supplier & Quotes</h1>
			<h2>Welcome Stephen</h2>
		</header>
		<div class="tabs">
			<div class="tab-container">
				<router-link class="tab" :to="`/suppliers/${getSupplierPagionation}`"
					>Suppliers</router-link
				>
				<router-link
					class="tab"
					:to="`/suppliers/quotes/${getQuotePagionation}`"
					>Quotes</router-link
				>
			</div>
			<div class="tab-pannel"><router-view></router-view></div>
		</div>
	</div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

// Set up router
const route = useRouter();

// Computed
const getQuotePagionation = computed(() => {
	const urlMatch = route.currentRoute.value.path.includes("/quotes/");

	if (urlMatch) {
		return Number(route.currentRoute.value.params.page);
	}

	return 1;
});

const getSupplierPagionation = computed(() => {
	const urlMatch = route.currentRoute.value.path.includes("/quotes/");

	if (!urlMatch) {
		return Number(route.currentRoute.value.params.page);
	}

	return 1;
});
</script>


<!-- Add logic to get param  -->
<!-- if dos not include params -->
<style scoped>
.container {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-rows: min-content;
	column-gap: 1rem;
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

.tabs {
	grid-column: 2 / span 10;
}

.tab-container {
	height: 30px;
	border-bottom: 1px solid var(--colour-light-grey);
	margin-bottom: -1px;
}

.tab {
	background-color: var(--colour-faded);
	height: 2rem;
	padding: 0.5rem 1rem;
	margin-right: 0.25rem;
	color: var(--color-black);
	text-decoration: none;
	opacity: 0.8;
}

.router-link-exact-active.tab {
	border: 1px solid var(--colour-light-grey);
	border-bottom: 1px solid var(--colour-faded);
	opacity: 1;
}

.tab-pannel {
	border: 1px solid var(--colour-light-grey);
	background-color: var(--colour-faded);
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