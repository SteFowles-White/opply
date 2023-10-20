import { defineStore } from "pinia";
import Token from "../api/endpoints/token";
import User from "../api/endpoints/user";
import Suppliers from "../api/endpoints/suppliers";
import Quotes from "../api/endpoints/quotes";

export const useStore = defineStore("store", {
	state: () => {
		return {
			user: {},
			token: "",
			suppliers: [],
			quotes: [],
		};
	},
	getters: {
		getAuthUser: (state) => {
			return { user: state.user, token: state.token };
		},

		getToken: (state) => {
			return state.token;
		},
	},
	actions: {
		getAccessToken(formData) {
			const token = new Token();
			const data = {
				username: formData.username,
				password: formData.password,
			};

			// Gather a token for authentication
			return token.post(data).then((result) => {
				this.user = {
					username: formData.username,
				};
				this.token = result.data.token;

				return result;
			});
		},

		createUser(formData) {
			const user = new User();

			// Create new user
			return user.post(formData).then((result) => {
				this.user = {
					username: formData.username,
					firstname: result.data.first_name,
					lastname: result.data.last_name,
					id: result.data.id,
				};
				this.token = result.data.auth_token;

				return result;
			});
		},

		getSuppliers() {
			const surpliers = new Suppliers(this.token);

			return surpliers.get().then((result) => {
				this.suppliers = result.data.results;

				return result;
			});
		},

		getQuotes() {
			const quotes = new Quotes(this.token);

			return quotes.get().then((result) => {
				console.log(result);
				this.quotes = result.data.results;

				return quotes;
			});
		},
	},
});
