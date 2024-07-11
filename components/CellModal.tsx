import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal, Box, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { CellData, Room } from '../typescript/types';
import { useQuery } from '@tanstack/react-query';
import { fetchTeamMembers, fetchTeams } from '../API/Function/Team.API';

interface CellModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CellData) => void;
  onUnselect: () => void;
  currentRoom: Room | null;
  selectedCell: number | null;
}

const CellModal: React.FC<CellModalProps> = ({ open, onClose, onSubmit, onUnselect, currentRoom, selectedCell }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<CellData>();
  const { data: teams } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams
  });
  React.useEffect(() => {

    if (currentRoom && selectedCell !== null) {
      const cellData = Object.values(currentRoom?.cellData)?.find(cell => cell?.index === selectedCell);
      if (cellData) {
        reset(cellData);
      } else {
        reset({
          index: selectedCell,
          employeeName: '',
          teamName: '',
          seatNumber: selectedCell + 1,
          roomNumber: currentRoom ? parseInt(currentRoom.name) : 0,
          code: currentRoom?.code
        });
      }
    }
  }, [currentRoom, selectedCell, reset]);

  const teamName = watch('teamName', '');
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <h2 style={{color:'black'}}>{selectedCell !== null && currentRoom?.occupiedCells.includes(selectedCell) ? 'Cell Details' : 'Enter Cell Details'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('employeeName')}
            label="Employee Name"
            fullWidth
            margin="normal"
            disabled={selectedCell !== null && currentRoom?.occupiedCells.includes(selectedCell)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Team Name</InputLabel>
            <Select
              {...register('teamName')}
              label="Team Name"
              value={teamName}
              onChange={(e) => setValue('teamName', e.target.value)}
              disabled={selectedCell !== null && currentRoom?.occupiedCells.includes(selectedCell)}
            >
              {teams?.map(team => (
                <MenuItem key={team.id} value={team.name}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Seat Number"
            fullWidth
            margin="normal"
            value={selectedCell !== null ? selectedCell + 1 : ''}
            disabled
          />
          <TextField
            label="Room Number"
            fullWidth
            margin="normal"
            value={currentRoom ? currentRoom.name : ''}
            disabled
          />
          <TextField
            label="Room Code"
            fullWidth
            margin="normal"
            value={currentRoom ? currentRoom.code : ''}
            disabled
          />
          {selectedCell !== null && !currentRoom?.occupiedCells.includes(selectedCell) && (
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          )}
          <Button onClick={onUnselect} variant="contained" color="error" style={{ marginLeft: '10px' }}>
            Unselect
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default CellModal;


