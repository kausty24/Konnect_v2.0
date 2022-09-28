import { useState } from "react";
import Sidebar from "../Layout/Sidebar";
import ServiceTabs from "./UI/ServiceTabs";

function VendorDashboard() {
  const vendor = JSON.parse(localStorage.getItem("authVendor"));
  const [renderComponant, setRenderComponant] = useState("default");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 pt-5">
          <Sidebar setRenderComponant={setRenderComponant} />
        </div>
        <div className="col-md-10">
          {renderComponant === "completed" ? (
            <ServiceTabs data={vendor.services} table={"completed"} />
          ) : renderComponant === "pending" ? (
            <ServiceTabs data={vendor.services} table={"pending"} />
          ) : renderComponant === "request" ? (
            <ServiceTabs data={vendor.services} table={"request"} />
          ) : (
            <ServiceTabs data={vendor.services} table={"request"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;