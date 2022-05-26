import { useState, useEffect } from 'react';

// Firebase 🔥
import db, { auth } from '../firebaseConfig';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Container } from '@nextui-org/react';
import { deleteNote, editNote } from '../func/index';


// components
import Header from '../components/Header';
import NotesList from '../components/NotesList';

const Homepage = () => {
    const [notes, setNotes] = useState([]);
    const [filterAv, setFilterAv] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);
    const user = auth.currentUser;


    // console.log(auth.currentUser.email);

    useEffect(() => {
        if (!filterAv) {
            const q = query(collection(db, 'Notes'), orderBy("text"));
            onSnapshot(q, (snapshot) => {
                setNotes(snapshot.docs.map((doc) => doc.data()));
                setLoading(false);
            });
        }
        else {
            // const q = query(collection(db, 'Notes'), orderBy("text"));
            // onSnapshot(q, (snapshot) => {
            //     setNotes(snapshot.docs.map((doc) => doc.data()));
            //     setLoading(false);
            // });
            console.log('not able to opt to fetch notes');
            setNotes([]);
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