
import React from 'react';
import { Grid, Paper } from '@mui/material';
import { Room } from '../typescript/types';

interface RoomListProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
}

const RoomList: React.FC<RoomListProps> = ({ rooms, onSelectRoom }) => {
  return (
    <div>
       {/* <h3 style={{ display: 'flex', justifyContent: 'center' }}>Rooms:</h3> */}
      <Grid container spacing={2}>
     
      {rooms.map((room,index) => (
        <Grid item xs={4} xl={3} key={index}>
        <Paper
          key={room.name}
          onClick={() => onSelectRoom(room)}
          style={{
            padding: '10px 15px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: '#006c9c',
            margin: '5px',
            color:'white'
          }}
        >
          {room.name}
        </Paper>
        </Grid>
      ))}
      </Grid>
    </div>
  );
};

export default RoomList;
