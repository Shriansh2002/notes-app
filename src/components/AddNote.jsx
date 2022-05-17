import { Button, Card, Divider, Row, Text, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const charLimit = 200;

    const { currentUser } = useAuth();

    const handleChange = (event) => {
        if (charLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }
    };

    const handleSave = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        };
    };

    return (
        <Card color='gradient' css={{ height: '300px' }}>
            <Card.Header>
                <Text style={{ textAlign: 'center', color: 'white' }}>
                    Posting as <b> {currentUser.displayName} </b>
                </Text>
            </Card.Header>
            <Divider />
            <Card.Body>
                <Textarea
                    size='xl'
                    value={noteText}
                    placeholder="..."
                    onChange={handleChange}
                    label='Add Your Note Here'
                />
            </Card.Body>
            <Divider />
            <Card.Footer>
                <Row justify="flex-end">
                    <Button size="sm" light css={{ color: 'white' }}>
                        {charLimit - noteText.length}  Remaining
                    </Button>
                    <Button size="sm" color='success' auto ghost onPress={handleSave}>Save</Button>
                </Row>
            </Card.Footer>
        </Card >
    );
};

export default AddNote;
