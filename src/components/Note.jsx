import { useState } from 'react';
import {
    Button,
    Card,
    Col,
    Grid,
    Input,
    Link,
    Modal,
    Row,
    Spacer,
    Text,
    Tooltip,
    User
} from '@nextui-org/react';

import EditIcon from './icons/EditIcon';
import DeleteIcon from './icons/DeleteIcon';
import { auth } from '../firebaseConfig';

const Note = ({ note, handleDeleteNote, handleEditNote }) => {
    const [visible, setVisible] = useState(false);
    const [dataFromInput, setDataFromInput] = useState('');
    const [fileDataFromInput, setFileDataFromInput] = useState('');
    const [error, setError] = useState('');

    const user = auth.currentUser;
    const handler = () => setVisible(true);
    const charLimit = 200;

    const closeHandler = () => {
        setVisible(false);
        setError('');
    };

    function getDataFromInput(val) {
        if (charLimit - val.target.value.length > 0) {
            setError('');
            setDataFromInput(val.target.value);
        } else {
            setError(`Only ${charLimit} Characters Allowed`);
        }
    }

    function getFileDataFromInput(val) {
        setFileDataFromInput(val.target.value);
    }


    return (
        <Card cover css={{ w: "100%" }}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                <Col css={{ wordWrap: 'break-word' }}>
                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                        {note.date}
                    </Text>
                    <Text h3 color="white">
                        {note.text}
                    </Text>
                </Col>
            </Card.Header>
            <Card.Body>
                <Link href={`/note/${note.id}`}>
                    <Card.Image
                        showSkeleton
                        src={note?.noteImage ?
                            note.noteImage
                            : "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"}
                        height="100%"
                        width="100%"
                        alt="Blog Image"
                    />
                </Link>
            </Card.Body>
            <Card.Footer
                blur
                css={{
                    position: "absolute",
                    bgBlur: "#ffffff",
                    borderTop: "solid rgba(255, 255, 255, 0.2)",
                    bottom: 0,
                    zIndex: 1,
                }}
            >
                <Row>
                    <Col>
                        <Link href={`/u/${note.userEmail}`}>
                            <User
                                src={note.userPhoto}
                                pointer='true'
                                altText='loading...'
                                zoomed='true'
                                bordered
                                color='gradient'
                                name={note.user || 'anonymous'}
                                description={note.userEmail.length < 26 ? note.userEmail : note.userEmail.substring(0, note.userEmail.lastIndexOf("@"))
                                }
                            />
                        </Link>
                    </Col>
                    {note.userEmail === user.email &&
                        <Col>
                            <Row justify="flex-end">
                                <Button flat auto rounded onPress={handler}>
                                    <EditIcon />
                                </Button>
                                <Modal
                                    closeButton
                                    preventClose
                                    aria-labelledby="modal-title"
                                    open={visible}
                                    onClose={closeHandler}>
                                    <Modal.Header>
                                        <Text id="modal-title" size={18}>
                                            <Text b size={18}>
                                                {note.text}
                                            </Text>
                                        </Text>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Input
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            placeholder={note.text}
                                            label="Edit Note Text"
                                            required
                                            onChange={getDataFromInput}
                                        />
                                        <Input
                                            clearable
                                            bordered
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                            label="Edit Note Image"
                                            placeholder={!note.noteImage ? '<No Existing Image>' : note.noteImage}
                                            required
                                            onChange={getFileDataFromInput}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Grid.Container>
                                            <Grid>
                                                {error &&
                                                    <Text color='error'>
                                                        {error}
                                                    </Text>
                                                }
                                            </Grid>
                                            <Row justify='space-around' align='end'>
                                                <Button auto flat color="error" onPress={closeHandler}>
                                                    Close
                                                </Button>
                                                <Button onPress={() => {
                                                    handleEditNote(note.id, dataFromInput, user, fileDataFromInput);
                                                    closeHandler();
                                                }}
                                                    disabled={error && true}
                                                >
                                                    Submit
                                                </Button>
                                            </Row>
                                        </Grid.Container>

                                    </Modal.Footer>
                                </Modal>
                                <Spacer x={0.4} />

                                <Tooltip
                                    content="Delete Note"
                                    color="error"
                                >

                                    <Button flat auto rounded color="error" onPress={() => handleDeleteNote(note.id)}>
                                        <DeleteIcon />
                                    </Button>
                                </Tooltip>
                            </Row>
                        </Col>
                    }
                </Row>
            </Card.Footer >
        </Card >
    );
};

export default Note;