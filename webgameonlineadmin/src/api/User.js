import axios from "axios";
import axiosClient  from "./axiosClient";

export class userAPI {
  static lockAccount(id, isLocked) {
    const url = `http://localhost:3000/api/v1/user/lock-user/${id}`;
    return axios.patch(url, {isLocked});
  }

  static getAllImages() {
    const url = "/api/v1/image/get-image";
    return axiosClient.get(url);
  }
}
