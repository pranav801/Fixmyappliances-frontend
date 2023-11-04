import React, { useEffect, useState } from "react";
import { decodedToken } from "../Context/auth";
import { isUserAuth } from "../services/userApi";

function UserPrivateRoutes({ route }) {
    const [verify, setVerify] = useState(null);

    useEffect(() => {
        const decoded = decodedToken("userJwt");
        if (decoded) {
            isUserAuth(decoded.user_id)
                .then((res) => {
                    setVerify(true);
                })
                .catch((err) => {
                    setVerify(false);
                    localStorage.removeItem("userJwt");
                });
        } else {
            setVerify(false)
        }
    }, []);

    if (verify === null) return;

    return verify ? <Outlet /> : <Navigate to={route} />;
}

export default UserPrivateRoutes;