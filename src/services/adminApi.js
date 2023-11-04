import { adminAxiosInstance } from "../utils/axiosUtils";

const adminLogin = (values) => {
  return adminAxiosInstance.post("/login/", values, {
    withCredentials: true,
  });
};

// const isAdminAuth = (token) => {
//   return adminAxiosInstance.get(`/is-admin-auth/`, token, {
//     withCredentials: true,
//   });
// };

const isAdminAuth = (id) => {
  return adminAxiosInstance.get(`/is-admin-auth/${id}/`, {
    withCredentials: true,
  });
};

const adminUserDetails = () => {
  return adminAxiosInstance.get("/list-users/", {
    withCredentials: true,
  });
};

const adminManageUser = (id) => {
  return adminAxiosInstance.patch(`/manage-user/${id}/`, {
    withCredentials: true,
  });
};




export {
    adminLogin,
    isAdminAuth,
    adminUserDetails,
    adminManageUser
}