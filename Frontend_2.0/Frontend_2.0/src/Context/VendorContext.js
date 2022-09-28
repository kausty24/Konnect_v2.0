import { createContext, useReducer } from "react";

const AuthVendorContext = createContext({});

export const VendorProvider = ({ children }) => {

    const reducer = (state, newValue ) => {
        return {...state, ...newValue}
    }

    const [vendor, dispatch] = useReducer(reducer, { authVendor : {} });

    return(
        <AuthVendorContext.Provider value={{vendor, dispatch}}>
            { children }
        </AuthVendorContext.Provider>
    )
}

export default AuthVendorContext;