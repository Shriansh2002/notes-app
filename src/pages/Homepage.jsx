import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// Firebase 🔥
import db, { auth } from '../firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, getDocs } from "firebase/firestore";
import { Container } from '@nextui-org/react';

// components
import Header from '../components/Header';
import NotesList from '../components/NotesList';

const Homepage = () => {
    const [notes, setNotes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;

    const addNote = async (text) => {
        let someID = nanoid();
        const newNote = {
            id: someID,
            text: text.charAt(0).toUpperCase() + text.slice(1),
            date: new Date().toLocaleDateString()
        };
        await setDoc(doc(db, 'Notes', someID), newNote);
    };

    const deleteNote = async (id) => {
        await deleteDoc(doc(db, "Notes", id));
    };

    const editNote = async (id, Newtext) => {
        const myDocRef = doc(db, 'Notes', id);
        await setDoc(myDocRef, {
            id: id,
            text: Newtext.charAt(0).toUpperCase() + Newtext.slice(1),
            date: new Date().toLocaleDateString()
        }, { merge: false });
    };

    const handleDeleteAllNotes = async () => {
        const querySnap = await getDocs(collection(db, 'Notes'));

        querySnap.forEach((document) => {
            deleteDoc(doc(db, 'Notes', document.data().id));
        });
    };

    useEffect(() => {
        const q = query(collection(db, 'Notes'), orderBy("text"));
        onSnapshot(q, (snapshot) => {
            setNotes(snapshot.docs.map((doc) => doc.data()));
            setLoading(false);
        });
    }, []);
    return (
        <Container fluid>
            <Header user={user} />

            <NotesList
                notes={notes?.filter((note) =>
                    note.text.toLowerCase().includes(searchText.toLowerCase()))
                }
                setSearchText={setSearchText}
                searchText={searchText}
                loading={loading}
                user={user}
                handleAddNote={addNote}
                handleDeleteNote={deleteNote}
                handleEditNote={editNote}
                handleDeleteAllNotes={handleDeleteAllNotes}
            />
        </Container>
    );
};

export default Homepage;