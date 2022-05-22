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
    const [fileImageURL, setFileImageURL] = useState('');
    const [selected, setSelected] = useState(genreValues[0]);
    const charLimit = 200;

    const { currentUser } = useAuth();

    const handleChange = (event) => {
        if (charLimit - event.target.value.length >= 0) {
            setNoteText(event.target.value);
        }
    };

    const handleFileChange = (e) => {
        setFileImageURL(e.target.value);
    };

    const handleSave = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText, currentUser, fileImageURL);
            setNoteText('');
            setFileImageURL('');
        };
    };
    console.log(selected);

    return (
        <Card color='gradient'>
            <Card.Header>
                <Text style={{ textAlign: 'center', color: 'white' }}>
                    Posting as <b> {currentUser.displayName} </b>
                </Text>
            </Card.Header>
            <Divider />
            <Card.Body>
                <Textarea
                    size='md'
                    value={noteText}
                    onChange={handleChange}
                    label='Add Your Note Here'
                />
                <Spacer />
                <Radio.Group
                    row
                    value="primary"
                    size='xs'
                    textColor='$white'
                >
                    {genreValues.map((genItem, index) => (
                        <div key={genItem + index}>
                            <Radio value={genItem} color="success"
                                onChange={() => setSelected(genItem)}
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
                    <Button size="sm" color='success' auto ghost onPress={handleSave}>Save</Button>
                </Row>
            </Card.Footer>
        </Card >
    );
};

export default AddNote;
