import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import CustomerBiddingModal from "../CustomerBiddingModal";
import Timer from "./Timer";

function ActiveOrderTable({ customerId, setRenderComponant }) {
  const [activeOrders, setActiveOrders] = useState([]);

  const jwtToken = localStorage.getItem("jwtToken");

  const func = () => {
    axios
      .get("http://localhost:8080/order/active/" + customerId, { headers : {
        "Authorization" : jwtToken,
    }})
      .then((res) => setActiveOrders(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    func();
    const intervalId = setInterval(func, 60 * 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Table striped hover bordered>
      <thead>
        <tr>
          <th>Order Description</th>
          <th>Service</th>
          <th>Active Bids</th>
          <th>Current Min Bid</th>
          <th>Time Remaining</th>
          <th>Bidding</th>
        </tr>
      </thead>
      <tbody>
        {activeOrders.map((order) => {
          return (
            <tr>
              <td>{order.customerComments}</td>
              <td>{order.service.serviceType}</td>
              <td></td>
              <td></td>
              <td>
                {" "}
                <Timer minutes={order.lockoutTimeInMinutes} />
              </td>
              <td>
                <CustomerBiddingModal
                  order={order}
                  setRenderComponant={setRenderComponant}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ActiveOrderTable;
