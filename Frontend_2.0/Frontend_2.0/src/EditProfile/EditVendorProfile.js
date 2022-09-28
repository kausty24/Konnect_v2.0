import {
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  Typography,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import data from "../Assets/States.json";
import * as cities from "../Assets/States_Cities.json";
import axios from "axios";
import MultipleSelectChip from "../Assets/MultipleSelectChip";

function EditVendorProfile({ vendor }) {
  const [editToggle, setEditToggle] = useState(true);
  const [buttonText, setButtonText] = useState("Edit");
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [validEmail, setValidEmail] = useState("");
  const [validName, setValidName] = useState("");
  const [validAddress, setValidAddress] = useState("");
  const [validContact, setValidContact] = useState("");
  const [validPincode, setValidPincode] = useState("");
  const [formEdited, setFormEdited] = useState(false);
  const [emailEdited, setEmailEdited] = useState(false);
  const [contactEdited, setContactEdited] = useState(false);
  const [selectedServiceArr, setSelectedServiceArr] = useState([]);

  useEffect(() => {
    setStateList(data["states"]);
    setCityList(cities[vendor.state]);
  }, []);

  function handleChangeSelect(e) {
    setCityList(cities[e.target.value]);
    setFormEdited(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormEdited(false);
    console.log("form submitted");

    const vendorDto = {
      vendorId: vendor.id,
      name: e.target.name.value,
      email: e.target.email.value,
      serviceEnums: selectedServiceArr,
      address: e.target.address.value,
      state: e.target.state.value,
      city: e.target.city.value,
      contactNo: e.target.contactNo.value,
      pincode: e.target.pincode.value,
    };

    console.log(vendorDto);

    const jwtToken = localStorage.getItem("jwtToken");

    axios
      .post("http://localhost:8080/edit/vendor", vendorDto, { headers : {
        "Authorization" : jwtToken,
    }})
      .then((response) => {
        if (response.status === 200) console.log("Details edited");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container-fluid">
      <h2 className="text-center mb-5">Edit Profile</h2>

      <Grid>
        <Card style={{ maxWidth: 650, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              Edit Profile
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              Edit your Details
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid xs={12} sm={6} item>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    defaultValue={vendor.name}
                    name="name"
                    disabled={editToggle}
                    onBlur={(e) => {
                      e.preventDefault();
                      if (!e.target.value) {
                        setValidName("Name cannot be blank");
                      } else {
                        setValidName("");
                      }
                    }}
                    error={validName}
                    helperText={validName}
                    onChange={() => setFormEdited(true)}
                  />
                </Grid>

                <Grid xs={12} sm={6} item>
                  <TextField
                    type="email"
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    defaultValue={vendor.email}
                    name="email"
                    disabled={editToggle}
                    onBlur={(e) => {
                      e.preventDefault();
                      if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                          e.target.value
                        )
                      ) {
                        setValidEmail("Invalid Email entry");
                      } else {
                        setValidEmail("");
                        if (emailEdited) {
                          const jwtToken = localStorage.getItem("jwtToken");
                          axios
                            .post(
                              "http://localhost:8080/edit/vendor/emailExist",
                              { email: e.target.value }, { headers : {
                                "Authorization" : jwtToken,
                            }}
                            )
                            .then((response) => {
                              if (response.status === 200) {
                                if (vendor.email !== e.target.value)
                                  setValidEmail("Email already exists");
                              }
                            })
                            .catch((err) => {
                              console.log(err.response);
                              setValidEmail("");
                              setEmailEdited(false);
                            });
                        }
                      }
                    }}
                    error={validEmail}
                    helperText={validEmail}
                    onChange={() => {
                      setFormEdited(true);
                      setEmailEdited(true);
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <MultipleSelectChip
                    setFormEdited={setFormEdited}
                    vendorServices={vendor.services}
                    editToggle={editToggle}
                    setSelectedServiceArr={setSelectedServiceArr}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Contact No"
                    variant="outlined"
                    defaultValue={vendor.contactNo}
                    disabled={editToggle}
                    name="contactNo"
                    onBlur={(e) => {
                      if (
                        e.target.value.length < 10 ||
                        e.target.value.length > 10
                      ) {
                        setValidContact("Invalid Contact No");
                      } else {
                        setValidContact("");
                        if (contactEdited) {
                          const jwtToken = localStorage.getItem("jwtToken");
                          axios
                            .post(
                              "http://localhost:8080/edit/vendor/contactExists",
                              { contactNo: e.target.value }, { headers : {
                                "Authorization" : jwtToken,
                            }}
                            )
                            .then((response) => {
                              if (response.status === 200) {
                                if (vendor.contactNo !== e.target.value)
                                  setValidContact("Contact already exists");
                              }
                            })
                            .catch((err) => {
                              console.log(err.response);
                              setValidContact("");
                              setContactEdited(false);
                            });
                        }
                      }
                    }}
                    error={validContact}
                    helperText={validContact}
                    onChange={() => {
                      setFormEdited(true);
                      setContactEdited(true);
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    defaultValue={vendor.address}
                    disabled={editToggle}
                    name="address"
                    onBlur={(e) => {
                      e.preventDefault();
                      if (!e.target.value) {
                        setValidAddress("Address cannot be blank");
                      } else {
                        setValidAddress("");
                      }
                    }}
                    error={validAddress}
                    helperText={validAddress}
                    onChange={() => setFormEdited(true)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel id="demo-simple-select-helper-label">
                    State
                  </InputLabel>
                  <Select
                    label="State"
                    disabled={editToggle}
                    onChange={handleChangeSelect}
                    style={{ minWidth: 120 }}
                    name="state"
                    defaultValue={vendor.state}
                  >
                    {stateList.map((item) => {
                      return (
                        <MenuItem value={item.state_name}>
                          {item.state_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <InputLabel id="demo-simple-select-helper-label">
                    City
                  </InputLabel>
                  <Select
                    label="City"
                    disabled={editToggle}
                    style={{ minWidth: 120 }}
                    name="city"
                    defaultValue={vendor.city}
                    onChange={() => setFormEdited(true)}
                  >
                    {cityList.map((item) => {
                      return <MenuItem value={item.city}>{item.city}</MenuItem>;
                    })}
                  </Select>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Pincode"
                    variant="outlined"
                    defaultValue={vendor.pincode}
                    disabled={editToggle}
                    name="pincode"
                    onBlur={(e) => {
                      if (
                        e.target.value.length < 6 ||
                        e.target.value.length > 6
                      ) {
                        setValidPincode("Invalid Pincode No");
                      } else {
                        setValidPincode("");
                      }
                    }}
                    error={validPincode}
                    helperText={validPincode}
                    onChange={() => setFormEdited(true)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type={editToggle && formEdited ? "submit" : "button"}
                    variant="contained"
                    onClick={() => {
                      setEditToggle(!editToggle);
                      setButtonText(editToggle ? "Save" : "Edit");
                    }}
                    style={{ margin: "0 auto" }}
                    disabled={
                      validEmail ||
                      validName ||
                      validAddress ||
                      validContact ||
                      validPincode
                    }
                  >
                    {buttonText}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}

export default EditVendorProfile;
