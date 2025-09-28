import React, { useEffect, useState } from 'react';
import api from '/src/api/api';
import { useNavigate } from 'react-router-dom';
import Navbar from "/src/components/Navbar"

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        // first ensure current user is admin
        const me = await api.get('/me');
        if (me.data.role !== 'admin') {
          alert('Admin only');
          return navigate('/');
        }
        const res = await api.get('/feedback'); // admin-only endpoint
        setFeedbacks(res.data);
      } catch (err) {
        console.error(err);
        navigate('/login');
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar/>
      <h2 className="text-3xl font-semibold text-center mb-8">Student Feedback (Admin view)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feedbacks.map((fb) => (
          <div key={fb._id} className="bg-white shadow-md rounded-xl p-6 space-y-3">
            <p><span className='font-semibold'>Student: </span>{fb.user?.Fullname}</p>
            <p><span className='font-semibold'>Email: </span>{fb.user?.Email}</p>
            <p><span className="font-semibold">Likes:</span> {fb.likes}</p>
            <p><span className="font-semibold">Improve:</span> {fb.Improve}</p>
            <p><span className="font-semibold">Rating:</span> {'⭐'.repeat(Number(fb.rating || 0))}</p>
            <p><span className="font-semibold">Comments:</span> {fb.comments}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
