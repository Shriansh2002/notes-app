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
    const [error, setError] = useState('');
    const [noteTextDescription, setNoteTextDescription] = useState('');
    const [fileImageURL, setFileImageURL] = useState('');
    const [genreSelected, setGenreSelected] = useState('Action');
    const charLimit = 100;
    const descCharLimit = 500;

    const { currentUser } = useAuth();

    const handleChange = (event) => {
        if (charLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
            setError('');
        }
        else {
            setError(`${charLimit} Char Allowed`);
        }
    };

    const handleDescChange = (e) => {
        if (descCharLimit - e.target.value.length >= 0) {
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
            setError('');
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
                    placeholder='Title For Blog'
                />
                <Spacer />
                <Textarea
                    size='md'
                    value={noteTextDescription}
                    onChange={handleDescChange}
                    label='Description'
                    placeholder='Enter Description for blog'
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
                    {error &&
                        <Text color='error' css={{ background: 'white', borderRadius: '10px', p: '$1' }}>
                            {error}
                        </Text>}
                    <Button size="sm" light css={{ color: 'white' }}>
                        {descCharLimit - noteTextDescription.length}  Remaining
                    </Button>
                    <Button
                        size="sm"
                        color={noteText.length > 0 && 'success'}
                        auto
                        ghost
                        onPress={handleSave}
                        disabled={noteText.length === 0}
                    >
                        Save</Button>
                </Row>
            </Card.Footer>
        </Card >
    );
};

export default AddNote;
