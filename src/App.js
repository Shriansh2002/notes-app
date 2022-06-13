import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from './context/AuthContext';
import { Loading } from '@nextui-org/react';
import './App.css';

// pages
import { Homepage, Dashboard, Notepage, ProfilePage, UserPage } from './pages';

import { doc, getDoc } from 'firebase/firestore';
import db from './firebaseConfig';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

function AdminRoute({ children, adminEmailAddresses }) {
  const { currentUser } = useAuth();

  return currentUser &&
    adminEmailAddresses.includes(currentUser.email) ? children
    : <>
      <Navigate to="/" />
    </>;
}

function App() {
  const [adminEmailAddresses, setAdminEmailAddress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function check() {
      const docRef = doc(db, "AdminEmailAccess", "ADMIN_EMAIL_ADDRESS");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const emailData = docSnap.data().email;
        setAdminEmailAddress(emailData);
        setLoading(false);
      }
    }
    check();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>

        {loading ? <Loading /> :
          <Routes>

            <Route path='/' element={<Homepage adminEmailAddresses={adminEmailAddresses} />} />
            <Route exact path='/home' element={<Homepage adminEmailAddresses={adminEmailAddresses} />} />

            <Route exact path='/profile'
              element={
                <PrivateRoute>
                  <ProfilePage adminEmailAddresses={adminEmailAddresses} />
                </PrivateRoute>
              } />

            <Route exact path='/u/:userID'
              element={
                <PrivateRoute>
                  <UserPage adminEmailAddresses={adminEmailAddresses} />
                </PrivateRoute>
              } />

            <Route exact path='/note/:noteID'
              element={
                <PrivateRoute>
                  <Notepage adminEmailAddresses={adminEmailAddresses} />
                </PrivateRoute>
              } />

            <Route exact path='/admin/dashboard'
              element={
                <AdminRoute adminEmailAddresses={adminEmailAddresses}>
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
        }

      </AuthProvider>
    </BrowserRouter >
  );
};

export default App;
