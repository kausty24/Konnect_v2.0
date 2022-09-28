import { useLocation, Navigate } from 'react-router-dom'

function CustomerRequireAuth({ children }){

    const customer = JSON.parse(localStorage.getItem("customer"));
    const location = useLocation();

    return(
        customer
        ? children
        : <Navigate to="/login/customer" state={{ from : location}} replace />

        
    )
}

export default CustomerRequireAuth;