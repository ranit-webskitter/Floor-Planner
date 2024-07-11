import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { toast } from 'react-toastify';
import LogoutIcon from '@mui/icons-material/Logout';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Cookies from 'js-cookie'
import {useRouter as Router1} from 'next/router'; 
import '../styles/Home.module.css'
export default function ButtonAppBar() {
  
  const router = useRouter()
  const router1=Router1()
  const [token, setToken] = React.useState<string | null>(null);
  const isActive = (path: string) => {
    return router1.asPath === path ? "active" : "";
  };
 
  React.useEffect(() => {
    // const accessToken = localStorage.getItem('accessToken');
    const accessToken  = Cookies.get('token') 
    if (accessToken) {
      setToken(accessToken);
    }
  }, [token]);


  const handleLogout = () => {
    // localStorage.removeItem('accessToken');
    Cookies.remove('token')
    toast.success('logout successfull')
    router.push('/')
    setToken(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{backgroundColor:'#22364b'}}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {!token && <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} style={{ textDecoration: 'none', color: 'white' }}>
            Floor Planner
          </Typography>}
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} className={isActive("/floor-plan")} >
            {token && <Link href="/floor-plan" style={{ textDecoration: 'none', color: 'white' }}>Floor Planner</Link>}
          </Typography>
          <Button color="inherit" className={isActive("/")} >
            <Link href='/' style={{ textDecoration: 'none', color: 'white' }}  >
              Home
            </Link>
          </Button>
         { token && <Button color="inherit" className={isActive("/edit")} >
            <Link href='/edit' style={{ textDecoration: 'none', color: 'white' }}  >
            Edit Rooms
            </Link>
          </Button>}
          {/* {token && <Button variant="contained" color="secondary" size="small" style={{ marginLeft: '3rem', marginRight: '3rem' }} ><Link href='/edit' style={{ textDecoration: 'none', color: 'white' }}>Edit Rooms</Link></Button>} */}
          {token ? (
            <Button color="inherit" onClick={handleLogout} style={{ textDecoration: 'none', color: 'white' }}>
              <LogoutIcon/>Logout
            </Button>
          ) : (
            <Button color="inherit" className={isActive("/login")}>
              <Link href="/login" style={{ textDecoration: 'none', color: 'white' }} >Login</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
