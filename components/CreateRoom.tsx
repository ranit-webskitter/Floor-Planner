import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box } from '@mui/material';
import { Room } from '../typescript/types';

interface CreateRoomProps {
  onCreateRoom: (data: Room) => void;
}

const CreateRoom: React.FC<CreateRoomProps> = ({ onCreateRoom }) => {
  const { register, handleSubmit, reset } = useForm<Room>();

  const onSubmit = (data: Room) => {
    onCreateRoom(data);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField {...register('name')} label="Room Name" required />
      <TextField {...register('code')} label="Room Code" required />
      <TextField {...register('row')} label="Rows" type="number" required />
      <TextField {...register('column')} label="Columns" type="number" required />
      <Button type="submit" variant="contained" color="primary">
        Create Room
      </Button>
    </Box>
  );
};

export default CreateRoom;
