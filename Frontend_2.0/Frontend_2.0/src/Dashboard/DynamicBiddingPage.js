import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid } from "@mui/material";
import Timer from "./UI/Timer";
import axios from "axios";
import Rating from "@mui/material/Rating";

const DynamicBiddingPage = ({ orderId, lockoutTimeInMinutes }) => {
  const [order, setOrder] = useState({});
  const [row, setRow] = useState([]);

  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/order/getbiddetails/" + orderId, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => {
    //     setRow(
    //       response.data.map((bid) => {
    //         return {
    //           id: bid.id,
    //           vendorName: bid.vendor.name,
    //           vendorRating: bid.vendor.rating,
    //           vendorComments: bid.vendorComments,
    //           bidPlacedTime: bid.bidPlacedTime,
    //           bidAmount: bid.bidAmount,
    //         };
    //       })
    //     );
    //   });

    // axios
    //   .get("http://localhost:8080/order/" + orderId, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((response) => setOrder(response.data))
    //   .catch((err) => console.log(err));

    const jwtToken = localStorage.getItem("jwtToken");

    const func = () => {
      axios
        .get("http://localhost:8080/order/" + orderId, {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : jwtToken,
          },
        })
        .then((response) => setOrder(response.data))
        .catch((err) => console.log(err));

      axios
        .get("http://localhost:8080/order/getbiddetails/" + orderId, {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : jwtToken,
          },
        })
        .then((response) => {
          setRow(
            response.data.map((bid) => {
              return {
                id: bid.id,
                vendorName: bid.vendor.name,
                vendorRating: bid.vendor.rating,
                vendorComments: bid.vendorComments,
                bidPlacedTime: bid.bidPlacedTime,
                bidAmount: bid.bidAmount,
              };
            })
          );
        });
    };

    func();
    var intervalId = setInterval(func, 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const RenderRating = (props) => {
    const { value } = props;
    return <Rating name="read-only" value={value} precision={0.5} readOnly />;
  };

  const columns = [
    { field: "vendorName", headerName: "Vendor Name", flex: 0.5 },
    {
      field: "vendorRating",
      headerName: "Vendor Rating",
      flex: 0.5,
      renderCell: RenderRating,
    },
    { field: "vendorComments", headerName: "Vendor Comments", flex: 1 },
    { field: "bidPlacedTime", headerName: "Bid Placed Time", flex: 0.5 },
    { field: "bidAmount", headerName: "Bid Amount", flex: 0.5 },
  ];

  console.log(order);

  return (
    <div className="container-fluid mb-3">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <h5>Order Description: </h5>
          <h6>{order.customerComments}</h6>
          <h6>Budget: {order.budget}</h6>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Timer minutes={lockoutTimeInMinutes} />
        </Grid>
        <Grid item xs={12} sx={{ marginBottom: 1 }}>
          <DataGrid
            columns={columns}
            rows={row}
            autoHeight
            initialState={{
              sorting: {
                sortModel: [{ field: "bidAmount", sort: "asc" }],
              },
            }}
          />
        </Grid>
        <Grid xs={12} sm={5} sx={{ marginTop: 3, marginLeft: 3 }}>
          <h5>Place your Bid</h5>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              {
              const jwtToken = localStorage.getItem("jwtToken");

              axios
                .post("http://localhost:8080/order/deletebid", {
                  vendorId: JSON.parse(localStorage.getItem("authVendor")).id,
                  orderId: orderId,
                }, { headers : {
                  "Authorization" : jwtToken,
              }})
                .then((response) => {
                  if (response.status === 200) {
                  }
                })
                .catch((err) => console.log(err))
              }
            }
            disabled={lockoutTimeInMinutes === 0}
          >
            I'm Out
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DynamicBiddingPage;
