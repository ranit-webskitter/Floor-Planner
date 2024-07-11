
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import Layout from '../../Layout/Layout';
import RoomGrid from '../../components/RoomGrid';
import CellModal from '../../components/CellModal';
import CreateRoomForm from '../../components/CreateRoom'; // Assuming the name of the create room form component
import { Room, CellData } from '../../typescript/types';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRoomById, updateRoom, createRoom } from '../../API/Function/Room.API';
import { createEmployeeAssignment, deleteEmployeeAssignments, fetchEmployeeAssignments } from '../../API/Function/EmaployeeAssignment.API';
import { updateTeam } from '../../API/Function/Team.API';
import EditRoomForm from '../../components/EditRoom';
import SearchResults from '../../components/Search';
import VerticalLayout from '../../Layout/Vertical-Layout'


const RoomLayoutPage = () => {
  const router = useRouter();
  const { roomId } = router.query as {roomId: string};
  const queryClient = useQueryClient();
  const [room, setRoom] = useState<Room | null>(null);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const updateRoomMutation = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['rooms']});
    }
  });

  const { data: employees } = useQuery({
    queryKey: ['fetchEmployee'],
    queryFn: fetchEmployeeAssignments
  });
  const addEmployeeAssignmentMutation = useMutation({
    mutationFn: createEmployeeAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['rooms']});
    }
  });

  const updateTeamMutation = useMutation({
    mutationFn: updateTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['teamMember']});
    }
  });

  useEffect(() => {
    const fetchRoomData = async () => {
      if (roomId) {
        const fetchedRoom = await fetchRoomById(roomId);
        setRoom(fetchedRoom);
        setCurrentRoom(fetchedRoom);
      }
    };
    fetchRoomData();
  }, [roomId, selectedCell, openModal]);

  
  const handleFormSubmit = async (formData :CellData) => {
    if (currentRoom) {
      const updatedRoom: Room = {
        ...currentRoom,
        cellData: [formData], 
        column: formData.column ?? currentRoom.column,
        row: formData.row ?? currentRoom.row,
        name: formData.name ?? currentRoom.name,
        code: formData.code ?? currentRoom.code,
      };

      try {
        await updateRoom(updatedRoom); 
        router.push('/floor-plan'); 
      } catch (error) {
        if(error instanceof Error){
            console.error('Error updating room:', error.message);
        }
      
      
      }
    }
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
      if (selectedCell && emp.seat_number === (selectedCell + 1) && emp.room_name === currentRoom?.name) {
        deleteEmployeeAssignments(emp.id);
      }
    });
    setSelectedCell(null);
    setOpenModal(false);
  };

  const handleCellClick = (index: number) => {
    // setSelectedCell(index);
    // setOpenModal(true);
  };

  const handleCreateRoom = (formData: Room) => {
    const newRoom: Room = {
      ...formData,
      occupiedCells: [],
      cellData: [],
    };
    createRoom(newRoom).then((createdRoom) => {
      setRoom(createdRoom);
      setCurrentRoom(createdRoom);
    });
  };

  

  if (!room) return <div>Loading...</div>;

  return (
    <Layout>
      <VerticalLayout>
      <SearchResults />
      <Grid container spacing={2}>
       
        <Grid item xs={12} md={9} style={{padding:'1rem'}}>
          <h1>Room Layout: {room.name}</h1>
          <RoomGrid room={room} onCellClick={handleCellClick} />
        </Grid>
        {/* <Grid item xs={12} md={3}>
          <EditRoomForm
                  onSubmit={handleFormSubmit}
                  defaultValues={{
                    row: currentRoom?.row,
                    column: currentRoom?.column,
                    name: currentRoom?.name,
                    code: currentRoom?.code, 
                  }}
                />
        </Grid> */}
      </Grid>
      <CellModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleFormSubmit}
        onUnselect={handleUnselectCell}
        currentRoom={currentRoom}
        selectedCell={selectedCell}
      />
      </VerticalLayout>
    </Layout>
  );
};

export default RoomLayoutPage;
