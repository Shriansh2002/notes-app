import { Container, Grid, Link, Row, Text } from '@nextui-org/react';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';
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
        const refValue = collection(db, 'Notes');
        const q = query(refValue, where('user', '==', currentUser.displayName), orderBy("text"));
        onSnapshot(q, (snapshot) => {
            setNotes(snapshot.docs.map((doc) => doc.data()));
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const handleAddNote = async (text) => {
        let someID = nanoid();
        const newNote = {
            id: someID,
            text: text.charAt(0).toUpperCase() + text.slice(1),
            date: new Date().toLocaleDateString(),
            user: currentUser.displayName
        };
        await setDoc(doc(db, 'Notes', someID), newNote);
    };

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
                    handleDeleteAllNotes={handleDeleteAllNotes}
                />
            </Grid.Container>

        </Container >
    );
};

export default ProfilePage;