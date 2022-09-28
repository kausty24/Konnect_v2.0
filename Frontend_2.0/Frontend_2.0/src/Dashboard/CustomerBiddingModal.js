import { Button } from "@mui/material";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import CustomerDynamicBidding from "./CustomerDynamicBidding";
import axios from "axios";

const CustomerBiddingModal = ({ order, setRenderComponant }) => {
  const [displayBidding, setDisplayBidding] = useState(false);

  const jwtToken = localStorage.getItem("jwtToken");

  return (
    <>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          setDisplayBidding(true);
        }}
      >
        Check Bids
      </Button>
      <Modal
        size="xl"
        show={displayBidding}
        onHide={() => {
          setDisplayBidding(false);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>#{order.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomerDynamicBidding
            orderId={order.id}
            lockoutTimeInMinutes={order.lockoutTimeInMinutes}
            setRenderComponant={setRenderComponant}
            setDisplayBidding={setDisplayBidding}
          />
          <Button
            variant="contained"
            disabled={order.lockoutTimeInMinutes !== 0}
            color="error"
            onClick={() => {
              axios
                .get("http://localhost:8080/order/cancel/" + order.id, { headers : {
                  "Authorization" : jwtToken,
              }})
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
              setDisplayBidding(false);
              setRenderComponant("placeOrder");
            }}
          >
            Cancel Order
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomerBiddingModal;
