import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const Message = ({ message, index }) => {
  const boxRef = useRef(null); // Référence à la boîte
  const [displayStyle, setDisplayStyle] = useState('inline'); // Style d'affichage de la typographie

  useEffect(() => {
    const handleResize = () => {
      const boxWidth = boxRef.current.offsetWidth; // Largeur de la boîte
      const typographyWidth = boxRef.current.firstChild.offsetWidth; // Largeur de la typographie

      if (typographyWidth > boxWidth) {
        setDisplayStyle('-ms-flexbox');
      } else {
        setDisplayStyle('-ms-flexbox');
      }
    };

    handleResize(); // Appeler la fonction une fois pour ajuster le style d'affichage initialement
    window.addEventListener('resize', handleResize); // Écouter les redimensionnements de fenêtre

    return () => {
      window.removeEventListener('resize', handleResize); // Nettoyer le gestionnaire d'événements lors du démontage du composant
    };
  }, []);

  return (
    <Box ref={boxRef} key={index} textAlign={'left'} mb={3} position={'relative'} left={message.sender === 'You' ? 750 : 0} width="30%">
      <Typography
        key={index}
        textAlign={'left'}
        mb={3}
        variant="body1"
        style={{
          backgroundColor: message.sender === 'You' ? '#DCF8C6' : '#F3F3F3',
          borderRadius: 8,
          padding: 8,
          lineHeight: '1.8',
          display:displayStyle, // Style d'affichage conditionnel
        }}
      >
        {message.text}
      </Typography>
    </Box>
  );
};

export default Message;
