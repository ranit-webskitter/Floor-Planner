// import React from 'react';
// import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, CssBaseline, Box } from '@mui/material';
// import Link from 'next/link';
// import { styled } from '@mui/material/styles';
// import HomeIcon from '@mui/icons-material/Home';
// import PeopleIcon from '@mui/icons-material/People';
// import BusinessIcon from '@mui/icons-material/Business';
// import { Margin } from '@mui/icons-material';
// import ViewCompactIcon from '@mui/icons-material/ViewCompact';
// import { ThemeProvider,createTheme } from "@mui/material/styles";
// import { MuiThemeOptions } from "../mui-theme";
// const drawerWidth = 240;

// const theme=createTheme()

// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   '& .MuiDrawer-paper': {
//     width: drawerWidth,
//     boxSizing: 'border-box',
//     //  background: theme.palette.primary.main,
//     background:'#22364b',
//      color: theme.palette.common.white,
   
//     marginTop:'4.1rem'
//   },
// }));

// const StyledToolbar = styled(Toolbar)(({ theme }) => ({
//   background: theme.palette.secondary.main,
// }));

// const Layout: React.FC = ({ children }) => (
//   <Box sx={{ display: 'flex' }} theme={theme} >
//     <CssBaseline />
//     <StyledDrawer variant="permanent">
//       <Toolbar />
//       <Box sx={{ overflow: 'auto' }}>
//         <List>
//           <ListItem button component={Link} href="/rooms" >
//             <HomeIcon sx={{  mr: 1 }}  />
//             {/* <ListItemText primary="Rooms"  /> */}
//             <Typography variant="h4">Rooms</Typography>
//           </ListItem>
//           <ListItem button component={Link} href="/staffs">
//             <PeopleIcon sx={{  mr: 1 }} />
//             {/* <ListItemText primary="Staffs" /> */}
//             <Typography variant="h4">Staffs</Typography>
//           </ListItem>
//           <ListItem button component={Link} href="/teams">
//             <BusinessIcon sx={{  mr: 1 }} />
//             {/* <ListItemText primary="Teams" /> */}
//             <Typography variant="h4">Teams</Typography>
//           </ListItem>
//            <ListItem button component={Link} href="/floor-plan" >
//             <ViewCompactIcon sx={{  mr: 1 }} />
//             {/* <ListItemText primary="Floor Plan" style={{ color: 'black' }} /> */}
//             <Typography variant="h4">Floor Plan</Typography>
//           </ListItem>
//         </List>
//       </Box>
//     </StyledDrawer>
//     <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
//       {/* <StyledToolbar>
//         <Typography variant="h6" noWrap>
//           Floor Plan
//         </Typography>
//       </StyledToolbar> */}
//       {children}
//     </Box>
//   </Box>
// );

// export default Layout;



// import React from 'react';
// import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, CssBaseline, Box } from '@mui/material';
// import Link from 'next/link';
// import { styled } from '@mui/material/styles';
// import HomeIcon from '@mui/icons-material/Home';
// import PeopleIcon from '@mui/icons-material/People';
// import BusinessIcon from '@mui/icons-material/Business';
// import { Margin } from '@mui/icons-material';
// import ViewCompactIcon from '@mui/icons-material/ViewCompact';
// import { ThemeProvider,createTheme } from "@mui/material/styles";
// // import { MuiThemeOptions } from "../mui-theme";
// const drawerWidth = 240;
// interface Props {
//   children: React.ReactNode
// }
// const theme=createTheme()

// const StyledDrawer = styled(Drawer)(({ theme }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   '& .MuiDrawer-paper': {
//     width: drawerWidth,
//     boxSizing: 'border-box',
//     //  background: theme.palette.primary.main,
//     background:'#22364b',
//      color: theme.palette.common.white,
   
//     marginTop:'4.1rem'
//   },
// }));

// const StyledToolbar = styled(Toolbar)(({ theme }) => ({
//   background: theme.palette.secondary.main,
// }));

// const Layout: React.FC<Props> = ({ children  }:any) => (
//   // <Box sx={{ display: 'flex' }} theme={theme} >
//      <Box sx={{ display: 'flex' }}  >
//     <CssBaseline />
//     <StyledDrawer variant="permanent">
//       <Toolbar />
//       <Box sx={{ overflow: 'auto' }}>
//         <List>
//           <ListItem button component={Link} href="/dashboard/rooms" >
//             <HomeIcon sx={{  mr: 1 }}  />
//             {/* <ListItemText primary="Rooms"  /> */}
//             <Typography variant="h4">Rooms</Typography>
//           </ListItem>
//           <ListItem button component={Link} href="/dashboard/staffs">
//             <PeopleIcon sx={{  mr: 1 }} />
//             {/* <ListItemText primary="Staffs" /> */}
//             <Typography variant="h4">Staffs</Typography>
//           </ListItem>
//           <ListItem button component={Link} href="/dashboard/teams">
//             <BusinessIcon sx={{  mr: 1 }} />
//             {/* <ListItemText primary="Teams" /> */}
//             <Typography variant="h4">Teams</Typography>
//           </ListItem>
//            <ListItem button component={Link} href="/floor-plan" >
//             <ViewCompactIcon sx={{  mr: 1 }} />
//             {/* <ListItemText primary="Floor Plan" style={{ color: 'black' }} /> */}
//             <Typography variant="h4">Floor Plan</Typography>
//           </ListItem>
//         </List>
//       </Box>
//     </StyledDrawer>
//     <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
//       {/* <StyledToolbar>
//         <Typography variant="h6" noWrap>
//           Floor Plan
//         </Typography>
//       </StyledToolbar> */}
//       {children}
//     </Box>
//   </Box>
// );

// export default Layout;




import React from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, CssBaseline, Box, Hidden } from '@mui/material';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import ViewCompactIcon from '@mui/icons-material/ViewCompact';

const drawerWidth = 240;

interface Props {
  children: React.ReactNode;
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    background: '#22364b',
    color: theme.palette.common.white,
    marginTop: '4.1rem',
  },
}));

const Layout: React.FC<Props> = ({ children }: Props) => (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
   
    <StyledDrawer variant="permanent" anchor="left">
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} href="/dashboard/rooms">
            <HomeIcon sx={{ mr: 1 }} />
            <ListItemText primary="Rooms" />
          </ListItem>
          <ListItem button component={Link} href="/dashboard/staffs">
            <PeopleIcon sx={{ mr: 1 }} />
            <ListItemText primary="Staffs" />
          </ListItem>
          <ListItem button component={Link} href="/dashboard/teams">
            <BusinessIcon sx={{ mr: 1 }} />
            <ListItemText primary="Teams" />
          </ListItem>
          <ListItem button component={Link} href="/floor-plan">
            <ViewCompactIcon sx={{ mr: 1 }} />
            <ListItemText primary="Floor Plan" />
          </ListItem>
        </List>
      </Box>
    </StyledDrawer>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        p: 3,
        paddingTop: '4.1rem', // Adjust for the app bar height
        minHeight: '100vh', // Ensure main content takes full height of the viewport
      }}
    >
     {/* Spacer for content below app bar */}
      {children}
    </Box>
  </Box>
);

export default Layout;
