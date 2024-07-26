// authSlice.js

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  mode: "light",
  user: {
    medecin: null, // Initialize medecin to null
    laboratoires:[],
    laboratoire:null
  },
  token: null,
  patient: null,
  posts: [],
  friends: [],
  chatMessages: [],
  doctors: [], // Add doctors array to the initial state
  isLoading: true, // Add isLoading state for doctors
  error: null, // Add error state for doctors
  selectedItem: null, // Add selectedItem to the state
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.user.medecin = action.payload.medecin;
      state.user.labortoire=action.payload.labortoire
      state.patient = action.payload.patient;
      state.isLoading = "false";
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      state.user.friends = action.payload.friends;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },
    setMedecin: (state, action) => {
      state.user.medecin = action.payload.medecin;
    },
    setMedecinInfo: (state, action) => {
      state.user.medecin.specialite = action.payload.medecin.specialite;
      state.user.medecin.adresse = action.payload.medecin.adresse;
      state.user.medecin.gouvernorat = action.payload.medecin.gouvernorat;
    },
    setLaboratoire: (state, action) => {
      state.laboratoires = action.payload.laboratoires;
    },
    setPatient: (state, action) => {
      if (state.user && state.user.role === "patient") {
        state.user.patient = action.payload.patientInfo;
      } else {
        console.error("user is not a patient :(");
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // Add the selectItem action
    selectItem: (state, action) => {
      state.selectedItem = action.payload;
      
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  addChatMessage,
  setMedecinInfo,
  setPatientInfo,
  setMedecin,
  setLoading,
  setError,
  setLaboratoire,
  selectItem, // Export the selectItem action
} = authSlice.actions;

export default authSlice.reducer;
