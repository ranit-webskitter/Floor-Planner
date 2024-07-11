
import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Select, MenuItem, TextField, Typography } from '@mui/material';
import { fetchEmployeeAssignments, updateEmployeeAssignment } from '../../API/Function/EmaployeeAssignment.API'; // Corrected import path
import { EditEmployeeAssignment, EmployeeAssignment, Room } from '../../typescript/types'; // Adjust this as per your project structure
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { fetchRooms } from '../../API/Function/Room.API';
import { fetchTeams } from '../../API/Function/Team.API';
import SearchResults from '../../components/Search';

const queryClient = new QueryClient();

const Staffs: React.FC = () => {
  const [employeeAssignments, setEmployeeAssignments] = useState<EmployeeAssignment[]>([]);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [highlightedSeat, setHighlightedSeat] = useState<number | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeAssignment | null>(null);
  const [editEmployeeName, setEditEmployeeName] = useState('');
  const [editTeamName, setEditTeamName] = useState('');
  const [editRoomNumber, setEditRoomNumber] = useState('');
  const [editSeatNumber, setEditSeatNumber] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const router = useRouter();
  const { data: rooms, isLoading: roomsLoading, error: roomsError } = useQuery<Room[], Error>({
    queryKey: ['rooms'],
    queryFn: fetchRooms
  });
  const { data: teams, isLoading: teamsLoading, error: teamsError } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: updateEmployeeAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employeeAssignments'] });
    }
  });

  useEffect(() => {
    const fetchEmployeeAssignmentsData = async () => {
      const data = await fetchEmployeeAssignments();
      setEmployeeAssignments(data);
    };
    fetchEmployeeAssignmentsData();
  }, []);

  const handleViewEmployee = (employee: EmployeeAssignment) => {
    const matchedRoom = rooms?.find(room => room.name === employee.room_name) || null;
    setCurrentRoom(matchedRoom);
    setHighlightedSeat(Number(employee.seat_number) - 1);
  };

  const handleCloseViewDialog = () => {
    setCurrentRoom(null);
    setHighlightedSeat(null);
  };

  const calculateTotalCells = (room: Room) => {
    return room.row * room.column;
  };

  const handleEditEmployee = (employee: EmployeeAssignment) => {
    setSelectedEmployee(employee);
    setEditEmployeeName(employee.employee_name);
    setEditTeamName(employee.team_name);
    setEditRoomNumber(employee.room_name);
    setEditSeatNumber(employee.seat_number);
    setEditDialogOpen(true);
  };

  const handleSaveEmployee = () => {
    if (selectedEmployee) {
      const updatedEmployee: EditEmployeeAssignment = {
        ...selectedEmployee,
        employee_name: editEmployeeName,
        team_name: editTeamName,
        room_name: editRoomNumber,
        seat_number: editSeatNumber,
      };

      updateEmployeeMutation.mutate(updatedEmployee);
      setEditDialogOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
    setSelectedEmployee(null);
  };

  const columns: GridColDef[] = [
    { field: 'employee_name', headerName: 'Employee Name', width: 200 },
    { field: 'team_name', headerName: 'Team Name', width: 200 },
    { field: 'room_name', headerName: 'Room Number', width: 200 },
    { field: 'seat_number', headerName: 'Seat Number', width: 150 },
    {
      field: 'view',
      headerName: 'View',
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleViewEmployee(params.row as EmployeeAssignment)}
          variant="contained"
          color="primary"
        >
          <VisibilityIcon />
        </Button>
      ),
      width: 150
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => handleEditEmployee(params.row as EmployeeAssignment)}
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
      ),
      width: 150
    }
  ];

  return (
    <>
      <SearchResults />
      <Box mt={2} style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={employeeAssignments}
          columns={columns}
          autoPageSize
          pagination
          style={{ width: '90%', color: 'black', fontSize: '15px' }}
        />
      </Box>

      <Dialog open={editDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle style={{ color: 'black' }}>Edit Employee Assignment</DialogTitle>
        <DialogContent>
          <TextField
            label="Employee Name"
            fullWidth
            margin="normal"
            value={editEmployeeName}
            onChange={(e) => setEditEmployeeName(e.target.value)}
          />
          <Select
            value={editTeamName}
            onChange={(e) => setEditTeamName(e.target.value as string)}
            fullWidth
            label="Team Name"
          >
            {teams && teams.map((team) => (
              <MenuItem key={team.id} value={team.name}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
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
          <Button onClick={handleCancelEdit} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveEmployee} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {currentRoom && highlightedSeat !== null && (
        <Dialog open={true} onClose={handleCloseViewDialog} maxWidth="xs" fullWidth>
          <DialogTitle>Employee Position</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>{currentRoom.name}</Typography>
            <Grid container spacing={1}>
              {Array.from({ length: calculateTotalCells(currentRoom) }, (_, index) => (
                <Grid item xs={4} xl={12 / currentRoom.column} key={index}>
                  <Paper
                    style={{
                      width: '100%',
                      height: '50px',
                      textAlign: 'center',
                      lineHeight: '50px',
                      cursor: 'pointer',
                      backgroundColor: currentRoom.occupiedCells.includes(index)
                        ? (index === highlightedSeat ? 'yellow' : '#ff5630')
                        : 'white',
                      boxShadow: currentRoom.occupiedCells.includes(index)
                        ? (index === highlightedSeat ? '0 0 5px 2px yellow' : '0 0 5px 2px red')
                        : 'none',
                      color: currentRoom.occupiedCells.includes(index) ? 'black' : 'white',
                    }}
                  >
                    {index + 1}
                  </Paper>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body2" color="textSecondary">
              <p>Yellow: Your Seat</p>
              <p>Red: Occupied Seats</p>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Staffs;
