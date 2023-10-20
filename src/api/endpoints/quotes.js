import APIRequest from "../index";

class Quotes extends APIRequest {
	/**
	 * Gets all quotes from suppliers
	 *
	 *
	 * @return {Promise}
	 *
	 */
	get(data) {
		return this.makeRequest("get", "/api/v1/quotes/");
	}
}

export default Quotes;
