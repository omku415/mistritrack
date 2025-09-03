import axios from "axios";

export const login = async (email, password, role) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    { email, password, role },
    { withCredentials: true } // important for cookie
  );
  return response.data;
};
