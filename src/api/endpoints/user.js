import APIRequest from "../index";

class User extends APIRequest {
	/**
	 * Creates a new user account
	 *
	 * @param date {Object} - *username, *password, first_name, last_name, email
	 *
	 * @return {Promise}
	 *
	 */
	post(data) {
		return this.makeRequest("post", "api/v1/users/", { ...data });
	}
}

export default User;
