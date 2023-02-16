import {AccountCircle} from "@mui/icons-material"
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth = 240 }) => {

    const { displayName } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal );
    
    
  return (
    <Box 
        component={'nav'}
        sx={{ width: { sm: drawerWidth }, flexShrink: {sm: 0} }}
    >
        <Drawer
            variant="permanent"
            open={ true }
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing : 'border-box', width: drawerWidth }
            }}
        >
            <Toolbar>
                <AccountCircle sx={{ mr: 1 }}/>
                <Typography variant="h6" noWrap component={'div'}>
                    { displayName }
                </Typography>
            </Toolbar>
            < Divider/>
            <List>
                    {
                        notes.map(nota =>(
                            <SideBarItem key={nota.id} { ...nota } />
                        ))
                    }
            </List>
                


        </Drawer>
    </Box>
  )
}
