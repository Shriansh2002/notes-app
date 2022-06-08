import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import AuthProvider, { useAuth } from './context/AuthContext';

// pages
import Homepage from './pages/Homepage';
import Notepage from './pages/Notepage';
import ProfilePage from './pages/ProfilePage';
import UserPage from './pages/UserPage.jsx';
import Dashboard from './pages/Dashboard/Dashboard';

const adminEmailAddresses = [
  'shrianshcoding@gmail.com',
  'shrianshpbt@gmail.com'
];


function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

function AdminRoute({ children }) {
  const { currentUser } = useAuth();

  return adminEmailAddresses.includes(currentUser.email)
    ? children
    :
    <>
      {alert('You are Not Authenticated to Do This Work')}
      <Navigate to="/" />
    </>;
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

          <Route exact path='/u/:userID'
            element={
              <PrivateRoute>
                <UserPage />
              </PrivateRoute>
            } />

          <Route exact path='/note/:noteID'
            element={
              <PrivateRoute>
                <Notepage />
              </PrivateRoute>
            } />

          <Route exact path='/admin/dashboard'
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />

          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
