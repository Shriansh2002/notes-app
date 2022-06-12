import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from "../firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import db from '../firebaseConfig';
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const docRef = collection(db, "UsersAVAIL");
    var flag = 0;


    function loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (res) => {

                // check for duplicate entry
                const qSnapshot = await getDocs(docRef);
                qSnapshot.forEach(async (document) => {
                    if (res.user.email === document.data()['email']) {
                        // console.log('already exists in db');
                        flag = 1;

                        // update the doc
                        await updateDoc(doc(db, 'UsersAVAIL', document.id), {
                            lastSignInTime: res.user.metadata.lastSignInTime,
                        });

                    }
                });

                // adding to database
                if (flag === 0) {
                    await setDoc(doc(docRef), {
                        displayName: res.user.displayName,
                        email: res.user.email,
                        emailVerified: res.user.emailVerified,
                        photoURL: res.user.photoURL,
                        uid: res.user.uid,
                        creationTime: res.user.metadata.creationTime,
                        lastSignInTime: res.user.metadata.lastSignInTime,
                    });
                    console.log('added to users');
                }

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