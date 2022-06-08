import {
    Container,
    Grid,
    Image,
    Link,
    Loading,
    Popover,
    Row,
    Spacer,
    Text,
} from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import db from '../firebaseConfig';

import { FiShare } from 'react-icons/fi';
import { IoLogoWhatsapp } from 'react-icons/io';
import copy from 'copy-to-clipboard';

const Notepage = () => {
    const { noteID } = useParams();
    const [loading, setLoading] = useState(true);
    const [showLess, setShowLess] = useState(true);
    const [noteInfo, setNoteInfo] = useState([]);
    const messageContent =
        `Check Out This Blog Published on React-Notes-Shriansh Website ⬇️
        
${window.location.href}`;

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
            <Header />

            <Grid.Container>
                <Container>
                    {loading ? (
                        <Loading size="xs" />
                    ) : (
                        <>
                            {noteInfo?.length > 0 ? (
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

                                            <Link href={`/u/${noteInfo[0].userEmail}`}>
                                                <Text color="primary">
                                                    By:&nbsp;{noteInfo[0].userEmail}
                                                </Text>
                                            </Link>

                                        </Container>
                                    </Row>
                                    <Spacer />
                                    <Row>

                                        <Text blockquote size={12} css={{
                                            width: 'fit-content',
                                            margin: 'auto',
                                            textAlign: 'center',
                                            background: '$primaryLightActive',
                                            fontWeight: '$bold'
                                        }}>
                                            {noteInfo[0]?.genre || 'ActionTemasdsadsp'}
                                        </Text>
                                    </Row>
                                    <Spacer />

                                    <Row>
                                        <Container css={{
                                            display: 'flex',
                                            margin: 'auto',
                                            maxWidth: '140px',
                                            textAlign: 'center',
                                            alignContent: 'space-between',
                                            justifyContent: 'space-between',
                                        }}>

                                            <Popover>
                                                <Popover.Trigger>
                                                    <div>
                                                        <FiShare
                                                            size={20}
                                                            cursor='pointer'
                                                            onClick={() => copy(window.location.href)}
                                                        />
                                                    </div>
                                                </Popover.Trigger>
                                                <Popover.Content>
                                                    <Text css={{ p: '$4' }}>URL Copied to Clipboard 📋 </Text>
                                                </Popover.Content>
                                            </Popover>

                                            <a
                                                href={`https://wa.me/?text=${messageContent}`}
                                                data-action="share/whatsapp/share"
                                            >
                                                <IoLogoWhatsapp
                                                    color='green'
                                                    size={20}
                                                    cursor='pointer'
                                                    onClick={() => { }}
                                                />
                                            </a>
                                            <a
                                                href={`whatsapp://send?text=${messageContent}`}
                                                data-action="share/whatsapp/share"
                                            >
                                                <IoLogoWhatsapp
                                                    color='green'
                                                    size={20}
                                                    cursor='pointer'
                                                    onClick={() => { }}
                                                />
                                            </a>
                                        </Container>
                                    </Row>
                                    <Spacer />
                                    <Image
                                        src={noteInfo[0].noteImage}
                                        alt="Default Image"
                                        css={{
                                            objectFit: 'cover',
                                            margin: 'none',
                                            marginTop: '$0',
                                            borderRadius: '$lg',
                                            width: '100vw',
                                            height: 'auto'
                                        }}
                                    />

                                    <Container
                                        css={{
                                            margin: 'auto',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <Text color='#939393'>
                                            Updated On: &nbsp;
                                            <b>{noteInfo[0].date}</b>
                                        </Text>

                                        <Spacer />

                                        {noteInfo[0].noteDescription &&
                                            <>
                                                {showLess
                                                    ? <>{noteInfo[0].noteDescription.slice(0, 100)}</>
                                                    : <>{noteInfo[0].noteDescription}</>
                                                }

                                                {noteInfo[0].noteDescription.length > 100 &&

                                                    <Text color='#cecece' onClick={() => setShowLess(!showLess)}>
                                                        Show &nbsp;
                                                        {showLess === true ? <>More</> : <>Less</>}
                                                    </Text>

                                                }
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

