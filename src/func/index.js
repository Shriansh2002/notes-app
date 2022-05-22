import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import db from '../firebaseConfig';

export const deleteNote = async (id) => {
    await deleteDoc(doc(db, "Notes", id));
};

export const editNote = async (id, Newtext, currentUser, photoURL, selectedGenre,) => {
    const myDocRef = doc(db, 'Notes', id);
    await setDoc(myDocRef, {
        id: id,
        text: Newtext.charAt(0).toUpperCase() + Newtext.slice(1),
        noteImage: photoURL,
        genre: selectedGenre,
        date: new Date().toLocaleDateString(),
        user: currentUser.displayName,
        userEmail: currentUser.email,
        userPhoto: currentUser.photoURL,
    }, { merge: false });
};


export const handleAddNote = async (
    text,
    currentUser,
    photoURL = 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80',
    selectedGenre,

) => {
    let someID = nanoid();
    const newNote = {
        id: someID,
        text: text.charAt(0).toUpperCase() + text.slice(1),
        noteImage: photoURL,
        genre: selectedGenre,
        date: new Date().toLocaleDateString(),
        user: currentUser.displayName,
        userEmail: currentUser.email,
        userPhoto: currentUser.photoURL,
    };
    await setDoc(doc(db, 'Notes', someID), newNote);
};

