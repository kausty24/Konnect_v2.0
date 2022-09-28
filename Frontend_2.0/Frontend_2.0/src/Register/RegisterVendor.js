import axios from "axios"
import * as cities from '../Assets/States_Cities.json'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import data from "../Assets/States.json";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {InputLabel, Select, MenuItem, Avatar, FormControl  } from '@mui/material';
import MultipleSelectChipRegister from "../Assets/MultipleSelectChipRegister";

const theme = createTheme();

function RegisterVendor(){

    const [stateList, setStateList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [emailMsg, setEmailMsg] = useState("");
    const [confPasswordMsg, setConfPasswordMsg] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");
    const [nameMsg, setNameMsg] = useState("");
    const [address1Msg,setAddress1Msg] = useState("");
    const [pincodeMsg,setPincodeMsg] = useState("");
    const [contactNoMsg,setContactNoMsg] = useState("");
    const [validateBool, setValidateBool] = useState(true);
    const [password, setPassword] = useState("");
    const [selectServices, setSelectedService] = useState([]);
    
    var selectedServiceArr = [];
    const navigate = useNavigate();

    const regexPassword = new RegExp("(?=.*[a-z])(?=.*[#@$])(?=.*[0-9])(?=.{5,20})")

    useEffect(()=>{
        setStateList(data["states"])
    }, [])


    function Copyright() {
        return (
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
            Konnect
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }

    function handleSubmit(e){
        e.preventDefault();
        console.log("in handle Submit")
        console.log(selectedServiceArr)
        const vendor = {
            email : e.target.email.value,
            password : e.target.password.value,
            name : e.target.name.value,
            contactNo : e.target.contactNo.value,
            address : e.target.addressLine1.value + " " + e.target.addressLine2.value,
            city : e.target.city.value,
            state : e.target.state.value,
            pincode : e.target.pincode.value,
            serviceEnums: selectServices
        }

        axios.post("http://localhost:8080/reg/vendor", vendor).then(function (response) {
             if(response.status === 201)
                navigate("/login/vendor")
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function handleChange(e){
        e.preventDefault();
        setCityList(cities[e.target.value]) 
    }

    // function handleChangeSelect(selected){
    //     selectedServiceArr = [];
    //     selected.map( selectedOption => selectedServiceArr.push(selectedOption.value) )
    //     console.log(selectedServiceArr)
    //     setSelectedService(selectedServiceArr)
    // }

    return(
        <div style= {{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
         }}>
    
        <ThemeProvider theme={theme} >
        <CssBaseline/>
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
        </AppBar>
        <Container component="main"  maxWidth="sm" sx={{ mb: 4 }}>
        <form onSubmit={handleSubmit} >
          <FormControl>
          <Paper variant="outlined"  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Grid item xs={12} align="center" >
          <Avatar  sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AppRegistrationIcon />
            </Avatar>
            <Typography component="h1" variant="h5" align="center">
              New Vendor Registration
            </Typography>  
            </Grid>
      <Grid container spacing={3}>
      
        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="text"
            id="name"
            name="name"
            label="Name"
            fullWidth
            autoComplete="name"
            variant="standard"
            onBlur={(e)=> {
                if(e.target.value) {
                    setValidateBool(validateBool&&true);
                    setNameMsg("")
                }
                else{
                    setValidateBool(validateBool&&false);
                    setNameMsg("Name Cannot be Blank")
                }}}
          />
          <div>
                <span className="text-danger col-1">{nameMsg}</span>
                </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            type="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            onBlur={(e)=> {e.preventDefault();
                if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)){
                    setValidateBool(validateBool&&true);
                    setEmailMsg("")
                }  
                else{
                    setValidateBool(validateBool&&false);
                    setEmailMsg("Email is invalid / empty");
                }}}
          />
          <div>
            <span className="text-danger col-1">{emailMsg}</span>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                required
                type="password"
                id="password"
                name="password"
                label="Password"
                fullWidth
                autoComplete="confirmpassword"
                variant="standard"
                onBlur={(e) => {
                    if(regexPassword.test(e.target.value)){
                        setValidateBool(validateBool&&true);
                        setPassword(e.target.value);
                        setPasswordMsg("")
                    }
                    else{
                        setValidateBool(validateBool&&false);
                        setPasswordMsg("Password is Invalid")
                    }
                    }}
            />
            <div>
                <span className="text-danger col-1">{passwordMsg}</span>
            </div>
        </Grid>
        <Grid item xs={12} sm={6}>
            <TextField
                required
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                fullWidth
                autoComplete="password"
                variant="standard"
                onBlur={(e) => {
                    if(e.target.value === password){
                        setValidateBool(validateBool&&true);
                        setConfPasswordMsg("")
                    }
                    else{
                        setValidateBool(validateBool&&false);
                        setConfPasswordMsg("Password Does not Match")
                    }
                }}
            />
            <div>
                <span className="col-1 text-danger">{confPasswordMsg}</span>
            </div>
        </Grid>
        
        <Grid item xs={12} >
            <MultipleSelectChipRegister setSelectedService={setSelectedService} />
        </Grid>
    
        <Grid item xs={12} paddingtop-0>
          <TextField
            required
            type="text"
            id="addressLine1"
            name="addressLine1"
            label="Address line 1"
            fullWidth
            autoComplete="address-line1"
            variant="standard"
            onBlur={(e)=> {
                if(e.target.value) {
                    setValidateBool(validateBool&&true);
                    setAddress1Msg("")
                }
                else{
                    setValidateBool(validateBool&&false);
                    setAddress1Msg("Address Cannot be Blank")
                }}}                
          />
            <div>
                <span className="text-danger col-1">{address1Msg}</span>
            </div>
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            type="text"
            id="addressLine2"
            name="addressLine2"
            label="Address line 2"
            fullWidth
            autoComplete="address-line2"
            variant="standard"
          />
        </Grid>
       
        <Grid item xs={12} sm={6} >
          <FormControl sx={{ m: 1, minWidth: 200 }}>
                      <InputLabel id="demo-multiple-chip-label">State</InputLabel>
                      <Select 
                          labelId="demo-multiple-chip-label"
                          id="demo-multiple-chip"
                          name="state"
                          label="State"
                          style={{ minWidth: 120 }}
                          onChange={handleChange}
                          input={<OutlinedInput id="select-multiple-chip" label="States" />}
                      >   
                          {stateList.map( state => {
                          return <MenuItem value={state.state_name}>{state.state_name}</MenuItem>
                              })}
                      </Select>
              </FormControl>
                  </Grid>

         <Grid item xs={12} sm={6}>
           <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-multiple-chip-label">City</InputLabel>
                  <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip-label"
                      name="city"
                      input={<OutlinedInput id="select-multiple-chip" label="City" />}
                      style={{ minWidth: 120 }}
                      label="City"
                  >   
                      {cityList.map( city => {
                      return <MenuItem value={city.city}>{city.city}</MenuItem>
                          })}
                  </Select> 
                  </FormControl>
              </Grid>
             
        <Grid item xs={12} sm={6}>
          <TextField
           required
           id="pincode"
           name="pincode"
           label="Pincode"
           fullWidth
           autoComplete="shipping postal-code"
           variant="standard"
           onBlur={(e)=>{
            if(e.target.value.length === 6){
                setValidateBool(validateBool&&true);
                setPincodeMsg("");
            }
            else {
                setValidateBool(validateBool&&false);
                setPincodeMsg("Pincode should be 6 digits")
            }
        }}
          />
            <div>
                <span className="text-danger col-1">{pincodeMsg}</span>
            </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            type="number" 
            name="contactNo" 
            id="contactNo"
            label="Contact"
            fullWidth
            autoComplete="contact"
            variant="standard"
            onBlur={(e)=>{
                if(e.target.value.length === 10){
                    setValidateBool(validateBool&&true);
                    setContactNoMsg("");
                }
                else{
                    setValidateBool(validateBool&&false);
                    setContactNoMsg("ContactNo should be 10 digits")
                }
            }}
          />    
            <div>
                <span className="text-danger col-1">{contactNoMsg}</span>
            </div>
        </Grid>
        <Grid item xs={12} sm={6}  >
                    <Button 
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }} href="/login/vendor">Back to Login</Button>
                </Grid>
                <Grid item xs={12} sm={6} >
                  <div>
                     <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >Register</Button>
                </div>
                </Grid>  
          </Grid> 
          </Paper>
          <Copyright />
          </FormControl>
          </form>
        </Container>
      </ThemeProvider>
      </div>
    )
}

export default RegisterVendor;