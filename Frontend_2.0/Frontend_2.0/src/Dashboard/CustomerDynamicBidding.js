import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, Rating } from "@mui/material";
import Timer from "./UI/Timer";
import axios from "axios";

const CustomerDynamicBidding = ({
  orderId,
  lockoutTimeInMinutes,
  setRenderComponant,
  setDisplayBidding,
}) => {
  const [order, setOrder] = useState({});
  const [row, setRow] = useState([]);

  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
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
                vendorId: bid.vendor.id,
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
    { field: "vendorId", headerName: "Vendor Id", flex: 0.2 },
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
    {
      field: "selectVendor",
      headerName: "Select Vendor",
      flex: 0.5,
      renderCell: (params) => {
        const handleClick = (e) => {
          console.log(params.row.bidAmount);
          const finalizeDTO = {
            vendorId: params.row.vendorId,
            orderId: orderId,
            bidAmount: params.row.bidAmount,
            vendorComments: params.row.vendorComments,
          };
          axios
            .post("http://localhost:8080/order/finalize", finalizeDTO, { headers : {
              "Authorization" : jwtToken,
          }})
            .then((res) => {
              if (res.status === 200) {
                setDisplayBidding(false);
                setRenderComponant("pending");
              }
            })
            .catch((err) => console.log(err));
        };
        return (
          <Button
            onClick={handleClick}
            sx={{ position: "relative", zIndex: 2 }}
          >
            Start Order
          </Button>
        );
      },
    },
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
            isRowSelectable={false}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerDynamicBidding;
