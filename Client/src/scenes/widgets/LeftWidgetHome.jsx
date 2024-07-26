import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Divider, useTheme, useMediaQuery } from "@mui/material";
import { Menu } from "antd";
import UserWidget from "./UserWidget";
import MesPatient from "./Medecin/MesPatients";
import MesRendezVous from "./Medecin/MesRendezVous";
import Pharmacie from "components/Pharmacie";
import WidgetWrapper from "components/WidgetWrapper";
import { selectItem } from "state";

const LeftWidgetHome = ({ userId, picturePath, onClick }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [selectedMenuItem, setSelectedMenuItem] = useState("Articles");

  const handleMenuClick = (menuItem) => {
    console.log("menuItem",menuItem)
    setSelectedMenuItem(menuItem.key);
    dispatch(selectItem(menuItem.key)); // Dispatch the action with the selected menu item key
  };
useEffect(()=>{dispatch(selectItem("Articles"))}
,[])
  return (
    <WidgetWrapper position={"sticky"} top={100}>
      <UserWidget userId={user._id} onClick={() => navigate(`/profile/${userId}`)} />
      
      {user.role === "medecin" && (
        <Box p="1rem 0">
          <Divider />
          <div style={{ display: 'flex', gap: '20px' }}>
        
              <Menu
                style={{ width: '100%' }}
                defaultSelectedKeys={['Articles']}
                selectedKeys={[selectedMenuItem]}
                mode="inline"
                onClick={handleMenuClick}
              >
                <Menu.Item key="Articles" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="../assets/Publication.png" alt="Articles" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
                  Articles de santé
                </Menu.Item>
                <Menu.Item key="MesPatient" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="../assets/patient.jpg" alt="Articles" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
                  Mes patient</Menu.Item>
                <Menu.Item key="MesRendezVous" style={{ display: 'flex', alignItems: 'center' }}>
                <img src="../assets/rendez-vous.png" alt="Articles" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
                  Mes rendez Vous</Menu.Item>
              </Menu>
            </div>
         
        </Box>
      )}

      {user.role === "patient" && (
        <Box p="1rem 0">
          <Divider />
       
            <div style={{ width: '300px', marginTop: '20px' }}>
              <Menu
                style={{ width: '100%' }}
                defaultSelectedKeys={['Articles']}
                selectedKeys={[selectedMenuItem]}
                mode="inline"
                onClick={handleMenuClick}
              >
                <Menu.Item key="Articles" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="../assets/Publication.png" alt="Articles" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
                  Articles de santé
                </Menu.Item>
                <Menu.Item key="Medecins" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="../assets/medical.png" alt="Médecins" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
                  Médecins
                </Menu.Item>
                
                <Menu.Item key="Dossier medicale" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="../assets/Dossier medicale.jpg" alt="Dossier medicale" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
                 Mon dossier medicale
                </Menu.Item>
                <Menu.Item key="Rendezvous" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="../assets/rendez-vous.png" alt="Rendez-vous" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
                  Mes rendez-vous
                </Menu.Item>
               
               
                <Menu.Item key="Laboratoire" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="../assets/laboratoire.png" alt="Laboratoire" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
                  Laboratoires
                </Menu.Item>
                <Menu.Item key="Questionmedicale" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src="../assets/question.png" alt="Question médicale" style={{ width: '25px', height: '25px', marginRight: '5px' }} />
                  Question médicale
                </Menu.Item>
              </Menu>
              
            </div>
      
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default LeftWidgetHome;
