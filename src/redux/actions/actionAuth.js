import axios from "axios";
const { VITE_BACK_URL } = import.meta.env;

export const authenticateUser = () => async () => {
     const token = sessionStorage.getItem("token");
     try {
          if (!token) throw new Error("No token found in sessionStorage");
          const response = await axios.get(`${VITE_BACK_URL}/authenticate`, {
               headers: { Authorization: token },
          });
          const sessionUserId = response.data.user.userId;
          sessionStorage.setItem("userId", sessionUserId);
          return { success: true };
     } catch (error) {
          console.error("Token verification failed:", error.message);
          return { success: false };
     }
};
