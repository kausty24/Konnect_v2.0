import { useEffect, useState } from "react";
import SelectOption from "./SelectOption";
import axios from "axios";

function OrderForm(props) {
  const [serviceArray, setServiceArray] = useState([]);
  const [orderIsPlaced, setOrderIsPlaced] = useState("BLANK");

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    fetch("http://localhost:8080/reg/list", { headers : {
        "Authorization" : jwtToken,
    }})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setServiceArray(data);
      });
  }, []);

  function submitHandler(e) {
    e.preventDefault();
    const order = {
      customerId: props.customer.id,
      serviceType: e.target.service.value,
      lockoutTimeInMinutes: e.target.bidLockoutTime.value,
      customerComments: e.target.customerComments.value,
      budget: e.target.expectedBudget.value,
    };
    axios
      .post("http://localhost:8080/order/place", order, {
        headers: {
          "Content-Type": "application/json",
          "Authorization" : jwtToken,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          setOrderIsPlaced("ORDER_PLACED");
          e.target.bidLockoutTime.value = "";
          e.target.customerComments.value = "";
          e.target.expectedBudget.value = "";
          console.log(response);
        }
      })
      .catch((err) => {
        console.log(err);
        setOrderIsPlaced("ORDER_NOT_PLACED");
      });
  }

  return (
    <div className="col-4 card p-4 rounded-5 shadow-sm">
      <h4 className="mb-3">Place New Order</h4>
      {orderIsPlaced === "ORDER_PLACED" && (
        <h5 style={{ color: "green" }}>Order Placed Successfully!</h5>
      )}
      {orderIsPlaced === "ORDER_NOT_PLACED" && (
        <h5 style={{ color: "red" }}>Order not Placed!</h5>
      )}
      <form className="row g-2" onSubmit={submitHandler}>
        <div className="col-md-6">
          <label htmlfor="service" className="form-label">
            Service
          </label>
          <SelectOption array={serviceArray} id="service" name="service" />
        </div>
        <div className="col-md-6">
          <label htmlfor="expectedBudget" className="form-label">
            Expected Budget
          </label>
          <input
            type="number"
            className="form-control"
            id="expectedBudget"
            name="expectedBudget"
            required
          />
        </div>
        <div className="col-12">
          <label htmlfor="customerComments" className="form-label">
            Description of the order
          </label>
          <textarea
            type="email"
            className="form-control"
            id="customerComments"
            name="customerComments"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlfor="bidLockoutTime" className="form-label">
            Lockout time (in minutes)
          </label>
          <input
            type="number"
            className="form-control"
            id="bidLockoutTime"
            name="bidLockoutTime"
            required
          />
        </div>
        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary">
            Place the order
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
