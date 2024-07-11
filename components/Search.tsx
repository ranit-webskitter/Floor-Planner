
// import React, { useEffect, useState } from 'react'
// import { CellData, EmployeeAssignment, Room } from '../typescript/types';
// import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
// import Box from 'next-auth/providers/box';
// import { useQuery } from '@tanstack/react-query';
// import { fetchRooms } from '../API/Function/Room.API';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import { fetchEmployeeAssignments } from '../API/Function/EmaployeeAssignment.API';

// interface SearchResultsProps {
//     searchResults: CellData[];
// }


// const SearchResults: React.FC<SearchResultsProps> = () => {
//     const [employeeAssignments, setEmployeeAssignments] = useState<EmployeeAssignment[]>([]);
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [searchResults, setSearchResults] = useState<CellData[]>([]);
//     const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
//     const [highlightedSeat, setHighlightedSeat] = useState<number | null>(null);
//     const { data: rooms, isLoading, error } = useQuery({
//         queryKey: ['rooms'],
//         queryFn: fetchRooms
//     });
//     useEffect(() => {
//         const fetchEmployeeAssignmentsData = async () => {
//             const data = await fetchEmployeeAssignments();
//             setEmployeeAssignments(data);
//         };
//         fetchEmployeeAssignmentsData();
//     }, []);
//     console.log(employeeAssignments)
//     const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const query = e.target.value.toLowerCase();
//         setSearchQuery(query);
//         if (query === '') {
//             setSearchResults([]);
//             return;
//         }
//         const results: any = [];
//         for (const room of rooms || []) {
//             const roomResults = Object.values(room.cellData).filter(
//                 (cell: any) => cell.employeeName?.toLowerCase().includes(query)
//             );
//             if (roomResults.length > 0) {
//                 results.push(...roomResults?.map(result => ({
//                     ...result,
//                     roomNumber: room.name,
//                 })));
//             }
//         }
//         setSearchResults(results);
//     };
//     const handleViewEmployee = (employee: EmployeeAssignment) => {
//         setCurrentRoom(rooms.find(room => room.name === employee.roomNumber) || null);
//         setHighlightedSeat(Number(employee.seatNumber) - 1);
//     };
//     const handleCloseViewDialog = () => {
//         setCurrentRoom(null);
//         setHighlightedSeat(null);
//     };

//     const calculateTotalCells = (room: Room) => {
//         return room.row * room.column;
//     };

//     console.log('search result', searchResults)
//     console.log('employeeAssignments', employeeAssignments)
//     return (
//         <>
//             <TextField
//                 label="Search Employee Name"
//                 margin="normal"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 style={{ marginLeft: '60%' }}
//             />

//             {searchResults?.length > 0 && (
//                 <TableContainer component={Paper} style={{ marginTop: '20px' }}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Employee Name</TableCell>
//                                 <TableCell>Team Name</TableCell>
//                                 <TableCell>Room Number</TableCell>
//                                 <TableCell>Seat Number</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {searchResults.map((result, index) => (
//                                 <>
//                                     <TableRow key={index}>
//                                         <TableCell>{result.employeeName}</TableCell>
//                                         <TableCell>{result.teamName}</TableCell>
//                                         <TableCell>{result.roomNumber}</TableCell>
//                                         <TableCell>{result.seatNumber}</TableCell>

//                                         <Button
//                                             onClick={() => handleViewEmployee(result)}
//                                             variant="contained"
//                                             color="primary"
//                                         >
//                                             <VisibilityIcon />
//                                         </Button>
//                                     </TableRow>
//                                 </>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//             {currentRoom && highlightedSeat !== null && (
//                 <Dialog open={true} onClose={handleCloseViewDialog}>
//                     <DialogTitle>Employee Position</DialogTitle>
//                     <DialogContent>
//                         <h3>Room: {currentRoom.name}</h3>
//                         <Grid container spacing={1}>
//                             {Array.from({ length: calculateTotalCells(currentRoom) }, (_, index) => (
//                                 <Grid item xs={4} xl={12 / currentRoom.column} key={index}>
//                                     <Paper
//                                         style={{
//                                             width: '100%',
//                                             height: '50px',
//                                             textAlign: 'center',
//                                             lineHeight: '50px',
//                                             cursor: 'pointer',
//                                             backgroundColor: currentRoom.occupiedCells.includes(index) ? (index === highlightedSeat ? 'yellow' : 'red') : 'white',
//                                             boxShadow: currentRoom.occupiedCells.includes(index) ? (index === highlightedSeat ? 'yellow' : 'red') : 'none',
//                                             color: currentRoom.occupiedCells.includes(index) ? (index === highlightedSeat ? 'black' : 'black') : 'white',
//                                         }}
//                                     >
//                                         {index + 1}
//                                     </Paper>
//                                 </Grid>
//                             ))}
//                         </Grid>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={handleCloseViewDialog} color="primary">
//                             Close
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             )}
//         </>

//     )
// }

// export default SearchResults



import React, { useEffect, useState } from 'react'
import { CellData, EmployeeAssignment, Room } from '../typescript/types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import Box from 'next-auth/providers/box';
import { useQuery } from '@tanstack/react-query';
import { fetchRooms } from '../API/Function/Room.API';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fetchEmployeeAssignments } from '../API/Function/EmaployeeAssignment.API';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';





const SearchResults: React.FC = () => {
    const [employeeAssignments, setEmployeeAssignments] = useState<EmployeeAssignment[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<CellData[]>([]);
    const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
    const [highlightedSeat, setHighlightedSeat] = useState<number | null>(null);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false)
    const { data: rooms, isLoading, error } = useQuery({
        queryKey: ['rooms'],
        queryFn: fetchRooms
    });
    useEffect(() => {
        const fetchEmployeeAssignmentsData = async () => {
            const data = await fetchEmployeeAssignments();
            setEmployeeAssignments(data);
        };
        fetchEmployeeAssignmentsData();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === '') {
            setSearchResults([]);
            return;
        }
        const results: any = [];
        for (const room of rooms || []) {
            const roomResults = Object.values(room.cellData).filter(
                (cell: any) => cell?.employeeName?.toLowerCase().includes(query)
            );
            if (roomResults.length > 0) {
                results.push(...roomResults?.map((result: any) => ({
                    ...result,
                    roomNumber: room.name,
                })));
            }
        }
        setSearchResults(results);
    };

    const handleCloseSearchDialog = () => {
        setSearchDialogOpen(false)
    }

    const handleViewEmployee = (employee: CellData) => {
        setCurrentRoom(rooms?.find(room => room.name === employee?.roomNumber) || null);
        setHighlightedSeat(Number(employee?.seatNumber) - 1);
    };
    const handleCloseViewDialog = () => {
        setCurrentRoom(null);
        setHighlightedSeat(null);
    };

    const calculateTotalCells = (room: Room) => {
        return room.row * room.column;
    };

    return (
        <>
            <Button style={{ marginLeft: '75%', marginBottom: '1rem', marginTop: '1rem', borderRadius: '5rem' }} onClick={() => setSearchDialogOpen(true)} variant="outlined" color="primary"><SearchIcon />Search</Button>

            <Dialog open={searchDialogOpen} maxWidth="md" fullWidth onClose={handleCloseSearchDialog} sx={{
                "& .MuiDialog-container": {
                    alignItems: "flex-start",

                },
                "& .ms-Dialog-main": {


                    height: "600px"
                }

            }}
                PaperProps={{ sx: { mt: "50px" } }} >
                <TextField
                    label="Search Employee Name"
                    margin="normal"
                    autoFocus
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{ margin: '2rem', color: 'black' }}

                />
                <DialogActions>
                    <Button onClick={handleCloseSearchDialog}>Cancel</Button>

                </DialogActions>
                {/* {searchResults?.length<1 && <h4 style={{display:'flex',justifyContent:'center'}}>No data found !!</h4>} */}
                {searchResults?.length > 0 && (
                    <TableContainer component={Paper}  >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: 'black', fontSize: '15px' }}>Employee Name</TableCell>
                                    <TableCell style={{ color: 'black', fontSize: '15px' }}>Team Name</TableCell>
                                    <TableCell style={{ color: 'black', fontSize: '15px' }}>Room Number</TableCell>
                                    <TableCell style={{ color: 'black', fontSize: '15px' }}>Seat Number</TableCell>
                                    <TableCell style={{ color: 'black', fontSize: '15px' }}>View</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {searchResults.map((result, index) => (
                                    <>
                                        <TableRow key={index} >
                                            <TableCell style={{ color: 'black', fontSize: '15px' }}>{result.employeeName}</TableCell>
                                            <TableCell style={{ color: 'black', fontSize: '15px' }}>{result.teamName}</TableCell>
                                            <TableCell style={{ color: 'black', fontSize: '15px' }}>{result.roomNumber}</TableCell>
                                            <TableCell style={{ color: 'black', fontSize: '15px' }}>{result.seatNumber}</TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleViewEmployee(result)}
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    <VisibilityIcon />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

            </Dialog>

            {currentRoom && highlightedSeat !== null && (
                <Dialog open={true} onClose={handleCloseViewDialog} maxWidth="xs" fullWidth>
                    <DialogTitle>Employee Position</DialogTitle>
                    <DialogContent>
                        <h3 style={{ color: 'black' }}> {currentRoom.name}</h3>
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
                                            backgroundColor: currentRoom.occupiedCells.includes(index) ? (index === highlightedSeat ? 'yellow' : '#ff5630') : 'white',
                                            boxShadow: currentRoom.occupiedCells.includes(index) ? (index === highlightedSeat ? 'yellow' : 'red') : 'none',
                                            color: currentRoom.occupiedCells.includes(index) ? (index === highlightedSeat ? 'black' : 'black') : 'white',
                                        }}
                                    >
                                        {currentRoom.occupiedCells.includes(index) && (index !== highlightedSeat) && index + 1}
                                        {currentRoom.occupiedCells.includes(index) && (index === highlightedSeat) && <PersonIcon />}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                        <h5 style={{ color: 'red', fontSize: '15px' }}>Info: </h5>
                        <p style={{ color: 'red', fontSize: '12px' }}>Yellow Color: Your Seat</p>
                        <p style={{ color: 'red', fontSize: '12px' }}>Red Color: Other Occupied Seat</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseViewDialog} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>

    )
}

export default SearchResults

