import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/pageStyles/Login.css';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('https://volleyback.onrender.com/api/login', {
      email,
      password,
    });

    const { token } = res.data;

    localStorage.setItem('token', token);

    navigate('/admin/dashboard');
    

  } catch (err) {
    console.error(err);
    alert("Login failed"); // сообщение об ошибке
  }
};


  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1 className="login-title">Se connecter</h1>
        <input
          type="email"
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder='Mot de passe'
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Se connecter</button>
      </form>
      
    </div>
  );
}
