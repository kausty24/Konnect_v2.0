import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Timer from "./Timer";
import BiddingModal from "../BiddingModal";

function RequestTable(props) {
  const [orders, setOrders] = useState([]);

  const data = {
    city: JSON.parse(localStorage.getItem("authVendor")).city,
    serviceType: props.service.serviceType,
  };

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    axios
      .post("http://localhost:8080/order/request", data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : jwtToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setOrders(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setOrders([]);
      });
    const intervalId = setInterval(() => {
      console.log(data);
      axios
        .post("http://localhost:8080/order/request", data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : jwtToken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setOrders(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
          setOrders([]);
        });
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Order Description</th>
          <th>Customer Address</th>
          <th>Active Bids</th>
          <th>Current Minimum Bid</th>
          <th>Time Remaining</th>
          <th>Bid</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          return (
            <tr key={order.id}>
              <td>{order.customer.name}</td>
              <td>{order.customerComments}</td>
              <td>{order.customer.address}</td>
              <td>-</td>
              <td>-</td>
              <td>
                <Timer minutes={order.lockoutTimeInMinutes} />
              </td>
              <td><BiddingModal order={order}/></td>
            </tr>
          );
        })}
        {/* <tr>
          <td>Mark</td>
          <td>Repair Job</td>
          <td>12, Sunset Boulevard</td>
          <td>123456789</td>
          <td>500</td>
          <td>2022-09-16T14:09:25.913064</td>
        </tr> */}
      </tbody>
    </Table>
  );
}

export default RequestTable;
