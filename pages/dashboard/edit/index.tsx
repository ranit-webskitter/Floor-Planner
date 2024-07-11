
import React, { useState, useEffect } from 'react';
import { Grid, Paper, IconButton } from '@mui/material';
import Layout from '../../../Layout/Layout';
import DeleteIcon from '@mui/icons-material/Delete';
import { Room } from '../../../typescript/types';
import { fetchRooms, deleteRoom } from '../../../API/Function/Room.API'; 
import { useRouter } from 'next/router';
import { useConfirm } from "material-ui-confirm";
import VerticalLayout from '../../../Layout/Vertical-Layout'
const EditRoom: React.FC = () => {
  const confirm = useConfirm();
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    
    fetchRoomsFromSupabase();
  }, []);

  const fetchRoomsFromSupabase = async () => {
    try {
      const data = await fetchRooms(); 
      setRooms(data || []); 
    } catch (error) {
      if(error instanceof Error){
        console.error('Error fetching rooms:', error.message);
      }
     
    }
  };

  const handleEditClick = (roomId: string) => {
    router.push(`/edit/${roomId}`); 
  };

  const handleDeleteRoom =  (roomId: string) => {
    
    confirm({ description: `This will permanently deleted` })
    .then(() => {
       deleteRoom(roomId); 
      const updatedRooms = (rooms.filter(room => room?.id !== roomId));
      setRooms(updatedRooms); 
    })
    .catch(() => console.log("Deletion cancelled."));
    
  };

  return (
    <Layout>
      <VerticalLayout>
      <h2 style={{ display: 'flex', justifyContent: 'center',color:'black' }}>Edit Room</h2>
      <Grid container spacing={2}>
        {rooms.map((room, index) => (
          <Grid item xs={4} xl={3} key={index}>
            <Paper
              onClick={() => handleEditClick(room?.id)}
              style={{
                width: '100%',
                height: '100px',
                textAlign: 'center',
                lineHeight: '100px',
                cursor: 'pointer',
                backgroundColor: '#006c9c',
                position: 'relative',
                color:'white'
              }}
            >
              {room.name}
              <IconButton
                aria-label="delete"
                style={{ position: 'absolute', top: 0, right: 0,color:'wheat' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteRoom(room?.id);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
      </VerticalLayout>
    </Layout>
  );
};

export default EditRoom;
