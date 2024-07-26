import React from 'react';
import { Box, Typography } from '@mui/material';

const ChattedUsers = ({ users }) => {
  return (
    <Box p={2}  overflow="auto" flexGrow={1}  display="flex" flexDirection="column" >
      <Typography variant="h6" gutterBottom>
        Users You've Chatted With
      </Typography>
      <Box>
        {users.map((user, index) => (
          <Box key={index} mb={1}>
            <Typography variant="body1">{user.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ChattedUsers;
