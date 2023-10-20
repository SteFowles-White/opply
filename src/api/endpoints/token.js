import APIRequest from "../index";

class Token extends APIRequest {
	/**
	 * Produces an access token for future API calls
	 *
	 * @param date {Object} - *username, *password
	 *
	 * @return {Promise}
	 *
	 */
	post(data) {
		return this.makeRequest("post", "api-token-auth/", {
			username: data.username,
			password: data.password,
		});
	}
}

export default Token;
