import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import ProfileModal from "../Dashboard/ProfileModal";
import LogoutButton from "../Login/LogoutButton";


function CustomerSidebar({ setRenderComponant, renderComponant }){
    const customer = JSON.parse(localStorage.getItem("customer"));

    return(
        <div>
            
            <Drawer disableEnforceFocus anchor="left" open={true} hideBackdrop style={{position:"relative", zIndex:0}} sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}>
            <Toolbar/>
                <List>
                    <ListItem>
                    <ProfileModal title={customer.name} />
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemButton onClick={()=> {setRenderComponant("completed"); }} selected={renderComponant==="completed"}>
                            <ListItemText>Completed</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={()=> {setRenderComponant("activeOrders"); }} selected={renderComponant==="activeOrders"}>
                            <ListItemText>Active Orders</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={()=> {setRenderComponant("placeOrder"); }} selected={renderComponant==="placeOrder"}>
                            <ListItemText>Place Order</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={()=> {setRenderComponant("pending"); }} selected={renderComponant==="pending"}>
                            <ListItemText>Pending</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <LogoutButton/>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default CustomerSidebar;