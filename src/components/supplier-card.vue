<template>
	<div class="supplier-card">
		<div class="supplier-heading">
			<h3>{{ formateHeading(data.name) }}</h3>
			<Button
				class="supplier-button"
				@click.prevent="onClick"
				:aria-controls="`supplier-pannel-${data.id}`"
				:aria-expanded="showMore"
			>
				{{ showMore ? "Hide" : "Show" }}
			</Button>
		</div>
		<div
			:id="`supplier-pannel-${data.id}`"
			:hidden="!showMore"
			class="supplier-collapse"
			v-if="showMore"
		>
			<div v-if="!error" class="supplier-body">
				<p>Supplier code: {{ companyCode(surplierDetails.name) }}</p>
				<p>{{ data.description }}</p>
			</div>
			<div v-else class="supplier-body">
				<h4>Unknown Surpliers Details</h4>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "../store/store";
import Surpliers from "../api/endpoints/suppliers";
import Button from "./button.vue";

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
	if (value) {
		return value.split("#")[0];
	}
};

const companyCode = (value) => {
	if (value) {
		return value.split("#")[1];
	}
};
</script>

<style scoped>
.supplier-card {
	border-bottom: 1px solid var(--colour-light-blue);
}

.supplier-heading {
	display: grid;
	grid-template-columns: 1fr 9rem;
	column-gap: 1rem;
	align-items: center;
	width: 100%;
	padding: 0.25rem 0;
}

.supplier-heading h3,
.supplier-heading p {
	margin: 0;
	padding: 0 0.5rem;
	font-size: 1rem;
	font-weight: 400;
}

.supplier-button {
	margin-right: 0.5rem;
}

.supplier-collapse {
	border-top: 1px solid var(--colour-light-blue);
	background-color: var(--colour-white);
	max-height: fit-content;
	transition: max-height 0.9s ease-out;
}

.supplier-body {
	padding: 1rem;
}

@media only screen and (max-width: 460px) {
	.supplier-heading {
		text-align: center;
		grid-template-columns: 1fr;
	}

	.supplier-button {
		width: 9rem;
		margin: 1rem auto;
	}
}
</style>