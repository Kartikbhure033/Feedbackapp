import React, { useState } from 'react';
import api from '/src/api/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ Email: '', password: '' });
  const navigate = useNavigate();

  const on = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', form); // cookie set by server
      console.log(res.data);
      // navigate to feedback form (or admin page) client-side
      
        navigate('/feedback');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6 bg-white rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <input name="Email" placeholder="Email" value={form.Email} onChange={on} className="w-full mb-2 p-2 border rounded"/>
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={on} className="w-full mb-4 p-2 border rounded"/>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
    </form>
  );
};

export default Login;
