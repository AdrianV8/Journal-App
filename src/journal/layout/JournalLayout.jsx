import { Box } from "@mui/system"
import { NavBar, SideBar } from "../components";


const drawerWidth = 240;

export const JournalLayout = ({children}) => {
  return (
    <Box sc={{ display: 'flex' }} >

        

        <NavBar drawerWidth={drawerWidth}/>

        <SideBar drawerWidth={drawerWidth} />

        {/* Sidebar */}

        <Box
            component={'main'}
            sx={{ flexGrow: 1, p: 3 }}
        >
            {/* Toolbar */}

            { children }

        </Box>

    </Box>
  )
}
