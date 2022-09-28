import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import { Rating } from "@mui/material";

function CompletedTable(props) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const data = {
    vendorId: JSON.parse(localStorage.getItem("authVendor")).id,
    serviceType: props.service.serviceType,
  };

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const func = () => {
      console.log(data);
      axios
        .post("http://localhost:8080/order/completed", data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : jwtToken,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsLoading(false);
            setOrders(response.data);
          }
        })
        .catch((err) => {
          console.log(err);
          setOrders([]);
        });
    };
    func();
    const intervalId = setInterval(func, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading) {
    return (
      <div className="m-5" style={{ "text-align": "center" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Order Description</th>
          <th>Customer Address</th>
          <th>Customer Contact</th>
          <th>Final Amount</th>
          <th>Rating Given</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => {
          return (
            <tr>
              <td>{order.customer.name}</td>
              <td>{order.customerComments}</td>
              <td>{order.customer.address}</td>
              <td>{order.customer.contactNo}</td>
              <td>{order.finalAmount}</td>
              <td>
                <Rating
                  name="read-only"
                  value={order.rating}
                  precision={0.5}
                  readOnly
                />
              </td>
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

export default CompletedTable;
