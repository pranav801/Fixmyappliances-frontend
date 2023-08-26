import { adminAxiosInstance } from "../utils/axiosUtils";

const adminLogin = (values) => {
  return adminAxiosInstance.post("/login/", values, {
    withCredentials: true,
  });
};

const isAdminAuth = (token) => {
  return adminAxiosInstance.get(`/is-admin-auth/`, token, {
    withCredentials: true,
  });
};


export {
    adminLogin,
    isAdminAuth,
}