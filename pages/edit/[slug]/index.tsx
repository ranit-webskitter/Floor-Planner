
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../../Layout/Layout';
import EditRoomForm from '../../../components/EditRoom';
import { Room, CellData } from '../../../typescript/types';
import { fetchRoomById, updateRoom } from '../../../API/Function/Room.API';
import { Grid, Paper, Typography } from '@mui/material';
import VerticalLayout from '../../../Layout/Vertical-Layout';

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
