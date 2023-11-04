import { userAxiosInstance } from "../utils/axiosUtils";


const userSignup = (values) => {
    return userAxiosInstance.post('/api/register/', values, { withCredentials: true })
}


const userLogin = (values) => {
    return userAxiosInstance.post('/api/token/', values, { withCredentials: true })
}


const googleAuthentication = (value) => {
    const values = {
        email: value.email,
        first_name: value.given_name,
        last_name: value.family_name,
        password: value.id,
        is_google: true
    }
    return userAxiosInstance.post("/api/google_authentication/", values, { withCredentials: true })
}

const createCheckoutSession = (values) => {
    return userAxiosInstance.post(
        `user/task-subscription-checkout-session/`,
        values,
        { withCredentials: true }
    );
};

const isUserAuth = (id) => {
    return userAxiosInstance.get(`/api/is-user-auth/${id}/`, {
        withCredentials: true,
    });
};

export {
    googleAuthentication,
    userLogin,
    userSignup,
    createCheckoutSession,
    isUserAuth,
}