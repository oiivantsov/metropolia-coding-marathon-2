// src/customHooks/useSignup
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const signupUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const newUser = {
      name,
      phone_number: phoneNumber,
      gender,
      date_of_birth: dateOfBirth,
      membership_status: membershipStatus,
      email,
      password,
    };

    try {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('email', data.email);
        localStorage.setItem('token', data.token);
        toast.success('Signup Successful');
        navigate('/');  
      } else {
        toast.error(data.message || 'Signup Failed');
      }
    } catch (error) {
      toast.error('Signup Failed. Please try again.');
      console.error('Error during signup:', error);
    }
  };

  return {
    name, setName,
    phoneNumber, setPhoneNumber,
    gender, setGender,
    dateOfBirth, setDateOfBirth,
    membershipStatus, setMembershipStatus,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    signupUser
  };
};
