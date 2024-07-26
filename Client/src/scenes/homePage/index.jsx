import React, { useEffect, useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import LeftWidgetHome from "scenes/widgets/LeftWidgetHome";
import MyPostWidget from "scenes/widgets/Posts/MyPostWidget";
import PostsWidget from "scenes/widgets/Posts/PostsWidget";
import RightWidget from "scenes/widgets/RightWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import ActiveUser from "scenes/widgets/Activeuser";
import Laboratoire from "scenes/widgets/Laboratoire/Laboratoire";
import Pharmacie from "components/Pharmacie";
import LaboratoryList from "components/Patient/LaboratoryList";
import Doctors from "components/Patient/Doctors";
import Appointement from "components/Appointement";
import DossierMedicale from "components/Patient/DossierMedicale";
import Admin from "scenes/Admin/Admin";
import MesRendezVous from "scenes/widgets/Medecin/MesRendezVous";
import MesPatients from "scenes/widgets/Medecin/MesPatients";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state) => state.user);
  const [isLeftWidgetClicked, setIsLeftWidgetClicked] = useState(false);
  const selectedItem = useSelector((state) => state.selectedItem); // Adjust the path according to your slice name
  const token = useSelector((state) => state.token);

  useEffect(() => {
    // Add any side effects you need when user changes
  }, [user]);

  if (user?.isAdmin) {
    return (
      <Box>
        <Navbar />
        <Admin userId={user._id} token={token} />
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      {user.role!== "laboratoire" && (
        <Box
          width="100%"
          padding="1rem 1%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="1rem"
          justifyContent="space-between"
        >
          {user.role !== "laboratoire" && (
            <Box
              flexBasis={isNonMobileScreens ? "30%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              <LeftWidgetHome
                userId={user._id}
                picturePath={user.picturePath}
                boxShadow={1}
              />
              {/* Move ActiveUser here */}
              <ActiveUser />
            </Box>
          )}

          <Box
            flexBasis={isNonMobileScreens ? "70%" : undefined}
            mt={isNonMobileScreens ? undefined : "5rem"}
          >
            {selectedItem === "Articles" && user.role === "medecin" && (
              <MyPostWidget picturePath={user.picturePath} />
            )}
            {selectedItem === "Articles" && (
              <PostsWidget userId={user._id} token={token} isProfile={false} />
            )}
            {selectedItem === "Pharmacie" && <Pharmacie userId={user._id} />}
            {selectedItem === "Laboratoire" && (
              <LaboratoryList userId={user._id} token={token} />
            )}
            {selectedItem === "Medecins" && (
              <Doctors userId={user._id} token={token} />
            )}
            {selectedItem === "Rendezvous" && (
              <Appointement userId={user._id} token={token} />
            )}
            {selectedItem === "Dossier medicale" && (
              <DossierMedicale userId={user._id} token={token} />
            )}
            {selectedItem === 'MesPatient' && <MesPatients userId={user} />}
            {selectedItem === 'MesRendezVous' && <MesRendezVous userId={user} />}
          </Box>

          <RightWidget />
        </Box>
      )}
      {user?.role === "laboratoire" && (
        <Laboratoire userId={user._id} token={token} />
      )}
    </Box>
  );
};

export default HomePage;
