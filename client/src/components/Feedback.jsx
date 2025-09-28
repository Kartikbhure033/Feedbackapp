import React, { useState, useEffect } from 'react';
import api from '/src/api/api';
import { useNavigate } from 'react-router-dom';

const Feedback = () => {
  const [form, setForm] = useState({ likes: "", Improve: "", rating: "", comments: "" });
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [me, setMe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.get('/me');
        setMe(res.data);
        if (res.data.role === 'admin') {
          const s = await api.get('/students'); // admin-only
          setStudents(s.data);
        }
      } catch (err) {
        console.error(err);
        // not logged in -> send to login
        navigate('/login');
      }
    };
    init();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      // admin can create for any student by passing userId
      const payload = { ...form };
      if (me?.role === 'admin' && selectedStudent) payload.userId = selectedStudent;
      const res = await api.post('/feedback', payload);
      console.log('Feedback saved', res.data);
      alert('Feedback submitted');
      setForm({ likes: "", Improve: "", rating: "", comments: "" });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Error submitting feedback');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-2xl bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">University Feedback Form</h2>

        {me && <p className="text-sm text-gray-600 text-center mb-2">Logged in as: {me.Fullname} ({me.Email}) — role: {me.role}</p>}

        {me?.role === 'admin' && (
          <label className="block mb-4">
            Student:
            <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} className="border p-2 rounded mt-1 w-full">
              <option value="">Select student</option>
              {students.map(s => <option key={s._id} value={s._id}>{s.Fullname} — {s.Email}</option>)}
            </select>
            <div className="text-xs text-gray-500 mt-1">As admin you can submit feedback on behalf of a student.</div>
          </label>
        )}

        {/* rest of the fields */}
        <label className="block mb-3">
          <div className="font-medium">What did you like the most in University?</div>
          <textarea name="likes" value={form.likes} onChange={change} rows="3" className="w-full border rounded p-2"/>
        </label>

        <label className="block mb-3">
          <div className="font-medium">What can University improve?</div>
          <textarea name="Improve" value={form.Improve} onChange={change} rows="3" className="w-full border rounded p-2"/>
        </label>

        <label className="block mb-3">
          <div className="font-medium">Rating</div>
          <select name="rating" value={form.rating} onChange={change} className="w-full border rounded p-2">
            <option value="">Select rating</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </label>

        <label className="block mb-4">
          <div className="font-medium">Any additional comments?</div>
          <textarea name="comments" value={form.comments} onChange={change} rows="3" className="w-full border rounded p-2"/>
        </label>

        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Feedback;
