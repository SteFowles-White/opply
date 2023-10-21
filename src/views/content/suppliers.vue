<template>
	<section class="content-container">
		<div class="supplier-block" :class="[!hasSuppliers ? 'empty' : '']">
			<div v-if="hasSuppliers" class="supplier-headings">
				<p>Name of Supplier</p>
			</div>
			<div
				v-for="(supplier, index) in store.suppliers.results"
				:key="`${supplier.id}-${index}`"
				class="supplier-card"
			>
				<SupplierCard :data="supplier" />
			</div>
			<Empty v-if="!hasSuppliers" value="suppliers" />
			<div class="supplier-pagination">
				<vue-awesome-paginate
					v-model="currentPage"
					:total-items="store.suppliers.count"
					:items-per-page="10"
					:on-click="onClick"
				/>
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../../store/store";
import SupplierCard from "../../components/supplier-card.vue";
import Empty from "../../components/empty.vue";

// Set up router
const route = useRouter();

// Store
const store = useStore();

//State
const currentPage = ref(1);

// Computed
const hasSuppliers = computed(() => {
	if (store.suppliers.results) {
		return store.suppliers.results.length;
	}

	return false;
});

const onClick = (number) => {
	store.getSuppliers(number);

	// route to new pagination result
	route.push(`/suppliers/${number}`);
};

// Hooks
onMounted(() => {
	const page = Number(route.currentRoute.value.params.page);

	store
		.getSuppliers(page)
		.then(() => {
			currentPage.value = page;
		})
		.catch(() => {
			// If no results show first page
			route.push("/suppliers/1");
		});
});
</script>

<style scoped>
.content-container {
	display: flex;
	flex-direction: column;
	grid-column: 2 / span 10;
	height: fit-content;
	width: 100%;
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
	margin-bottom: 0.5rem;
}

.supplier-pagination {
	display: flex;
	justify-content: center;
	padding: 1.5rem 0;
}

@media only screen and (max-width: 460px) {
	.supplier-headings {
		display: none;
	}
}
</style>