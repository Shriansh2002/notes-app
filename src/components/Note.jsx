import { useState } from 'react';
import { Button, Card, Col, Input, Modal, Row, Spacer, Text, Tooltip, User } from '@nextui-org/react';

import EditIcon from './icons/EditIcon';
import DeleteIcon from './icons/DeleteIcon';

const Note = ({ note, handleDeleteNote, handleEditNote }) => {
    const [visible, setVisible] = useState(false);
    const [dataFromInput, setDataFromInput] = useState('');
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    function getDataFromInput(val) {
        setDataFromInput(val.target.value);
    }


    return (
        <Card cover css={{ w: "100%" }}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                <Col>
                    <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                        {note.date}
                    </Text>
                    <Text h3 color="white">
                        {note.text}
                    </Text>
                </Col>
            </Card.Header>
            <Card.Body>
                <Card.Image
                    showSkeleton
                    src="https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fG5vdGV8ZW58MHx8MHx8"
                    height={400}
                    width="100%"
                    alt="Notes Image"
                />
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
                        <User
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            name="Ariana Wattson"
                            pointer='true'
                            zoomed='true'
                        />
                    </Col>
                    <Col>
                        <Row justify="flex-end">
                            <Button flat auto rounded onPress={handler}>
                                <EditIcon />
                            </Button>
                            <Modal
                                closeButton
                                aria-labelledby="modal-title"
                                open={visible}
                                onClose={closeHandler}>
                                <Modal.Header>
                                    <Text id="modal-title" size={18}>
                                        <Text b size={18}>
                                            Edit Note
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
                                        placeholder="New Text"
                                        required
                                        onChange={getDataFromInput}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button auto flat color="error" onClick={closeHandler}>
                                        Close
                                    </Button>
                                    <Button onPress={() => { handleEditNote(note.id, dataFromInput); closeHandler(); }}>
                                        Submit
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            <Spacer />
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
                </Row>
            </Card.Footer >
        </Card >
    );
};

export default Note;