// api.js
export const getMedecins = async (token) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${apiUrl}/users/medecins`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data.filter(Boolean);
    } catch (error) {
      console.error("Error fetching medecin data:", error);
      throw error;
    }
  };
  
  export const getUser = async (userId, token) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };
  
  export const getMedecinUser = async (userId, token) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${apiUrl}/users/${userId}/medecin`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching medecin data:", error);
      throw error;
    }
  };
  export const handleAppointment = async ({ apiUrl, selectedLabId, token, userId }) => {
    try {
      const response = await fetch(`${apiUrl}/users/laboratoires/${selectedLabId}/appointment`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const updatedLab = await response.json();
      return updatedLab;
    } catch (error) {
      console.error("Error handling appointment:", error);
      throw error;
    }
  };
  export const confirmAppointment = async (laboratoireId, appointmentId, token) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/appointement/${laboratoireId}/appointments/${appointmentId}/confirm`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  };
  
  export const deleteAppointment = async (laboratoireId, appointmentId, token) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/appointement/${laboratoireId}/appointments/${appointmentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  };
  