import HttpRequest from "./request";

class UserRequest extends HttpRequest {
  constructor() {
    super();
    this.service.defaults.baseURL += "/user";
  }
}
const userRequest = new UserRequest();

export const getAuthTypes = () => {
  userRequest
    .get({ url: "/auth_type" })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};
