import { useLocation, Navigate } from 'react-router-dom'

function VendorRequireAuth({ children }){

    const vendor = JSON.parse(localStorage.getItem("authVendor"));
    const location = useLocation();

    return(
        vendor
        ? children
        : <Navigate to="/login/vendor" state={{ from : location}} replace />

        
    )
}

export default VendorRequireAuth;