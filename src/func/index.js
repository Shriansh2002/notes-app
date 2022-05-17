import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import db from '../firebaseConfig';

export const deleteNote = async (id) => {
    await deleteDoc(doc(db, "Notes", id));
};

export const editNote = async (id, Newtext, currentUser) => {
    const myDocRef = doc(db, 'Notes', id);
    await setDoc(myDocRef, {
        id: id,
        text: Newtext.charAt(0).toUpperCase() + Newtext.slice(1),
        date: new Date().toLocaleDateString(),
        user: currentUser.displayName,
        userEmail: currentUser.email,
        userPhoto: currentUser.photoURL,
    }, { merge: false });
};


export const handleAddNote = async (text, currentUser) => {
    let someID = nanoid();
    const newNote = {
        id: someID,
        text: text.charAt(0).toUpperCase() + text.slice(1),
        date: new Date().toLocaleDateString(),
        user: currentUser.displayName,
        userEmail: currentUser.email,
        userPhoto: currentUser.photoURL,
    };
    await setDoc(doc(db, 'Notes', someID), newNote);
};

