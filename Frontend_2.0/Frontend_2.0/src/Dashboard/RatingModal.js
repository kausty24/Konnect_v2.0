import { Button, Grid, Rating } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function RatingModal({ orderId, vendorName, customerComments }) {
  const [displayRating, setDisplayRating] = useState(false);
  const [value, setValue] = useState(null);
  const navigate = useNavigate();

  const jwtToken = localStorage.getItem("jwtToken");

  function handleClick() {
    axios
      .post(
        "http://localhost:8080/order/setcompleted/",
        {
          rating: value,
          orderId: orderId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : jwtToken,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          var options = {
            key: "rzp_test_MYie72SDxWMksD", // Enter the Key ID generated from the Dashboard
            amount: res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Order #" + orderId,
            description: "Konnect Service payment",
            image: "https://example.com/your_logo",
            order_id: res.data.id, //This is a sample Order ID. Pass the`id` obtained in the response of Step 1
            handler: function (response) {
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);
              console.log("Payment successful!");
              swal("Success", "Payment was Successful!", "success");
            },
            prefill: {
              name: "",
              email: "",
              contact: "",
            },
            notes: {
              address: "Konnect App",
            },
            theme: {
              color: "#1976d2",
            },
          };
          var rzp1 = new window.Razorpay(options);
          rzp1.on("payment.failed", function (response) {
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            swal("Oops!", "Something went wrong!", "error");
          });
          // to open payment modal
          rzp1.open();

          navigate("/dashboard/customer");
        }
      })
      .catch((err) => console.log(err));

    setDisplayRating(false);
    navigate("/dashboard/customer");
  }

  return (
    <>
      <Button
        onClick={(e) => {
          setDisplayRating(true);
        }}
        variant="contained"
      >
        Complete Order
      </Button>
      <Modal
        dialogClassName="modal-90w"
        onHide={() => setDisplayRating(false)}
        show={displayRating}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Review</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <Grid container sx={{ marginBottom: 5 }}>
              <Grid item xs={12} sm={4}>
                <h6>Vendor Name :</h6>
              </Grid>
              <Grid item xs={12} sm={8}>
                {vendorName}
              </Grid>
              <Grid item xs={12} sm={4}>
                <h6>Order Description :</h6>
              </Grid>
              <Grid item xs={12} sm={8}>
                {customerComments}
              </Grid>
            </Grid>
            <div className="row mb-3">
              <div className="col-12 text-center">
                <h5>Give Feedback</h5>
              </div>
              <div className="col-12 d-flex">
                {" "}
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(e, newValue) => setValue(newValue)}
                  sx={{ margin: "0 auto" }}
                />{" "}
              </div>
            </div>
            <div className="row">
              <div className="col-12 text-center">
                {" "}
                <Button onClick={handleClick} disabled={!value}>
                  Pay and Complete Order
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RatingModal;
