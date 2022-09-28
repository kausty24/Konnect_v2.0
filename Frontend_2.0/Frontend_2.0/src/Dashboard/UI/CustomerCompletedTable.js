import { useEffect, useState } from "react";
import Table from "react-bootstrap/esm/Table";
import axios from "axios";

function CustomerCompletedTable({ customerId }) {
  const [completedOrders, setCompletedOrders] = useState([]);

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const func = () => {
      axios
        .get("http://localhost:8080/order/completed/" + customerId, { headers : {
          "Authorization" : jwtToken,
      }})
        .then((res) => setCompletedOrders(res.data))
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
          <th>Vendor Name</th>
          <th>Order Description</th>
          <th>Final Amount</th>
          <th>Order Placed Time</th>
          <th>Order Completed Time</th>
          <th>Service</th>
        </tr>
      </thead>
      <tbody>
        {completedOrders.map((order) => {
          return (
            <tr>
              <td>{order.finalVendor.name}</td>
              <td>{order.customerComments}</td>
              <td>{order.finalAmount}</td>
              <td>{order.orderPlacedTime}</td>
              <td>{order.orderFinalizedTime}</td>
              <td>{order.service.serviceType}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default CustomerCompletedTable;
