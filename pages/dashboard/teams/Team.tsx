import React from 'react';
import { Grid, Card, CardContent, CardMedia, CardActionArea, Typography, TextField, Button, Container, Box } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTeams, createTeam, deleteTeam } from '../../../API/Function/Team.API';
import { useForm } from 'react-hook-form';

const Teams: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: teams } = useQuery({ queryKey: ['teams'], queryFn: fetchTeams });
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ name: string }>();

  const createTeamMutation = useMutation({
    mutationFn: createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['teams']});
    }
  });

  const onTeamSubmit = (data: { name: string }) => {
    createTeamMutation.mutate(data);
    reset();
  };

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8} xl={8}>
            <Grid container spacing={2}>
              {teams?.map(team => (
                <Grid item xs={12} md={6}  key={team.id}>
                  <Card sx={{ maxWidth: 300 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image="/Image/team.jpg"
                        alt="Team image"
                        style={{ objectFit: 'fill' }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" style={{color:'black'}}>
                          {team.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} xl={4} style={{ marginTop: '3rem' }}>
            <form onSubmit={handleSubmit(onTeamSubmit)}>
              <TextField {...register('name',{minLength:3})} label="Team Name" fullWidth margin="normal" required />
              {errors.name && (
                <p style={{color:'red'}}> Team Name must be of minimum length 3</p>
              )}
              <Button type="submit" variant="contained" color="primary">Save</Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Teams;
