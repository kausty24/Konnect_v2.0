import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import RatingModal from "../RatingModal";

function CustomerPendingTable({ customerId }) {
  const [pendingOrders, setPendingOrders] = useState([]);

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const func = () => {
      axios
        .get("http://localhost:8080/order/pending/" + customerId, { headers : {
          "Authorization" : jwtToken,
      }})
        .then((res) => setPendingOrders(res.data))
        .catch((err) => console.log(err));
    };
    func();
    const intervalId = setInterval(func, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Table striped hover bordered>
      <thead>
        <tr>
          <th>Vendor</th>
          <th>Contact No</th>
          <th>Order Description</th>
          <th>Service</th>
          <th>Final Amount</th>
          <th>Complete Order</th>
        </tr>
      </thead>
      <tbody>
        {pendingOrders.map((order) => {
          return (
            <tr>
              <td>{order.finalVendor.name}</td>
              <td>{order.finalVendor.contactNo}</td>
              <td>{order.customerComments}</td>
              <td>{order.service.serviceType}</td>
              <td>{order.finalAmount}</td>
              <td>
                <RatingModal
                  orderId={order.id}
                  vendorName={order.finalVendor.name}
                  customerComments={order.customerComments}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default CustomerPendingTable;
