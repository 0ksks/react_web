import { Option } from "@/components/form-card";
import HttpRequest from "./request";

class UserRequest extends HttpRequest {
  constructor() {
    super();
    this.service.defaults.baseURL += "/user";
  }
}
const userRequest = new UserRequest();

export const getAuthTypes = async () => {
  try {
    const response = await userRequest.get<Option[]>({ url: "/auth_type" });
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const authPhone = async (payload: any) => {
  return await userRequest.post({ url: "/auth_phone", data: payload });
};
