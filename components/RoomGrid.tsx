import React from 'react';
import { Grid, Paper } from '@mui/material';
import { Room } from '../typescript/types';
import PersonIcon from '@mui/icons-material/Person';
interface RoomGridProps {
  room: Room;
  onCellClick: (index: number) => void;
}

const RoomGrid: React.FC<RoomGridProps> = ({ room, onCellClick }) => {
  const calculateTotalCells = (room: Room) => {
    return room.row * room.column;
  };

  return (
    <div>
      <h3>Room: {room.name}</h3>
      <Grid container spacing={1}>
        {Array.from({ length: calculateTotalCells(room) }, (_, index) => (
          <Grid item xs={4} xl={12 / room.column} key={index}>
            <Paper
              className={`cell ${room.occupiedCells.includes(index) ? 'occupied' : ''}`}
              onClick={() => onCellClick(index)}
              style={{
                width: '100%',
                height: '50px',
                textAlign: 'center',
                lineHeight: '50px',
                cursor: 'pointer',
               // backgroundColor: room.occupiedCells.includes(index) ? 'red' : 'green',
                 backgroundColor: room.occupiedCells.includes(index) ? '#ff5630' : "#00a76f",
              }}
            >
              {!room.occupiedCells.includes(index) && index + 1}
              {room.occupiedCells.includes(index) && <PersonIcon /> }
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RoomGrid;
