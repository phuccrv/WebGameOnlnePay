import axios from "axios";
import axiosClient  from "./axiosClient";
export class UserAPI {
  // API đăng ký
  static register(param) {
    const url = "api/v1/user/register";
    return axiosClient.post(url, param);
  }
  //   API đăng nhập
  static login(param) {
    const url = "api/v1/user/login";
    return axiosClient.post(url, param);
  }

  static lockAccount(id, status) {
    const url = "/api/v1/user/lock-user";
    return axiosClient.patch(url, id, status)
  }
}