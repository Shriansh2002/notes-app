import { Button, Card, Divider, Text } from '@nextui-org/react';
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
                <Button shadow color='error'>
                    Delete
                    <MdDeleteForever
                        onClick={() => handleDeleteNote(note.id)}
                        className='delete-icon'
                        size='1.3em' />
                </Button>

            </Card.Footer>
        </Card>
    );
};

export default Note;