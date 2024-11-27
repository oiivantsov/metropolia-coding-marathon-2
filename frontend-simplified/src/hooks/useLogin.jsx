import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);
        toast.success("Login Successful");
        navigate("/"); 
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Error during login. Please try again.");
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    loginUser,
  };
};
