import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { CellData } from '../typescript/types';

interface SearchResultsProps {
  searchResults: CellData[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchResults }) => {
  return (
    <Box mt={2}>
      {searchResults?.length > 0 && (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee Name</TableCell>
                <TableCell>Team Name</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Seat Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {searchResults.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{result.employeeName}</TableCell>
                  <TableCell>{result.teamName}</TableCell>
                  <TableCell>{result.roomNumber}</TableCell>
                  <TableCell>{result.seatNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default SearchResults;




