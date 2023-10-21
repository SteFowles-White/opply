<template>
	<section class="content-container">
		<div class="quotes-block" :class="[!hasQuotes ? 'empty' : '']">
			<div
				v-for="(supplier, index) in store.quotes.results"
				:key="`${supplier.id}-${index}`"
			>
				<QuoteCard :data="supplier" />
			</div>
			<Empty v-if="!hasQuotes" value="quotes" />
			<div class="pagination">
				<vue-awesome-paginate
					v-model="currentPage"
					:total-items="store.quotes.count"
					:items-per-page="10"
					:max-pages-shown="5"
					:on-click="onClick"
				/>
			</div>
		</div>
	</section>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useStore } from "../../store/store";
import { useRouter } from "vue-router";
import QuoteCard from "../../components/quote-card.vue";
import Empty from "../../components/empty.vue";

// Set up router
const route = useRouter();

// Store
const store = useStore();

// State
const currentPage = ref(1);

// Computed
const hasQuotes = computed(() => {
	if (store.quotes.results) {
		return store.quotes.results.length;
	}

	return false;
});

//Methods
const onClick = (number) => {
	store.getQuotes(number);

	// route to new pagination result
	route.push(`/suppliers/quotes/${number}`);
};

// Hooks
onMounted(() => {
	const page = Number(route.currentRoute.value.params.page);

	store
		.getQuotes(page)
		.then(() => {
			currentPage.value = page;
		})
		.catch(() => {
			// If no results show first page
			route.push("/suppliers/quotes/1");
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

.quotes-block {
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 1rem;
	row-gap: 1rem;
	padding: 1rem;
}

/* override quote block layout if there are no quotes */
.quotes-block.empty {
	display: flex;
	grid-template-columns: 1fr;
	justify-content: center;
	margin: 1rem 0;
}

.pagination {
	display: flex;
	justify-content: center;
	grid-column: 1 / span 2;
	padding: 1.5rem 0;
}

@media only screen and (max-width: 800px) {
	.quotes-block {
		display: flex;
		flex-direction: column;
	}
}
</style>