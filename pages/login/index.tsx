
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { supabase } from '../../services/auth';
import Layout from '../../Layout/Layout';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import Cookies from 'js-cookie';
import VerticalLayout from '../../Layout/Vertical-Layout';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

const defaultTheme = createTheme();

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await supabase.auth.signInWithPassword({ email, password });
      const session = response.data.session;
      if (session) {
        localStorage.setItem("accessToken", session.access_token ?? '');
        toast.success(response.data.user?.aud ?? 'Signed in successfully');
        Cookies.set('token', session.access_token, { expires: 1 });
        router.push('/floor-plan');
      } else if (response.error) {
        toast.error(response.error.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <VerticalLayout>
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <FormControl sx={{ width: '45ch' }} variant="outlined" fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      value={password}
                      onChange={handlePasswordChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {!loading ? <>Sign in</> : <CircularProgress color="inherit" />}
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </VerticalLayout>
      </Layout>
    </>
  );
}
