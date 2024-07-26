import { Box } from "@mui/material"
import ActiveUser from "./Activeuser"
import AdvertWidget from "./AdvertWidget"

const RightWidget=()=>
    {
        return(
            <Box flexBasis="30%"  >
            <Box position="sticky" top={90} >
              <AdvertWidget />
            </Box>
      
            <Box position="sticky" top={350} right="1"  >
              <ActiveUser />
            </Box>
          </Box>
        )
    }
    export default RightWidget