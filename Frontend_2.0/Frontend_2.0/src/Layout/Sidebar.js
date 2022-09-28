import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useState } from "react";
import ProfileModalVendor from "../Dashboard/ProfileModalVendor";
import LogoutButton from "../Login/LogoutButton";


function Sidebar({ setRenderComponant }){
    const vendor = JSON.parse(localStorage.getItem("authVendor"));
    const [selectedComponant, setSelectedComponant] = useState("request");

    return(
        <div>
            
            <Drawer disableEnforceFocus anchor="left" open={true} hideBackdrop style={{position:"relative", zIndex:0}} sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}>
            <Toolbar/>
                <List>
                    <ListItem>
                    <ProfileModalVendor title={vendor.name} />
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <ListItemButton onClick={()=> {setRenderComponant("completed"); setSelectedComponant("completed")}} selected={selectedComponant==="completed"}>
                            <ListItemText>Completed</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={()=> {setRenderComponant("pending"); setSelectedComponant("pending")}} selected={selectedComponant==="pending"}>
                            <ListItemText>Pending</ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={()=> {setRenderComponant("request"); setSelectedComponant("request")}} selected={selectedComponant==="request"}>
                            <ListItemText>Request</ListItemText>
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

export default Sidebar;
