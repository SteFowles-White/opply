<template>
	<div class="error">
		<h1>Something went wrong, page can not be found</h1>
		<h2>404 error</h2>

		<p>Please click the button below to get back to the main site</p>
		<router-link class="tab" :to="`/suppliers/1`">Return to site</router-link>
	</div>
</template>

<style scoped>
.error {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	width: 100%;
	height: 100vh;
	background-color: var(--colour-light-blue);
	text-align: center;
}

.error h1 {
	font-size: 3rem;
}

.error h2 {
	font-size: 1.5rem;
	margin-bottom: 3rem;
}

.error p {
	font-size: 1.5rem;
	margin-bottom: 3rem;
}

.error a {
	font-size: 1.5rem;
	margin-bottom: 3rem;
	color: var(--colour-black);
}

.error a:hover {
	color: var(--colour-purple);
	font-weight: 600;
}
</style>
