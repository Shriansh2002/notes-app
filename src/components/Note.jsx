import { Button, Card, Col, Row, Text, User } from '@nextui-org/react';

const Note = ({ note, handleDeleteNote, handleEditNote }) => {
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
                    src="https://images.unsplash.com/photo-1471440671318-55bdbb772f93?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8"
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
                            <Button flat auto rounded color="primary" onPress={() => handleEditNote(note.id)}>
                                <Text
                                    size={12}
                                    weight="bold"
                                    transform="uppercase"
                                >
                                    Edit
                                </Text>
                            </Button>
                            &nbsp;
                            <Button flat auto rounded color="error" onPress={() => handleDeleteNote(note.id)}>
                                <Text
                                    css={{ color: "inherit" }}
                                    size={12}
                                    weight="bold"
                                    transform="uppercase"
                                >
                                    Delete
                                </Text>
                            </Button>
                        </Row>
                    </Col>
                </Row>
            </Card.Footer >
        </Card >
    );
};

export default Note;