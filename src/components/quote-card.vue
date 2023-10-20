<template>
	<div class="quote-card">
		<div class="container">
			<h3 class="heading">
				{{ supplierDetails.name ? supplierDetails.name : "Unknown Supplier" }}
			</h3>
			<p class="created">{{ formateDate }}</p>
			<h4 class="title">{{ props.data.title }}</h4>
			<p class="total">£{{ props.data.amount }}</p>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "../store/store";
import Supplier from "../api/endpoints/suppliers";

// Store
const store = useStore();

const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});

// State
const supplierDetails = ref({});

// Computed
const formateDate = computed(() => {
	if (props.data.created) {
		return props.data.created.split("T")[0];
	}

	return "";
});

// Hooks
onMounted(() => {
	const supplier = new Supplier(store.token);

	supplier.fetchSupplier(props.data.supplier_id).then((result) => {
		supplierDetails.value = result.data;
	});
});
</script>


<style scoped>
.quote-card {
	border: 1px solid var(--colour-light-blue);
	box-shadow: 1px 1px 5px var(--colour-light-grey);
	height: 100%;
}

.container {
	padding: 1rem;
}

.heading {
	margin: 0;
	font-size: 1.25rem;
	font-weight: 600;
	line-height: 1.5rem;
}

.created {
	margin: 0;
	font-size: 0.8rem;
	padding-bottom: 2rem;
}

.title {
	margin-bottom: 1.5rem;
	font-size: 1rem;
	font-weight: 600;
	line-height: 1.5rem;
}

.total {
	font-size: 2rem;
	font-weight: 600;
	line-height: 1.5rem;
}
</style>