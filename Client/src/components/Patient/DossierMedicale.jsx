import { Box, Button, Typography ,useMediaQuery} from "@mui/material"
import { Flex, Modal, Result } from "antd"
import Chart from "components/Chart"
import FlexBetween from "components/FlexBetween"
import WidgetWrapper from "components/WidgetWrapper"
import { useState } from "react"

const DossierMedicale=(userId,token)=>
    {  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
const[Voir,setVoir]=useState(false);
const[Close,SetClose]=useState(false);
        const data = [
        { name: 'Jan', value: 100 },
        { name: 'Feb', value: 90 },
        { name: 'Mar', value: 120 },
        { name: 'Apr', value: 70 },
        { name: 'May', value: 133 },
      ];

const handleopen=()=>
    {
setVoir(true)

    }
    const handleClose=()=>
        {
    setVoir(true)
    
        }
return(
    <Box
    flexBasis={isNonMobileScreens ? "80%" : undefined}
    mt={isNonMobileScreens ? undefined : "2rem"}
  >
    <Button>Ajouter une analyse</Button>
    <WidgetWrapper style={{width:"350px", height:"200px", position:"relative", top:5}}>
      
        <FlexBetween gap={"1rem" }>
<WidgetWrapper style={{width:"80px", height:"80px", backgroundColor:"#6DE3C6",} }>
    <Typography style={{color:"white", fontWeight:"500", fontSize:"18px", textAlign:"center"} }>27</Typography>
    <Typography style={{color:"white", fontWeight:"500", fontSize:"18px", textAlign:"center"} }>Avril</Typography>
</WidgetWrapper>

<Typography style={{color:"black", fontWeight:"500", fontSize:"18px", textAlign:"center"} }>Analyes de NFS</Typography>


</FlexBetween>
<Typography style={{color:"black", fontWeight:"200", fontSize:"12px", textAlign:"left" , position:"relative",bottom:"30px", left:"90px"} }>Ajouté par laboratoire Ben Amor</Typography>
<FlexBetween>
<Button  style={{position:"relative" , left:"60px"}}>Modifier</Button>
<Button onClick={handleopen} style={{position:"relative" , left:"60px"}}>Voir</Button>
<Button style={{position:"relative" , left:"60px"}}>Supprimer</Button>
</FlexBetween>
    </WidgetWrapper>
    <Modal
    open={Voir}
    onOk={()=>setVoir(false)}
    onCancel={()=>setVoir(false)}
    
    >


    </Modal>
   </Box> 
   
)
    }
    export default DossierMedicale