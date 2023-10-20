import APIRequest from "../index";

class Quotes extends APIRequest {
	/**
	 * Gets all quotes from suppliers
	 *
	 * @param id {Number}
	 *
	 * @return {Promise}
	 *
	 */
	get(number) {
		return this.makeRequest("get", `/api/v1/quotes/?page=${number}`);
	}
}

export default Quotes;
