import React from 'react';
import { Grid, Card, CardContent, CardMedia, CardActionArea, Typography, Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchRooms } from '../../../API/Function/Room.API';
import { Room } from '../../../typescript/types';
import { useRouter } from 'next/router';
import SearchResults from '../../../components/Search';
import Link from 'next/link';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
const Rooms: React.FC = () => {
  const router = useRouter();
  const { data: rooms, isLoading, error } = useQuery({ queryKey: ['rooms'], queryFn: fetchRooms });
  const handleViewRoom = (roomId: string) => {
    router.push(`/home-page/${roomId}`);
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
    <SearchResults/>
    <Button style={{ marginLeft: '1rem',marginBottom:'1rem' ,marginTop:'1rem'}} variant="contained" color="primary"><Link href="/floor-plan" style={{textDecoration:'none',color:'white'}}>Add Room</Link></Button>
    <Grid container spacing={2}>
      {rooms?.map((room: Room, index: number) => (
        <Grid item xs={12} xl={3} md={3} key={index}>
          <Card sx={{ maxWidth: 345 }} onClick={() => handleViewRoom(room?.id)}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/Image/officeRoom.jpg"
                alt="Room image"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{color:'black'}}>
                  {room.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{color:'black'}}>
                  Total Seat capacity: {room.row * room.column}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{color:'black'}}>
                  Vacant Seat: {room.row * room.column - room.occupiedCells.length}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
    </>
  );
};

export default Rooms;
