import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Paper } from '@mui/material';
import { Room } from '../typescript/types';

interface ViewEmployeeDialogProps {
  open: boolean;
  room: Room | null;
  highlightedSeat: number | null;
  onClose: () => void;
  calculateTotalCells: (room: Room) => number;
}

const ViewEmployeeDialog: React.FC<ViewEmployeeDialogProps> = ({ open, room, highlightedSeat, onClose, calculateTotalCells }) => {
  if (!room) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Employee Position</DialogTitle>
      <DialogContent>
        <h3>Room: {room.name}</h3>
        <Grid container spacing={1}>
          {Array.from({ length: calculateTotalCells(room) }, (_, index) => (
            <Grid item xs={4} xl={12 / room.column} key={index}>
              <Paper
                style={{
                  width: '100%',
                  height: '50px',
                  textAlign: 'center',
                  lineHeight: '50px',
                  cursor: 'pointer',
                  backgroundColor: room.occupiedCells.includes(index) ? (index === highlightedSeat ? 'yellow' : 'red') : 'green',
                }}
              >
                {index + 1}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewEmployeeDialog;
