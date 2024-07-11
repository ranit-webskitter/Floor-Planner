
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import { Grid, TextField } from '@mui/material';
// import Layout from '../../Layout/Layout';
// import RoomGrid from '../../components/RoomGrid';
// import CellModal from '../../components/CellModal';
// import CreateRoomForm from '../../components/CreateRoom'; // Assuming the name of the create room form component
// import { Room, CellData } from '../../typescript/types';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { fetchRoomById, updateRoom, createRoom } from '../../API/Function/Room.API';
// import { createEmployeeAssignment, deleteEmployeeAssignments, fetchEmployeeAssignments } from '../../API/Function/EmaployeeAssignment.API';
// import { updateTeam } from '../../API/Function/Team.API';
// import EditRoomForm from '../../components/EditRoom';
// import SearchResults from '../../components/Search';
// import VerticalLayout from '../../Layout/Vertical-Layout'

// const RoomLayoutPage = () => {
//   const router = useRouter();
//   const { roomId  } = router.query as {roomId:string}
//   const queryClient = useQueryClient();
//   const [room, setRoom] = useState<Room | null>(null);
//   const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
//   const [openModal, setOpenModal] = useState<boolean>(false);
//   const [selectedCell, setSelectedCell] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState<string>('');

//   const updateRoomMutation = useMutation({
//     mutationFn: updateRoom,
//     onSuccess: () => {
//       queryClient.invalidateQueries({queryKey:['rooms']});
//     }
//   });

//   const { data: employees } = useQuery({
//     queryKey: ['fetchEmployee'],
//     queryFn: fetchEmployeeAssignments
//   });
//   const addEmployeeAssignmentMutation = useMutation({
//     mutationFn: createEmployeeAssignment,
//     onSuccess: () => {
//       queryClient.invalidateQueries({queryKey:['rooms']});
//     }
//   });

//   const updateTeamMutation = useMutation({
//     mutationFn: updateTeam,
//     onSuccess: () => {
//       queryClient.invalidateQueries({queryKey:['teamMember']});
//     }
//   });

//   useEffect(() => {
//     const fetchRoomData = async () => {
//       if (roomId) {
//         const fetchedRoom = await fetchRoomById(roomId);
//         setRoom(fetchedRoom);
//         setCurrentRoom(fetchedRoom);
//       }
//     };
//     fetchRoomData();
//   }, [roomId, selectedCell, openModal]);

  
//   const handleFormSubmit = async (formData: CellData) => {
//     if (currentRoom) {
//       const updatedRoom = {
//         ...currentRoom,
//         cellData: formData,
//         column: formData.column,
//         row: formData.row,
//         name: formData.name,
//         code: formData.code,
//       };

//       try {
//         await updateRoom(updatedRoom); 
//         router.push('/floor-plan'); 
//       } catch (error) {
//         if(error instanceof Error){
//           console.error('Error updating room:', error.message);
//         }
        
      
//       }
//     }
//   };
//   const handleUnselectCell = () => {
//     if (currentRoom && selectedCell !== null) {
//       const updatedRoom = {
//         ...currentRoom,
//         occupiedCells: currentRoom.occupiedCells.filter(cell => cell !== selectedCell),
//         cellData: currentRoom.cellData.filter(cell => cell.index !== selectedCell),
//       };
//       updateRoomMutation.mutate(updatedRoom);
//       setCurrentRoom(updatedRoom);
//     }
//     employees?.forEach((emp) => {
//       if (emp.seat_number === (selectedCell + 1) && emp.room_name === currentRoom?.name) {
//         deleteEmployeeAssignments(emp.id);
//       }
//     });
//     setSelectedCell(null);
//     setOpenModal(false);
//   };

//   const handleCellClick = (index: number) => {
//     setSelectedCell(index);
//     setOpenModal(true);
//   };

//   const handleCreateRoom = (formData: Room) => {
//     const newRoom: Room = {
//       ...formData,
//       occupiedCells: [],
//       cellData: [],
//     };
//     createRoom(newRoom).then((createdRoom) => {
//       setRoom(createdRoom);
//       setCurrentRoom(createdRoom);
//     });
//   };

  

//   if (!room) return <div>Loading...</div>;

//   return (
//     <Layout>
//       <VerticalLayout>
//       <SearchResults/>
//       <Grid container spacing={2}>
       
//         <Grid item xs={12} md={9} style={{padding:'1rem'}}>
//           <h1>Room Layout: {room.name}</h1>
//           <RoomGrid room={room} onCellClick={handleCellClick} />
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <EditRoomForm
//                   onSubmit={handleFormSubmit}
//                   defaultValues={{
//                     row: currentRoom?.row,
//                     column: currentRoom?.column,
//                     name: currentRoom?.name,
//                     code: currentRoom?.code, 
//                   }}
//                 />
//         </Grid>
//       </Grid>
//       <CellModal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         onSubmit={handleFormSubmit}
//         onUnselect={handleUnselectCell}
//         currentRoom={currentRoom}
//         selectedCell={selectedCell}
//       />
//       </VerticalLayout>
//     </Layout>
//   );
// };

// export default RoomLayoutPage;



import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../Layout/Layout';
import EditRoomForm from '../../components/EditRoom';
import { Room, CellData } from '../../typescript/types';
import { fetchRoomById, updateRoom } from '../../API/Function/Room.API';
import { Grid, Paper, Typography } from '@mui/material';
import VerticalLayout from '../../Layout/Vertical-Layout';

const EditRoomPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (slug) {
      fetchRoomData(slug as string);
    }
  }, [slug]);

  const fetchRoomData = async (roomId: string) => {
    try {
      const room = await fetchRoomById(roomId);
      setCurrentRoom(room);
    } catch (error: any) {
      console.error('Error fetching room:', error?.message);
    }
  };

  const handleFormSubmit = async (formData: CellData) => {
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
        if (error instanceof Error) {
          console.error('Error updating room:', error.message);
        }
      }
    }
  };

  const calculateTotalCells = (room: Room) => {
    return (room.row ?? 0) * (room.column ?? 0);
  };

  return (
    <Layout>
      <VerticalLayout>
        {currentRoom && (
          <Grid container spacing={1}>
            <Grid item xs={12} md={8} style={{ marginTop: '6rem' }}>
              <Typography variant="h6">Room Layout</Typography>
              <Grid container spacing={1} style={{ padding: '1rem' }}>
                {Array.from({ length: calculateTotalCells(currentRoom) }, (_, index) => (
                  <Grid item xs={4} xl={12 / (currentRoom.column ?? 1)} key={index}>
                    <Paper
                      className={`cell ${currentRoom.occupiedCells.includes(index) ? 'occupied' : ''}`}
                      style={{
                        width: '100%',
                        height: '50px',
                        textAlign: 'center',
                        lineHeight: '50px',
                        cursor: 'pointer',
                        backgroundColor: currentRoom.occupiedCells.includes(index) ? '#ff5630' : '#22c55e',
                      }}
                    >
                      {index + 1}
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <EditRoomForm
                onSubmit={handleFormSubmit}
                defaultValues={{
                  row: currentRoom.row ?? undefined,
                  column: currentRoom.column ?? undefined,
                  name: currentRoom.name ?? '',
                  code: currentRoom.code ?? '',
                }}
              />
            </Grid>
          </Grid>
        )}
      </VerticalLayout>
    </Layout>
  );
};

export default EditRoomPage;
