import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { EmployeeAssignment } from '../typescript/types';

interface EditEmployeeDialogProps {
  open: boolean;
  employee: EmployeeAssignment | null;
  onClose: () => void;
  onSave: (employee: EmployeeAssignment) => void;
  editEmployeeName: string;
  setEditEmployeeName: React.Dispatch<React.SetStateAction<string>>;
  editTeamName: string;
  setEditTeamName: React.Dispatch<React.SetStateAction<string>>;
  editRoomNumber: string;
  setEditRoomNumber: React.Dispatch<React.SetStateAction<string>>;
  editSeatNumber: string;
  setEditSeatNumber: React.Dispatch<React.SetStateAction<string>>;
}

const EditEmployeeDialog: React.FC<EditEmployeeDialogProps> = ({
  open,
  employee,
  onClose,
  onSave,
  editEmployeeName,
  setEditEmployeeName,
  editTeamName,
  setEditTeamName,
  editRoomNumber,
  setEditRoomNumber,
  editSeatNumber,
  setEditSeatNumber,
}) => {
  const handleSave = () => {
    if (employee) {
      const updatedEmployee: EmployeeAssignment = {
        ...employee,
        employee_name: editEmployeeName,
        team_name: editTeamName,
        room_name: editRoomNumber,
        seat_number: editSeatNumber,
      };
      onSave(updatedEmployee);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Employee Assignment</DialogTitle>
      <DialogContent>
        <TextField
          label="Employee Name"
          fullWidth
          margin="normal"
          value={editEmployeeName}
          onChange={(e) => setEditEmployeeName(e.target.value)}
        />
        <TextField
          label="Team Name"
          fullWidth
          margin="normal"
          value={editTeamName}
          onChange={(e) => setEditTeamName(e.target.value)}
        />
        <TextField
          label="Room Number"
          fullWidth
          margin="normal"
          value={editRoomNumber}
          onChange={(e) => setEditRoomNumber(e.target.value)}
        />
        <TextField
          label="Seat Number"
          fullWidth
          margin="normal"
          value={editSeatNumber}
          onChange={(e) => setEditSeatNumber(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeDialog;
