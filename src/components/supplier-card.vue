<template>
	<div class="supplier-card">
		<div class="supplier">
			<h3>{{ formateHeading(data.name) }}</h3>
			<Button class="supplier-button" @click.prevent="onClick">See more</Button>
		</div>
		<div class="collapse" v-if="showMore">
			<div v-if="!error" class="collapse-body">
				<p>Supplier code: {{ companyCode(surplierDetails.name) }}</p>
				<p>{{ data.description }}</p>
			</div>
			<div v-else class="collapse-body">
				<h4>Unknown Surpliers Details</h4>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import Button from "./button.vue";
import { useStore } from "../store/store";
import Surpliers from "../api/endpoints/suppliers";

// Store
const store = useStore();

const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});

// State
const showMore = ref(false);
const surplierDetails = ref({});
const error = ref(false);

// Methods
const onClick = () => {
	showMore.value = !showMore.value;

	if (showMore.value) {
		const getSupplier = new Surpliers(store.token);

		getSupplier
			.fetchSupplier(props.data.id)
			.then((result) => {
				surplierDetails.value = result.data;
			})
			.catch((err) => {
				error.value = true;
			});
	}
};

const formateHeading = (value) => {
	return value.split("#")[0];
};

const companyCode = (value) => {
	return value.split("#")[1];
};
</script>

<style scoped>
.supplier-card {
	border: 3px solid var(--colour-light-blue);
}

.supplier {
	display: grid;
	grid-template-columns: 1fr 9rem;
	column-gap: 1rem;
	align-items: center;
	width: 100%;
	padding: 0.25rem 0;
}

.supplier h3,
.supplier p {
	margin: 0;
	padding: 0 0.5rem;
	font-size: 1rem;
	font-weight: 400;
}

.supplier-button {
	margin-right: 0.5rem;
}

.collapse {
	border-top: 3px solid var(--colour-light-blue);
}

.collapse-body {
	padding: 1rem;
}

@media only screen and (max-width: 800px) {
	.supplier {
		text-align: center;
		grid-template-columns: 1fr;
	}

	.supplier-button {
		width: 9rem;
		margin: 1rem auto;
	}
}
</style>