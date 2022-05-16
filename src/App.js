import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import AuthProvider, { useAuth } from './context/AuthContext';

// pages
import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route exact path='/home' element={<Homepage />} />

          <Route exact path='/profile'
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } />

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
