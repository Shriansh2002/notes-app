import { useState, useEffect } from 'react';

// Firebase 🔥
import db, { auth } from '../firebaseConfig';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { Container } from '@nextui-org/react';

// components
import Header from '../components/Header';
import NotesList from '../components/NotesList';

const Homepage = () => {
    const [notes, setNotes] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;


    const deleteNote = async (id) => {
        await deleteDoc(doc(db, "Notes", id));
    };

    const editNote = async (id, Newtext) => {
        const myDocRef = doc(db, 'Notes', id);
        await setDoc(myDocRef, {
            id: id,
            text: Newtext.charAt(0).toUpperCase() + Newtext.slice(1),
            date: new Date().toLocaleDateString(),
            user: auth.currentUser.email
        }, { merge: false });
    };
    // console.log(auth.currentUser.email);

    useEffect(() => {
        const q = query(collection(db, 'Notes'), orderBy("text"));
        onSnapshot(q, (snapshot) => {
            setNotes(snapshot.docs.map((doc) => doc.data()));
            setLoading(false);
        });
    }, []);
    return (
        <Container fluid>
            <Header title='Notes' primaryFunction='profile' />

            <NotesList
                notes={notes?.filter((note) =>
                    note.text.toLowerCase().includes(searchText.toLowerCase()))
                }
                setSearchText={setSearchText}
                searchText={searchText}
                loading={loading}
                user={user}
                handleDeleteNote={deleteNote}
                handleEditNote={editNote}
            />
        </Container>
    );
};

export default Homepage;