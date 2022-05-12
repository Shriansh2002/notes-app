import { Button, Card, Divider, Input, Row, Text } from '@nextui-org/react';
import { useState } from 'react';

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const charLimit = 200;

    const handleChange = (event) => {
        if (charLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }
    };

    const handleSave = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        }
    };

    return (
        <Card css={{ mw: '330px' }} color='secondary'>
            <Card.Header>
                <Text style={{ textAlign: 'center', color: 'white' }}>
                    <b>Add New Note </b>
                </Text>
            </Card.Header>
            <Divider />
            <Card.Body>
                <Input
                    placeholder="Type to add a note..."
                    value={noteText}
                    onChange={handleChange}

                />
            </Card.Body>
            <Divider />
            <Card.Footer>
                <Row justify="flex-end">
                    <Button size="sm" light css={{ color: 'white' }}>
                        {charLimit - noteText.length}  Remaining
                    </Button>
                    <Button size="sm" onClick={handleSave}>Save</Button>
                </Row>
            </Card.Footer>
        </Card >
    );
};

export default AddNote;
