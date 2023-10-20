import APIRequest from "../index";

class Surpliers extends APIRequest {
	/**
	 * Gets all the suppliers from the API
	 *
	 * @return {Promise}
	 *
	 */
	get() {
		return this.makeRequest("get", "api/v1/suppliers/");
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
