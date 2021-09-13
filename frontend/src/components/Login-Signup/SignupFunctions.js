import axios from "axios";
import { serverAddress } from "../../constants";
export function registerUser(newUserDetails) {
  let apiUrl = serverAddress + "/api/admin/signup";
  return axios.post(apiUrl, newUserDetails);
}
