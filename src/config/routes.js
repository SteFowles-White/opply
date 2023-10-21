import SignIn from "../views/sign-in.vue";
import Content from "../views/content.vue";
import Suppliers from "../views/content/suppliers.vue";
import Quotes from "../views/content/quotes.vue";
import NotFound from "../views/not-found.vue";

export default [
	{
		path: "/",
		name: "Sign in",
		component: SignIn,
	},
	{
		path: "/suppliers",
		name: "Suppliers",
		component: Content,
		children: [
			{ path: "/suppliers/:page", component: Suppliers }, // default tab
			{ path: "/suppliers/quotes/:page", component: Quotes },
		],
	},

	{
		path: "/:pathMatch(.*)*",
		name: "404",
		component: NotFound,
	},
];
