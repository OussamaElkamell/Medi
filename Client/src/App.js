import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import ChatWidget from "scenes/Chat/Chat";

import MedecinDashboard from "scenes/widgets/Medecin/Ordonnance";
import AntDesignComponent from "scenes/widgets/Medecin/Ordonnance";
import LaboratoryInterface from "scenes/widgets/Laboratoire/DashboardLab";
import Laboratoire from "components/Pharmacie";
import LabDashboard from "scenes/widgets/Laboratoire/DashboardLab";
import LeftMenuWidget from "scenes/widgets/Laboratoire/Laboratoire";
import Pharmacie from "components/Pharmacie";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
const userId=null
const FriendId=null
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
  
      
          <Routes>
            <Route path="/" element={isAuth ? <Navigate to="/home" />: <LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
             <Route path="/chat" element={<ChatWidget/>} />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage userId={userId} /> : <Navigate to="/" />}
            />
               <Route
              path="/chat"
              element={isAuth ? <ChatWidget /> : <Navigate to="/" />}
            />
            <Route
              path="/FriendProfile/:userId"
              element={isAuth ? <ProfilePage userId={userId} FriendId={FriendId} /> : <Navigate to="/" />}
            />

              <Route
              path="/s"
              element={ <AntDesignComponent/>}
            />
              <Route
              path="/LaboratoryInterface"
              element={ <LeftMenuWidget/>}
            />
             <Route
              path="/Prescription"
              element={ <Pharmacie/>}
            />

          </Routes>
         
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
