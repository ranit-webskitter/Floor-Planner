import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { CellData } from '../typescript/types';

const defaultTheme = createTheme();

interface IFormInput {
  row?: number | null;
  column?: number |null;
  name?: string;
  code?: any;
}

interface EditRoomFormProps {
  onSubmit: (data: CellData) => void;
  defaultValues: IFormInput;
}

const EditRoomForm: React.FC<EditRoomFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, reset } = useForm<any>({
    defaultValues
  });

  const handleFormSubmit = (data: CellData) => {
    onSubmit(data);
  };

  return (
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
            Edit Room
          </Typography>
          <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="row"
              label="Row"
              {...register('row', { required: true })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="column"
              label="Column"
              {...register('column', { required: true })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              {...register('name', { required: true })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="code"
              label="Room Code"
              {...register('code', { required: true })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default EditRoomForm;
