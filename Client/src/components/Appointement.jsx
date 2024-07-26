import { useSelector } from "react-redux"

import FlexBetween from "./FlexBetween"

import UserImage from "./UserImage"
import WidgetWrapper from "./WidgetWrapper"
import { Modal, Result } from "antd"
import { useState } from "react"
import { SmileOutlined } from "@ant-design/icons"
import UserWidget from "scenes/widgets/UserWidget"

const { Box, Button, Typography } = require("@mui/material")

const { useParams } = require("react-router-dom")

const Appointement = () => {
  const [annuler, setAnnuler] = useState(false)
  const friends = useSelector((state) => state.user.friends);
  console.log("friends", friends)

  return (
    <>


     
      {

        friends && friends.map((Friend) => (


          <WidgetWrapper key={Friend._id} gap={"1.5rem"} mb={"1rem"} height={"250px"} width={"350px"}>
            <FlexBetween  >
              <FlexBetween gap="1rem" >
     
                <UserWidget userId={Friend._id}/>

                <Box>


        


                </Box>



              </FlexBetween>
          
            </FlexBetween>
            <Typography position="relative" marginTop="5px" marginRight="10px" color={"black"} fontWeight="500" fontSize={12} textAlign={"left"} marginLeft={"80px"}>Date de votre rendez-vous</Typography>  
            <Typography position="relative" marginTop="5px" marginRight="20px" color={"black"} fontWeight="300" fontSize={12} textAlign={"center"} marginLeft={"40px"}>Le 12/05/2024 a 11h:00</Typography>  
            <Button style={{ marginLeft: "110px", marginTop: "20px" }} onClick={() => setAnnuler(true)} >Annuler</Button>
          </WidgetWrapper>

        ))
      }
      <Modal
        open={annuler}
        onOk={() => setAnnuler(false)}
        onCancel={() => setAnnuler(false)}
        okText="Confirmer"
        cancelText="Annuler"
      >
        <Result
          icon={<SmileOutlined />}

          title="Rendez-Vous Annuler"
        ></Result>
      </Modal>
    </>
  )
}
export default Appointement