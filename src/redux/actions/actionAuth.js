import axios from "axios";
const { VITE_BACK_URL } = import.meta.env;

export const authenticateUser = () => async () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    console.error("No token found in sessionStorage");
    return { success: false };
  }

  try {
    const response = await axios.get(`${VITE_BACK_URL}/authenticate`, {
      headers: { Authorization: token },
    });
    const sessionUserId = response.data.user.userId;

    console.log("Token verification successful:", sessionUserId);
    sessionStorage.setItem("userId", sessionUserId);

    return { success: true };
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return { success: false };
  }
};

// editar para que reconozca el type
