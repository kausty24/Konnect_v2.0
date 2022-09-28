
import RegisterCustomer from "./Register/RegisterCustomer";
import RegisterVendor from "./Register/RegisterVendor";
import { Routes, Route} from 'react-router-dom';
import VendorLogin from "./Login/VendorLogin";
import CustomerLogin from "./Login/CustomerLogin";
import VendorDashboard from "./Dashboard/VendorDashboard";
import CustomerDashboard from "./Dashboard/CustomerDashboard";
import HomePage from "./HomePage";
import CustomerRequireAuth from "./Login/customerRequireAuth";
import VendorRequireAuth from "./Login/vendorRequireAuth";
import PageNotFound from "./Assets/PageNotFound";


function App() {

  return (
    <div>
      
      
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login/vendor" element={<VendorLogin/>}/>
        <Route path="/reg/customer" element={<RegisterCustomer/>}/>
        <Route path="/reg/vendor" element={<RegisterVendor/>}/>
        <Route path="/login/customer" element={<CustomerLogin/>}/>
        <Route path="/dashboard/vendor" element={<VendorRequireAuth><VendorDashboard/></VendorRequireAuth>}/>
        <Route path="/dashboard/customer" element={<CustomerRequireAuth><CustomerDashboard/></CustomerRequireAuth>}/>
        <Route path="/*" element={<PageNotFound/>} />
        
      </Routes>
      
      

    </div>
  );
}

export default App;
