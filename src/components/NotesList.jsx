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
import { useAuth } from '../context/AuthContext';
import Search from './Search';


const NotesList = ({ loading, notes, handleAddNote, handleDeleteNote, handleEditNote, handleDeleteAllNotes, searchText, setSearchText }) => {
    const [visible, setVisible] = useState(false);
    const handler = () => setVisible(true);
    const { currentUser } = useAuth();

    const closeHandler = () => {
        setVisible(false);
    };

    return (
        <>
            {currentUser &&
                <>
                    <Search handleSearchNote={setSearchText} />
                    {searchText && <h3>You Searched for {searchText} </h3>}
                </>
            }
            <Grid.Container gap={2}>
                {currentUser ?
                    <>
                        {loading ?
                            <Container>
                                <Loading size="xs" />
                            </Container>
                            :
                            <>
                                {notes?.length === 0 ?
                                    <Container>
                                        <h3>No Notes Found, Create One Instead 📝  !!</h3>
                                    </Container>
                                    :

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
                            </>
                        }
                        <Grid xs={12} md={4}>
                            <AddNote handleAddNote={handleAddNote} />
                        </Grid>
                    </>
                    :
                    <>
                        <Container>
                            <Text blockquote size={20} color='error'>
                                You need to be Logged in to View Notes and Create Notes
                            </Text>
                        </Container>
                    </>
                }

            </Grid.Container >
        </>
    );
};

export default NotesList;;;;;