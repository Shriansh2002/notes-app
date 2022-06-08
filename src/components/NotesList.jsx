import { useState } from 'react';
import Note from './Note';
import AddNote from './AddNote';
import {
    Button,
    Checkbox,
    Modal,
    Container,
    Grid,
    Loading,
    Row,
    Text,
    Spacer
} from '@nextui-org/react';
import { useAuth } from '../context/AuthContext';
import Search from './Search';
import { MdFilterList } from 'react-icons/md';

const genreValues = [
    'Action',
    'Adventure',
    'Puzzle',
    'Racing',
    'Sports'
];

const NotesList = ({ loading,
    notes,
    handleAddNote,
    handleDeleteNote,
    handleEditNote,
    searchText,
    setSearchText,
    showSearch,
    showAddNewNote,
    userPresence = true,
    filterAv,
    setFilterAv }) => {

    const { currentUser } = useAuth();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState([]);
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
    };

    return (
        <>
            {currentUser && !showSearch &&
                <>
                    <Search handleSearchNote={setSearchText} />
                    <Container>
                        {searchText && <h3>You Searched for {searchText} </h3>}
                    </Container>
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
                                {showAddNewNote &&
                                    <Grid xs={12} md={6}>
                                        <AddNote handleAddNote={handleAddNote} />
                                    </Grid>
                                }
                                <Grid.Container justify='space-between'>
                                    <Grid>
                                        <Container>
                                            <Row>
                                                {notes[0]?.userEmail === currentUser.email
                                                    && <Text h5>
                                                        Your {process.env.REACT_APP_APPLICATION_NAME}
                                                    </Text>
                                                }
                                            </Row>
                                        </Container>
                                    </Grid>

                                    <Grid>
                                        <Grid.Container>
                                            {filterAv &&
                                                <Container>
                                                    Showing Results for&nbsp;
                                                    <>
                                                        {(filterAv.length === genreValues.length) || (filterAv.length === 0)
                                                            ? <Text b>All</Text>
                                                            : <Text b>{filterAv.join(', ')}</Text>
                                                        }
                                                        &nbsp;
                                                    </>
                                                    <MdFilterList onClick={handler} size={20} cursor='pointer' />
                                                    <Spacer />
                                                </Container>
                                            }
                                        </Grid.Container>
                                    </Grid>


                                    <Modal
                                        closeButton
                                        animated={false}
                                        aria-labelledby="modal-title"
                                        open={visible}
                                        onClose={closeHandler}
                                    >
                                        <Modal.Header>
                                            <Text id="modal-title" size={18} b>
                                                Apply Filter
                                            </Text>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Row justify="space-between">
                                                <Checkbox.Group
                                                    label="Select Genre"
                                                    value={selected}
                                                    onChange={setSelected}
                                                >
                                                    {genreValues.map((genItem, index) => (
                                                        <Checkbox value={genItem} key={genItem + index}>{genItem}</Checkbox>
                                                    ))}
                                                </Checkbox.Group>
                                            </Row>
                                            <Text>You're going to see: {selected.join(', ')}</Text>

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button auto flat color="error" onPress={closeHandler}>
                                                Close
                                            </Button>
                                            <Button auto onPress={() => {
                                                if (selected.length > 0) {
                                                    setFilterAv(selected.map((sel) => sel));
                                                }
                                                else if (selected.length === 0) {
                                                    setFilterAv([]);
                                                }
                                                closeHandler();
                                            }}>
                                                Apply
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </Grid.Container>
                                {notes?.length === 0 ?
                                    <>
                                        {userPresence &&
                                            <Container>
                                                <Text h5 color='red'>No {process.env.REACT_APP_APPLICATION_NAME} Found on Server</Text>
                                            </Container>
                                        }
                                    </>
                                    :

                                    <>
                                        <Grid.Container justify='space-between'>
                                            <Grid>
                                                <Container>
                                                    {showSearch ?
                                                        <Text>Found {notes?.length} {process.env.REACT_APP_APPLICATION_NAME} on Profile</Text>
                                                        :
                                                        <Text>Total {notes?.length} {process.env.REACT_APP_APPLICATION_NAME}</Text>
                                                    }
                                                </Container>
                                            </Grid>
                                        </Grid.Container>

                                        {notes?.map((note, index) => (
                                            <Grid xs={12} md={4} sm={6}
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


                    </>
                    :
                    <>
                        <Container>
                            <Text blockquote size={20} color='error'>
                                You need to be Logged in to View and Create {process.env.REACT_APP_APPLICATION_NAME}
                            </Text>
                        </Container>
                    </>
                }

            </Grid.Container >
        </>
    );
};

export default NotesList;