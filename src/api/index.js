import axios from "axios";

/**
 * Setup a new API class *
 *
 * @param server {string}
 *
 * @return {APIRequest}
 *
 */
class APIRequest {
	constructor(token) {
		this.http = axios.create({
			// Configuration
			baseURL: "https://february-21.herokuapp.com/",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: token ? `Token ${token}` : "",
			},
		});
	}

	/**
	 * Makes request to api *
	 *
	 * @param method {string}
	 * @param url {string}
	 * @param date {Object}
	 *
	 * @return {Promise}
	 *
	 */
	makeRequest(method, url, data) {
		return this.http[method](url, { ...data }).then((result) => {
			return result;
		});
	}
}

export default APIRequest;
