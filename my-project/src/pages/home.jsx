import React, { useState, useContext} from 'react';
import image from '../assets/pexels-realtoughcandy-11035546.jpg';
import { API } from '../service/api';
import { DataContext } from '../context/DataProvider';

import { useNavigate } from 'react-router-dom';



const signupInitialValues = {
  name: '',
  username: '',
  password: '',
};

const loginInitialValues = { username: '', password: '' };

const Home = ({isUserAuthenticated}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [signup, setSignup] = useState(signupInitialValues);
  const [login, setLogin] = useState(loginInitialValues);
  const [error, setError] = useState('');
  const { setAccount } = useContext(DataContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(''); // Clear error on toggle
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const signupUser = async () => {
    try {
      let response = await API.userSignup(signup);
      if (response.isSuccess) {
        setError('');
        setSignup(signupInitialValues);
        setIsLogin(true); // Switch to login after successful signup
      } else {
        setError('Signup failed. Try again.');
      }
      console.log('Signup successful:', response);
    } catch (error) {
      setError('Signup failed. Please check your details.');
      console.error('Signup error:', error);
    }
  };

  const loginUser = async () => {
    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
        setError('');
        sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}` );
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        setAccount({ username: response.data.username, name: response.data.name });
       isUserAuthenticated(true);
        navigate('/');
        setLogin(loginInitialValues);
        console.log('Login successful:', response);
      } else {
        setError('Login failed. Please check your details.');
      }
    } catch (error) {
      setError('Login error. Please try again.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200 px-4">
      <div className="flex flex-col items-center border border-amber-950 shadow-black shadow-2xl p-6 bg-white rounded-lg w-full max-w-md">
        <img src={image} alt="home" className="mb-4 w-32 h-32 rounded-full" />

        {isLogin ? (
          <>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              value={login.username}
              onChange={onValueChange}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="mb-2 p-2 border border-gray-300 rounded w-full"
              value={login.password}
              onChange={onValueChange}
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              className="mb-2 p-2 w-full bg-blue-500 text-white rounded"
              onClick={loginUser}
            >
              Login
            </button>
            <button className="p-2 w-full bg-gray-500 text-white rounded" onClick={toggleForm}>
              Create Account
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={signup.name}
              onChange={onInputChange}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              value={signup.username}
              onChange={onInputChange}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={signup.password}
              onChange={onInputChange}
              className="mb-2 p-2 border border-gray-300 rounded w-full"
            />
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              className="mb-2 p-2 w-full bg-blue-500 text-white rounded"
              onClick={signupUser}
            >
              Register
            </button>
            <button className="p-2 w-full bg-gray-500 text-white rounded" onClick={toggleForm}>
              Already a User
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
