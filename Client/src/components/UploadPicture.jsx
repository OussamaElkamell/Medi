
import Dropzone from "react-dropzone"
import React from 'react';
import { Box, Button, TextField, Typography , useTheme} from "@mui/material";

import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const UploadPicture=()=>
    {   /*
        return(
         
        <Box
        gridColumn="span 4"
        border={`1px solid ${palette.neutral.medium}`}
        borderRadius="5px"
        p="1rem"
      >
      <Dropzone
acceptedFiles={['image/jpeg', 'image/jpg', 'image/png']}
multiple={false}
onDrop={(acceptedFiles) =>
setFieldValue('picture', acceptedFiles[0])
}
>
{({ getRootProps, getInputProps }) => (
<Box
{...getRootProps()}
border={`2px dashed ${palette.primary.main}`}
p="1rem"
sx={{ '&:hover': { cursor: 'pointer' } }}
>
<input {...getInputProps()} />
{!values.picture ? (
  <p>Ajouter une photo ici</p>
) : (
  <FlexBetween>
    <Typography>{values.picture.name}</Typography>
    <EditOutlinedIcon />
  </FlexBetween>
)}
</Box>
)}
</Dropzone>

        
      </Box>
        )
         */
    }
   
    export default  UploadPicture