import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();


function CustomerLogin() {

    const navigate = useNavigate();
    const [emailMsg, setEmailMsg] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");
    const [authMessage, setAuthMessage] = useState("");

    const regexPassword = new RegExp("(?=.*[a-z])(?=.*[#@$])(?=.*[0-9])(?=.{5,20})")
  
    function handleSubmit(e){
        
        e.preventDefault();

        const user = {
            email : e.target.email.value,
            password : e.target.password.value
        }

        axios.post("http://localhost:8080/login/customer", user, { headers : {
            'Content-Type' : 'application/json'
        }})
        .then(response=> {
            if(response.status === 200){
                localStorage.setItem("customer" ,JSON.stringify(response.data.customer));
                localStorage.setItem("jwtToken", "Bearer "+response.data.jwtToken);
                // window.location = '/dashboard/customer'
                navigate("/dashboard/customer")
            }
        })
        .catch(err=> {
            console.log(err)
            setAuthMessage(("Invalid Credentials"))
        });
    }

    return(
      
    <ThemeProvider theme={theme}>
    
      <Grid container component="main" sx={{ height: '100vh', marginTop : '-3rem' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
             Customer Login
            </Typography>
            <div className="text-danger">{authMessage}</div>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onBlur={(e)=> {e.preventDefault();
                    
                    if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)){
                        
                        setEmailMsg("")
                    }
                        
                    else{ 
                        setEmailMsg("Email is invalid / Empty");
                    }
        
                } }
              />
                <span className="text-danger col-1" >{emailMsg}</span>
              </div>
              <div>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onBlur={(e) => {
                    
                    if(regexPassword.test(e.target.value)){
                        setPasswordMsg("")
                    }
                    else {
                        setPasswordMsg("Password is Invalid")
                    }
                    }}
              />
              <span className="text-danger col-1">{passwordMsg}</span>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                value="Login"
              >
                Login
              </Button>
              <Grid container spacing={2}>
                <Grid item xs>
                    <div>
                    <Button variant="outlined" href="/reg/customer" >
                        Create Account
                    </Button>
                    </div>            
                </Grid>
                <Grid item>
                <div>
                     <Button variant="outlined" href="/login/vendor">
                         Are you a Vendor ?
                    </Button>
                </div>
                </Grid>
              </Grid>
              
              {/* <Copyright sx={{ mt: 5 }} /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  
    )
}

export default CustomerLogin;