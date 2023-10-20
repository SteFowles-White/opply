import signIn from "../views/sign-in.vue";
import suppliers from "../views/supplers.vue";

export default [
	{
		path: "/",
		name: "Sign in",
		component: signIn,
	},
	{
		path: "/suppliers",
		name: "Suppliers",
		component: suppliers,
	},
];
