import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Home from './pages/Home/Home';
import TopicSelection from './components/TopicSelection/TopicSelection';
import SortingVisualizer from './components/Sorting/SortingVisualizer'; // New import
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (curr) => setUser(curr));
    return () => unsub();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
      <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/topics" element={user ? <TopicSelection /> : <Navigate to="/login" />} />
      <Route 
        path="/sorting-visualizer" 
        element={user ? <SortingVisualizer /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
}

export default App;