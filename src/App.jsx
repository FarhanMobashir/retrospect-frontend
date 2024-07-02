import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import MemoryList from './components/MemoryList';
import MemoryDetail from './components/MemoryDetail';
import MemoryForm from './components/MemoryForm';
import Homepage from './components/Homepage';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/memories/:id" element={<PrivateRoute element={MemoryDetail} />} /> */}
            <Route path="/memories" element={<PrivateRoute element={MemoryList} />} />
            <Route path="/new-memory" element={<PrivateRoute element={MemoryForm} />} />
            {/* <Route path="/edit-memory/:id" element={<PrivateRoute element={MemoryForm} />} /> */}
            <Route path="/profile" element={<PrivateRoute element={Profile} />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
