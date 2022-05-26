import { useState, useEffect } from 'react';

// Firebase 🔥
import db, { auth } from '../firebaseConfig';
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Container } from '@nextui-org/react';
import { deleteNote, editNote } from '../func/index';


// components
import Header from '../components/Header';
import NotesList from '../components/NotesList';

const Homepage = () => {
    const [notes, setNotes] = useState([]);
    const [filterAv, setFilterAv] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;


    // console.log(auth.currentUser.email);

    useEffect(() => {
        const refValue = collection(db, 'Notes');

        if (filterAv.length === 0) {
            const q = query(refValue, orderBy("text"));
            onSnapshot(q, (snapshot) => {
                setNotes(snapshot.docs.map((doc) => doc.data()));
                setLoading(false);
            });
        }
        else {
            console.log(filterAv);

            const q = query(refValue, where('genre', 'in', filterAv), orderBy("text"));
            onSnapshot(q, (snapshot) => {
                setNotes(snapshot.docs.map((doc) => doc.data()));
                setLoading(false);
            });
        }
    }, [filterAv]);

    return (
        <Container fluid>
            <Header primaryFunction='profile' />

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
                setFilterAv={setFilterAv}
            />
        </Container>
    );
};

export default Homepage;