import { Container, Grid, Image, Loading, Row, Text } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import db from '../firebaseConfig';

const Notepage = () => {
    const { noteID } = useParams();
    const [loading, setLoading] = useState(true);
    const [noteInfo, setNoteInfo] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "Notes"), where("id", "==", noteID));
        onSnapshot(q, (snapshot) => {
            setNoteInfo(snapshot.docs.map((doc) => doc.data()));
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid>
            <Header title='Note Info' />

            <Grid.Container>
                <Container>

                    {loading
                        ?
                        <Loading size="xs" />
                        :
                        <>
                            {noteInfo.length > 0 ?
                                <>
                                    <Row>
                                        <Text h2 css={{ margin: 'auto' }}>
                                            {noteInfo[0].text}
                                            <Text >
                                                By:&nbsp;{noteInfo[0].userEmail}
                                            </Text>
                                        </Text>
                                    </Row>
                                    <Row>
                                        <Image
                                            src={noteInfo[0].noteImage}
                                            alt="Default Image"
                                            css={{ margin: 'none', marginTop: '$0', borderRadius: '$lg' }}
                                        />
                                    </Row>
                                </>
                                :
                                <Container>
                                    <Row>
                                        <Text h2 css={{ margin: 'auto' }} color='error'>
                                            NO NOTE FOUND
                                        </Text>
                                    </Row>
                                </Container>
                            }
                        </>
                    }
                </Container>
            </Grid.Container >

        </Container >
    );
};

export default Notepage;