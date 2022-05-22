import { Container, Grid, Image, Row } from '@nextui-org/react';
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
                    <Row>
                        {!loading &&
                            <>
                                <Image
                                    src={noteInfo[0]?.noteImage && noteInfo[0].noteImage}
                                    alt="Default Image"
                                />
                            </>
                        }
                    </Row>
                </Container>
            </Grid.Container>
        </Container>
    );
};

export default Notepage;