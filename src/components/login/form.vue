<template>
	<Form class="form" @submit="onSubmit">
		<div class="form-tabs">
			<div class="form-tab">
				<Button @click="showRegistrationType" colour="none">Login In</Button>
			</div>
			<div class="form-tab">
				<Button @click="showRegistrationType" colour="none">Create User</Button>
			</div>
		</div>
		<div class="form-fields">
			<h1 class="title">{{ setTitle }}</h1>
			<div class="input-container">
				<div
					v-for="(field, index) in formField"
					:key="`${field.id}-${index}`"
					class="input-block"
				>
					<label :for="field.id" class="label">{{ field.name }}</label>
					<Field
						v-model="form[field.id]"
						:id="field.id"
						:name="field.id"
						:type="field.type"
						:maxlength="field.maxlength"
						:rules="field.rules"
						class="input"
					/>
					<ErrorMessage class="warning" :name="field.id" />
				</div>
			</div>
			<div class="warning" v-if="errorMes">{{ errorMes }}</div>
			<div class="submit-container">
				<Button :disabled="!isEnabled" type="submit">Submit</Button>
			</div>
		</div>
	</Form>
</template>

<script setup>
import { ref, computed } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useStore } from "../../store/store";
import Button from "../button.vue";
import signin from "../../config/signin";

// Store
const store = useStore();

// State
const registering = ref(false);
const errorMes = ref("");
const form = ref({
	username: "",
	password: "",
	first_name: "",
	last_name: "",
	email: "",
});

//Emits
const emit = defineEmits(["authenticate"]);

// Computed
const setTitle = computed(() => {
	return registering.value ? "Create Account" : "Sign in";
});

const formField = computed(() => {
	const signInFields = signin.filter((field) => field.default);

	return registering.value ? signin : signInFields;
});

const isEnabled = computed(() => {
	return form.value.username.length > 0 && form.value.password.length > 0;
});

// Methods
const showRegistrationType = () => {
	registering.value = !registering.value;
};

const setErrorMessage = (err) => {
	if (err.response.status !== 400) {
		errorMes.value = "Unable to log in";

		return;
	}

	if (err.response.data.non_field_errors) {
		errorMes.value = err.response.data.non_field_errors[0];

		return;
	}

	if (err.response.data.username) {
		errorMes.value = err.response.data.username[0];

		return;
	}
};

const onSubmit = (formData) => {
	// Check all required fields are not empty
	if (formData.username.length < 1 && formData.password.length < 1) {
		return;
	}

	// If exsisting customer and logging in
	if (!registering.value) {
		store
			.getAccessToken(formData)
			.then(() => {
				emit("authenticate");
			})
			.catch((err) => {
				setErrorMessage(err);
			});

		return;
	}

	store
		.createUser(formData)
		.then(() => {
			emit("authenticate");
		})
		.catch((err) => {
			setErrorMessage(err);
		});
};
</script>

<style scoped>
.form {
	display: flex;
	flex-direction: column;
	width: 500px;
	background-color: var(--colour-white);
	border-radius: 0.25rem;
}

.form-tabs {
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-content: center;
	border-bottom: 1px solid var(--colour-light-grey);
}

.form-tab {
	display: flex;
	justify-content: center;
	padding: 1rem;
}

.form-tab:first-child {
	border-right: 1px solid var(--colour-light-grey);
}

.form-fields {
	display: flex;
	flex-direction: column;
	padding: 1rem;
}

.title {
	font-size: 1.5rem;
	margin-top: 0rem;
	margin-bottom: 1rem;
	text-align: center;
}

.input-container:last-of-type {
	padding-bottom: 2rem;
}

.input-block {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-bottom: 1rem;
}

.label {
	font-weight: 600;
	padding-bottom: 0.25rem;
}

.input {
	height: 2rem;
	padding: 0rem 0.5rem;
	border-radius: 0.25rem;
	font-size: 1rem;
	border: 1px solid var(--colour-light-grey);
}

.submit-container {
	display: flex;
	justify-content: flex-end;
	padding: 2rem 0 1rem;
}

.warning {
	font-size: 0.75rem;
	color: var(--colour-warning);
}

@media only screen and (max-width: 500px) {
	.form {
		width: 70%;
	}
}
</style>