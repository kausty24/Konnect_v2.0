import CustomerSidebar from "../Layout/CustomerSidebar";
import OrderForm from "./OrderForm";
import { useState } from 'react'
import CustomerCompletedTable from "./UI/CustomerCompletedTable";
import ActiveOrderTable from "./UI/ActiveOrderTable";
import CustomerPendingTable from "./UI/CustomerPendingTable";

function CustomerDashboard() {

  const [renderComponant, setRenderComponant] = useState("placeOrder");

  if (!localStorage.getItem("customer")) {
    return <h1>Please Login</h1>;
  }
  const customer = JSON.parse(localStorage.getItem("customer"));
  console.log(customer);
  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <CustomerSidebar setRenderComponant={setRenderComponant} renderComponant={renderComponant}/>
        </div>
        <div className="col-md-10">
          {renderComponant === "placeOrder" ? <OrderForm customer={customer} /> : renderComponant === "completed" ? <CustomerCompletedTable customerId={customer.id}/> : renderComponant === "activeOrders" ? <ActiveOrderTable customerId={customer.id} setRenderComponant={setRenderComponant}/> : renderComponant === "pending" ? <CustomerPendingTable customerId={customer.id}/> : <OrderForm customer={customer} />}
        
      </div>
      </div>
      
    </div>
  );
}

export default CustomerDashboard;
