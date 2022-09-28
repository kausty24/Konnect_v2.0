import { Button, Grid, TextareaAutosize, TextField } from '@mui/material'
import axios from 'axios';

function PlaceBidForm({ orderId, lockoutTimeInMinutes }){


    function handleSubmit(e){
        e.preventDefault();

        const jwtToken = localStorage.getItem("jwtToken");

        const bidDTO = {
            bidAmount : e.target["bidAmount"+orderId].value,
            vendorComments : e.target["vendorComments"+orderId].value,
            vendorId : JSON.parse(localStorage.getItem("authVendor")).id,
            orderId : orderId
        }
        
        axios.post("http://localhost:8080/order/placebid", bidDTO, { headers : {
            "Authorization" : jwtToken,
        }}).then(response => console.log(response.data)).catch(err => console.log(err));
    }

    return(
        <>
            
            <form onSubmit={handleSubmit}>
            <Grid container spacing={1} sx={{ padding : 1 }}>
            <Grid item xs={12} sm={2}>
                <TextField type="number" id={"bidAmount"+orderId} variant='outlined' label="Bid Amount" name={"bidAmount"+orderId} />
            </Grid>
            <Grid item xs={12} sm={8} textAlign={'center'}>
                <TextareaAutosize id={"vendorComments"+orderId} name={"vendorComments"+orderId} placeholder='vendor Comments' minRows="3" style={{ width: "90%" }} />
            </Grid>
            <Grid item xs={12} sm={2}>
                <Button variant='contained' id={"submitBtn"+orderId} name={"submitBtn"+orderId} type='submit' color='primary' disabled={lockoutTimeInMinutes === 0}>Place Bid</Button>
            </Grid>
            </Grid>
            </form>

        </>
    )
}

export default PlaceBidForm;