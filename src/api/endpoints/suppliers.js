import APIRequest from "../index";

class Surpliers extends APIRequest {
	/**
	 * Gets all the suppliers from the API
	 *
	 * @param id {Number}
	 *
	 * @return {Promise}
	 *
	 */
	get(number) {
		return this.makeRequest("get", `api/v1/suppliers/?page=${number}`);
	}

	/**
	 * Gets more information regarding a specific supplier
	 *
	 * @param id {Number}
	 *
	 * @return {Promise}
	 *
	 */
	fetchSupplier(id) {
		return this.makeRequest("get", `api/v1/suppliers/${id}/`);
	}
}

export default Surpliers;
