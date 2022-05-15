import { useState } from 'react';
import Note from './Note';
import AddNote from './AddNote';
import {
    Button,
    Container,
    Grid,
    Loading,
    Modal,
    Text
} from '@nextui-org/react';

const NotesList = ({ loading, notes, handleAddNote, handleDeleteNote, handleEditNote, handleDeleteAllNotes }) => {
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    return (
        <Grid.Container gap={2}>

            {notes?.length === 0 ?
                <Container>
                    {!loading ? <><Loading size="xs" />  Loading...</> :
                        <h3>No Notes Found, Create One Instead 📝  !!</h3>
                    }
                </Container> :

                <>
                    <Grid.Container justify='space-between'>
                        <Grid>
                            <Container>
                                <Text>Found {notes?.length} Notes</Text>
                            </Container>
                        </Grid>
                        <Grid>
                            <Container>
                                <Button size='sm' color='error' onClick={handler}>Delete All</Button>
                                <Modal closeButton
                                    aria-labelledby="modal-title"
                                    open={visible}
                                    onClose={closeHandler}>
                                    <Modal.Header>
                                        <Text b id="modal-title" size={18}>
                                            This Will Delete All Notes
                                        </Text>
                                    </Modal.Header>
                                    <Modal.Footer>
                                        <Grid.Container justify='space-evenly'>
                                            <Grid>
                                                <Button auto flat onPress={closeHandler}>
                                                    Close
                                                </Button>
                                            </Grid>
                                            <Grid>
                                                <Button auto color="error" onPress={() => handleDeleteAllNotes()}>
                                                    Delete
                                                </Button>
                                            </Grid>
                                        </Grid.Container>
                                    </Modal.Footer>

                                </Modal>
                            </Container>
                        </Grid>
                    </Grid.Container>

                    {notes?.map((note, index) => (
                        <Grid xs={12} md={4}
                            key={note + index}>
                            <Note
                                note={note}
                                handleDeleteNote={handleDeleteNote}
                                handleEditNote={handleEditNote}
                            />

                        </Grid>
                    ))}
                </>
            }

            <Grid xs={12} md={4}>
                <AddNote handleAddNote={handleAddNote} />
            </Grid>


        </Grid.Container >
    );
};

export default NotesList;