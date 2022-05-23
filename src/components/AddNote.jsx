import { Button, Card, Divider, Input, Radio, Row, Spacer, Text, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const genreValues = [
    'Action',
    'Adventure',
    'Puzzle',
    'Racing',
    'Sports'
];

const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const [noteTextDescription, setNoteTextDescription] = useState('');
    const [fileImageURL, setFileImageURL] = useState('');
    const [genreSelected, setGenreSelected] = useState('Action');
    const charLimit = 100;

    const { currentUser } = useAuth();

    const handleChange = (event) => {
        if (charLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }
    };

    const handleDescChange = (e) => {
        if (500 - e.target.value.length >= 0) {
            setNoteTextDescription(e.target.value);
        }
    };

    const handleFileChange = (e) => {
        setFileImageURL(e.target.value);
    };

    const handleSave = () => {
        if (noteText.trim().length > 0) {
            console.log(genreSelected);
            handleAddNote(noteText, currentUser, fileImageURL, genreSelected, noteTextDescription);
            setNoteText('');
            setNoteTextDescription('');
            setGenreSelected('');
            setFileImageURL('');
        };
    };

    return (
        <Card color='gradient'>
            <Card.Header>
                <Text style={{ textAlign: 'center', color: 'white' }}>
                    Posting as <b> {currentUser.displayName} </b>
                </Text>
            </Card.Header>
            <Divider />
            <Card.Body>
                <Input
                    size='md'
                    clearable
                    value={noteText}
                    label="Title"
                    onChange={handleChange}
                />
                <Spacer />
                <Textarea
                    size='md'
                    value={noteTextDescription}
                    onChange={handleDescChange}
                    label='Description'
                />
                <Spacer />
                <Radio.Group
                    row
                    value={genreSelected}
                    size='xs'
                    textColor='$white'
                >
                    {genreValues.map((genItem, index) => (
                        <div key={genItem + index}>
                            <Radio value={genItem} color="success"
                                onChange={() => setGenreSelected(genItem)}
                            >
                                {genItem}
                            </Radio>
                            <Spacer />
                        </div>
                    ))}
                </Radio.Group>
                <Input
                    size='md'
                    clearable
                    value={fileImageURL}
                    label="Background Image URL"
                    onChange={handleFileChange}
                />
            </Card.Body>
            <Divider />
            <Card.Footer>
                <Row justify="flex-end">
                    <Button size="sm" light css={{ color: 'white' }}>
                        {charLimit - noteText.length}  Remaining
                    </Button>
                    <Button size="sm" color='success' auto ghost onClick={handleSave}>Save</Button>
                </Row>
            </Card.Footer>
        </Card >
    );
};

export default AddNote;
