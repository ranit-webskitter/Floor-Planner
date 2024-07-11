import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { EmployeeAssignment } from '../typescript/types';
import { Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface EmployeeTableProps {
  employeeAssignments: EmployeeAssignment[];
  onViewEmployee: (employee: EmployeeAssignment) => void;
  onEditEmployee: (employee: EmployeeAssignment) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employeeAssignments, onViewEmployee, onEditEmployee }) => {
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
        <Button onClick={() => onViewEmployee(params.row)} variant="contained" color="primary">
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
        <Button onClick={() => onEditEmployee(params.row)} variant="contained" color="primary">
          Edit
        </Button>
      ),
      width: 150
    }
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={employeeAssignments}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 3 },
          },
        }}
      />
    </div>
  );
};

export default EmployeeTable;
