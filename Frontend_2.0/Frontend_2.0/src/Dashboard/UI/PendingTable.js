import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

function PendingTable(props) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef(null);
  const data = {
    vendorId: JSON.parse(localStorage.getItem("authVendor")).id,
    serviceType: props.service.serviceType,
  };

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    const func = () => {
      if (tableRef.current) {
        tableRef.current.focus();
      }
      console.log(data);
      axios
        .post("http://localhost:8080/order/pending", data, {
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
    <Table striped bordered hover ref={tableRef}>
      <thead>
        <tr>
          <th>Customer Name</th>
          <th>Order Description</th>
          <th>Customer Address</th>
          <th>Customer Contact</th>
          <th>Final Amount</th>
          <th>Order Finalized on</th>
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
              <td>{order.orderFinalizedTime}</td>
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

export default PendingTable;
