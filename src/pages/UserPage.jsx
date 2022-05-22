import { Link, Container, Grid, Row, Text } from '@nextui-org/react';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import NotesList from '../components/NotesList';
import db from '../firebaseConfig';

const UserPage = () => {
    const { userID } = useParams();

    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flag, setFlag] = useState(false);

    async function getUSERDAT() {
        const qSnap = await getDocs(collection(db, 'Notes'));
        qSnap.forEach((doc) => {
            if (doc.data().userEmail === userID) {
                setFlag(true);
            }
        });
    };

    useEffect(() => {
        const refValue = collection(db, 'Notes');

        const q = query(refValue, where('userEmail', '==', userID), orderBy("text"));
        onSnapshot(q, (snapshot) => {
            setNotes(snapshot.docs.map((doc) => doc.data()));
            setLoading(false);
        });

        getUSERDAT();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Container fluid>
                <Header title='User Profile' />

                <Grid.Container>
                    <Container>
                        <Row>
                            {!loading &&
                                <>
                                    {flag ?
                                        <Text h3 css={{ margin: 'auto' }}>
                                            {notes[0]?.user}
                                            <Text>
                                                <Link href={`mailto:${userID}`}>
                                                    {userID}
                                                </Link>
                                            </Text>
                                        </Text>
                                        :
                                        <Text h2 css={{ margin: 'auto' }} color='error'>
                                            NO USER FOUND
                                        </Text>
                                    }
                                </>
                            }
                        </Row>

                        {flag &&
                            <Row>
                                <Text h5>
                                    {notes[0]?.user}'s {process.env.REACT_APP_APPLICATION_NAME}
                                </Text>
                            </Row>
                        }

                    </Container>

                    <NotesList
                        notes={notes}
                        showSearch={true}
                        loading={loading}
                        userPresence={flag}
                    />

                </Grid.Container>
            </Container >
        </>
    );
};

export default UserPage;