import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from "../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);


    function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => { console.log(err); });
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    const value = {
        currentUser, loginWithGoogle, logout
    };

    return (
        <>
            <AuthContext.Provider value={value}>
                {!loading && children}

            </AuthContext.Provider>
        </>
    );


}