import { Button, Card, Divider, Grid, Popover, Row, Text } from '@nextui-org/react';
import { MdDeleteForever } from 'react-icons/md';

const Note = ({ note, handleDeleteNote }) => {

    return (
        <Card shadow={true} hoverable >
            <Card.Header>{note.date}</Card.Header>
            <Divider />
            <Card.Body>
                <Text>
                    {note.text}
                </Text>
            </Card.Body>
            <Divider />
            <Card.Footer>
                <Popover >
                    <Popover.Trigger>
                        <Button color='error' ripple auto>
                            Delete
                            <MdDeleteForever
                                className='delete-icon'
                                size='1.3em' />
                        </Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Grid.Container
                            css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}
                        >
                            <Row justify="center" align="center">
                                <Text b>Confirm</Text>
                            </Row>
                            <Row>
                                <Text>
                                    Are you sure you want to delete this notes ?
                                </Text>
                            </Row>
                            <Grid.Container justify="space-between" alignContent="center">
                                <Grid>
                                </Grid>
                                <Grid>
                                    <Button size="sm" shadow color="error" onClick={() => handleDeleteNote(note.id)}
                                    >
                                        Delete
                                    </Button>
                                </Grid>
                                <Grid></Grid>
                            </Grid.Container>
                        </Grid.Container>
                    </Popover.Content>
                </Popover>

            </Card.Footer>
        </Card >
    );
};

export default Note;