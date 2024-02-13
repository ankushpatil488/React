import { createContext } from "react";

const UserContext = createContext({
    loginUserInfo : "Default User"
});

export default UserContext;