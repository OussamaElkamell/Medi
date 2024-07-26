import { Box, Typography } from "@mui/material"
import WidgetWrapper from "./WidgetWrapper"
import FlexBetween from "./FlexBetween"

const Pharmacie=(userId)=>{
return (
    
    <WidgetWrapper>
   
          <FlexBetween gap="1rem" mb="1.5rem">
      
            <FlexBetween gap="1rem">
          
            <img src="../assets/pharmacie.png" alt="Pharmacie" style={{ width: '40px', height: '40px' }} />

              <Box>
              <a  href="/Prescription">Dardouri Racha
                <Typography color={"Black"} fontWeight="500">
           
                </Typography>
                <Typography color={"Black"} fontWeight="20" fontSize={8}>
               Pharmacie
                </Typography>
                </a>
              </Box>
        
            </FlexBetween>
         
          </FlexBetween>
        
    </WidgetWrapper>
)

}
export default Pharmacie