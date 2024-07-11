
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import Layout from '../../Layout/Layout';
import CreateRoomForm from '../../components/CreateRoom';
import RoomList from '../../components/RoomList';
import RoomGrid from '../../components/RoomGrid';
import CellModal from '../../components/CellModal';
import { Room, CellData } from '../../typescript/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchRooms, updateRoom, createRoom } from '../../API/Function/Room.API';
import { createEmployeeAssignment, fetchEmployeeAssignments, deleteEmployeeAssignments } from '../../API/Function/EmaployeeAssignment.API';
import { updateTeam } from '../../API/Function/Team.API';
import SearchResults from '../../components/Search';
import VerticalLayout from '../../Layout/Vertical-Layout';

const FloorPlan: React.FC = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<number |null >(null);

  const queryClient = useQueryClient();

  const { data: rooms, isLoading, error } = useQuery<Room[], Error>({
    queryKey: ['rooms'],
    queryFn: fetchRooms
  });

  const createRoomMutation = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });

  const updateRoomMutation = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });

  const addEmployeeAssignmentMutation = useMutation({
    mutationFn: createEmployeeAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    }
  });

  const { data: employees } = useQuery({
    queryKey: ['fetchEmployee'],
    queryFn: fetchEmployeeAssignments
  });

  const updateTeamMutation = useMutation({
    mutationFn: updateTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teamMember'] });
    }
  });

  const handleCreateRoom = (data: Room) => {
    const newRoom = { ...data, occupiedCells: [], cellData: [] };
    createRoomMutation.mutate(newRoom);
    setCurrentRoom(newRoom);
  };

  const handleFormSubmit = (formData: CellData) => {
    if (currentRoom && selectedCell !== null) {
      const updatedRoom = {
        ...currentRoom,
        occupiedCells: [...currentRoom.occupiedCells, selectedCell],
        cellData: [
          ...currentRoom.cellData.filter((cell) => cell.index !== selectedCell),
          formData,
        ],
      };
      updateRoomMutation.mutate(updatedRoom);
      setCurrentRoom(updatedRoom);
      addEmployeeAssignmentMutation.mutate({
        employee_name: formData.employeeName,
        team_name: formData.teamName,
        seat_number: selectedCell + 1,
        room_id: currentRoom.code || '', 
        room_name: currentRoom.name || ''
        
      });

      updateTeamMutation.mutate({
        employeeName: formData.employeeName,
        teamName: formData.teamName,
        seatNumber: selectedCell + 1,
        roomId: currentRoom.code || '', 
        roomName: currentRoom.name || '',
       
      });
      setOpenModal(false);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleCellClick = (index: number) => {
    setSelectedCell(index);
    setOpenModal(true);
  };

  const handleUnselectCell = () => {
    if (currentRoom && selectedCell !== null) {
      const updatedRoom = {
        ...currentRoom,
        occupiedCells: currentRoom.occupiedCells.filter(cell => cell !== selectedCell),
        cellData: currentRoom.cellData.filter(cell => cell.index !== selectedCell),
      };
      updateRoomMutation.mutate(updatedRoom);
      setCurrentRoom(updatedRoom);
    }
    employees?.forEach((emp) => {
      if (selectedCell !== null && emp?.seat_number === (selectedCell + 1) && emp?.room_name === currentRoom?.name) {
        deleteEmployeeAssignments(emp.id);
      }
    });
    setSelectedCell(null);
    setOpenModal(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <VerticalLayout>
        <SearchResults />
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <RoomList rooms={rooms || []} onSelectRoom={setCurrentRoom} />
            {currentRoom && <RoomGrid room={currentRoom} onCellClick={handleCellClick} />}
          </Grid>
          <Grid item xs={12} md={3}>
            <CreateRoomForm onCreateRoom={handleCreateRoom} />
          </Grid>
        </Grid>
        <CellModal
          open={openModal}
          onClose={handleClose}
          onSubmit={handleFormSubmit}
          onUnselect={handleUnselectCell}
          currentRoom={currentRoom}
          selectedCell={selectedCell}
        />
      </VerticalLayout>
    </Layout>
  );
};

export default FloorPlan;
