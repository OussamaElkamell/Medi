import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, IconButton, useTheme } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Message from 'components/message';
import { useSelector } from 'react-redux';
import FriendListWidget from 'scenes/widgets/Profile/FriendListWidget';

const ChatWidget = () => {
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [newMessage, setNewMessage] = useState(''); // State to store new message being typed
  const [currentSender, setCurrentSender] = useState('You'); // State to track current message sender
  const { _id } = useSelector((state) => state.user);
  const [selectedFriendId, setSelectedFriendId] = useState(null); // State to track the ID of the selected friend

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { sender: currentSender, text: newMessage }]);
      setNewMessage('');
    }
  };

  // Function to switch message sender
  const handleSwitchSender = () => {
    setCurrentSender(prevSender => prevSender === 'You' ? 'Someone Else' : 'You');
  };

  // Function to handle receiving a message from a friend in FriendListWidget
  const handleReceiveMessage = (friendId, message) => {
    // Check if the message is from the selected friend
    if (friendId === selectedFriendId) {
      setMessages([...messages, { sender: 'Friend', text: message }]);
    }
  };

  return (
    <Box>
      {/* Chat Widget */}
      <Box
        height="100vh"
        width="150vh"
        display="flex"
        flexDirection="column"
        position="absolute"
        left={350}
        backgroundColor="white"
      >
        {/* Chat Header */}
        <Box p={2} borderBottom="1px solid #ccc" display="flex" alignItems="center">
          <IconButton edge="start" color="inherit" aria-label="back">
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="h2" flexGrow={1}>
            Chat Title
          </Typography>
          <Button variant="contained" color="primary" onClick={handleSwitchSender}>
            Switch Sender
          </Button>
        </Box>

        {/* Chat Messages */}
        <Box p={2} overflow="auto" flexGrow={1}>
          {messages.map((message, index) => (
            <Message key={index} message={message} index={index} />
          ))}
        </Box>

        {/* Input Field */}
        <Box p={2} display="flex" alignItems="center">
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            variant="outlined"
            label="Type a message"
            fullWidth
            autoFocus
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage} disabled={!newMessage.trim()}>
            Send
          </Button>
        </Box>
      </Box>

      {/* Chatted Users */}
      <Box p={2} overflow="auto" flexGrow={1} display="flex" flexDirection="column">
        <Typography variant="h6" gutterBottom>
          Users You've Chatted With
        </Typography>
        {/* Render each friend */}
        <FriendListWidget userId={_id} onSelectFriend={setSelectedFriendId} />
      </Box>
    </Box>
  );
};

export default ChatWidget;
