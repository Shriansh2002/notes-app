import {
    Container,
    Grid,
    Image,
    Loading,
    Row,
    Spacer,
    Text,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import db from '../firebaseConfig';

const Notepage = () => {
    const { noteID } = useParams();
    const [loading, setLoading] = useState(true);
    const [showLess, setShowLess] = useState(true);
    const [noteInfo, setNoteInfo] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'Notes'), where('id', '==', noteID));
        onSnapshot(q, (snapshot) => {
            setNoteInfo(snapshot.docs.map((doc) => doc.data()));
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container fluid>
            <Header title="Blog Info" />

            <Grid.Container>
                <Container>
                    {loading ? (
                        <Loading size="xs" />
                    ) : (
                        <>
                            {noteInfo.length > 0 ? (
                                <>
                                    <Row>
                                        <Container
                                            css={{
                                                margin: 'auto',
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Text
                                                h1
                                                css={{
                                                    textGradient:
                                                        '45deg, $yellow600 -20%, $red600 100%',
                                                }}
                                            >
                                                {noteInfo[0].text}
                                            </Text>

                                            <Text color="primary">
                                                By:&nbsp;{noteInfo[0].userEmail}
                                            </Text>

                                        </Container>
                                    </Row>
                                    <Text blockquote size={12} css={{
                                        width: 'fit-content',
                                        margin: 'auto',
                                        textAlign: 'center',
                                        background: '$primaryLightActive',
                                        fontWeight: '$bold'
                                    }}>
                                        {noteInfo[0]?.genre || 'ActionTemasdsadsp'}</Text>
                                    <Spacer />
                                    <Image
                                        src={noteInfo[0].noteImage}
                                        alt="Default Image"
                                        css={{
                                            margin: 'none',
                                            marginTop: '$0',
                                            borderRadius: '$lg',
                                            height: '50vh',
                                            width: '100vw',
                                        }}
                                    />

                                    <Container
                                        css={{
                                            margin: 'auto',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Text>Updated On: {noteInfo[0].date}</Text>
                                        <Spacer />

                                        {noteInfo[0].noteDescription &&
                                            <>
                                                {showLess
                                                    ? <>{noteInfo[0].noteDescription.slice(0, 100)}</>
                                                    : <>{noteInfo[0].noteDescription}</>
                                                }

                                                <Text color='#cecece' onClick={() => setShowLess(!showLess)}>Show &nbsp;
                                                    {showLess === true ? <>More</> : <>Less</>}
                                                </Text>
                                            </>
                                        }

                                    </Container>
                                </>
                            ) : (
                                <Container>
                                    <Row>
                                        <Text
                                            h2
                                            css={{ margin: 'auto' }}
                                            color="error"
                                        >
                                            NO NOTE FOUND
                                        </Text>
                                    </Row>
                                </Container>
                            )}
                        </>
                    )}
                </Container>
            </Grid.Container >
        </Container >
    );
};

export default Notepage;
