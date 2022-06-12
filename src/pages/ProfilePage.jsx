import { Container, Grid, Link, Row, Text } from '@nextui-org/react';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import NotesList from '../components/NotesList';
// import { useAuth } from '../context/AuthContext';
import db, { auth } from '../firebaseConfig';

import { deleteNote, editNote, handleAddNote } from '../func/index';

const ProfilePage = ({ adminEmailAddresses }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentUser = auth.currentUser;


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
            <Header adminEmailAddresses={adminEmailAddresses} />

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