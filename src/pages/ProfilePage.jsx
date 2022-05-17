import { Container, Grid, Link, Row, Text } from '@nextui-org/react';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import NotesList from '../components/NotesList';
import { useAuth } from '../context/AuthContext';
import db from '../firebaseConfig';

const ProfilePage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const { currentUser } = useAuth();


    const deleteNote = async (id) => {
        await deleteDoc(doc(db, "Notes", id));
    };

    const editNote = async (id, Newtext) => {
        const myDocRef = doc(db, 'Notes', id);
        await setDoc(myDocRef, {
            id: id,
            text: Newtext.charAt(0).toUpperCase() + Newtext.slice(1),
            date: new Date().toLocaleDateString(),
            user: currentUser.displayName,
            userEmail: currentUser.email
        }, { merge: false });
    };

    const handleAddNote = async (text) => {
        let someID = nanoid();
        const newNote = {
            id: someID,
            text: text.charAt(0).toUpperCase() + text.slice(1),
            date: new Date().toLocaleDateString(),
            user: currentUser.displayName,
            userEmail: currentUser.email
        };
        await setDoc(doc(db, 'Notes', someID), newNote);
    };

    useEffect(() => {
        const refValue = collection(db, 'Notes');
        const q = query(refValue, where('userEmail', '==', currentUser.email), orderBy("text"));
        onSnapshot(q, (snapshot) => {
            setNotes(snapshot.docs.map((doc) => doc.data()));
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid>
            <Header title='Profile' />

            <Grid.Container>
                <Container>
                    <Row>
                        <Text h3 css={{ margin: 'auto' }}>
                            {currentUser.displayName}
                            <Text>
                                <Link href={`mailto:${currentUser.email}`}>
                                    {currentUser.email}
                                </Link>
                            </Text>
                        </Text>
                    </Row>

                    <Row >
                        <Text h5>
                            Your Notes
                        </Text>
                    </Row>
                </Container>

                <NotesList
                    notes={notes}
                    showSearch={true}
                    showAddNewNote={true}
                    loading={loading}
                    handleAddNote={handleAddNote}
                    handleDeleteNote={deleteNote}
                    handleEditNote={editNote}
                />
            </Grid.Container>

        </Container >
    );
};

export default ProfilePage;