import React, { useState } from 'react';
import api from '/src/api/api';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [form, setForm] = useState({
    Fullname: "",
    Email: "",
    Phoneno: "",
    Semester: "",
    password: ""
  });
   const navigate = useNavigate();

  const on = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const Submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/students", form);
      console.log(res.data);
      alert('Student created');
       navigate('/login');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Error');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={Submit} className="w-full max-w-xl bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Student Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Fullname</label>
            <input type="text" name="Fullname" value={form.Fullname} onChange={on} className="mt-1 block w-full rounded-lg border px-3 py-2"/>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="Email" value={form.Email} onChange={on} className="mt-1 block w-full rounded-lg border px-3 py-2"/>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Phone no</label>
            <input type="tel" name="Phoneno" value={form.Phoneno} onChange={on} className="mt-1 block w-full rounded-lg border px-3 py-2"/>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Semester</label>
            <input type="text" name="Semester" value={form.Semester} onChange={on} className="mt-1 block w-full rounded-lg border px-3 py-2"/>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" value={form.password} onChange={on} className="mt-1 block w-full rounded-lg border px-3 py-2"/>
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg">Send</button>
      </form>
    </div>
  );
}

export default Form;
