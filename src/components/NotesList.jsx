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
    Spacer,
    Card,
    Link
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

    const { currentUser, loginWithGoogle } = useAuth();
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState([]);
    const handler = () => setVisible(true);

    const signUpFunction = async () => {
        try {
            await loginWithGoogle();
        }
        catch {
            console.log(`error faced here.`);
        }
    };

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
                                    <Grid xs={12} md={12}>
                                        <AddNote handleAddNote={handleAddNote} />
                                    </Grid>
                                }
                                <Grid.Container justify='space-between'>
                                    <Grid>
                                        <Container>
                                            <Row>
                                                {(notes[0]?.userEmail === currentUser.email) && showAddNewNote
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
                                            <Text>You're going to see: {selected.join(", ")}</Text>

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
                        <Container style={{
                            backgroundImage: 'url(https://scientific-publishing.webshop.elsevier.com/wp-content/uploads/2021/09/2021-01-1-800x533.jpg)',
                            backgroundRepeat: 'no-repeat',
                            height: '90vh',
                            backgroundSize: 'cover'
                        }}>
                            <Spacer />
                            <Grid.Container>
                                <Container>
                                    <Grid>
                                        <Container>
                                            <Card css={{ p: "$6", height: '30vh' }}>
                                                <Card.Header>
                                                    <img
                                                        alt="nextui logo"
                                                        src="https://is1-ssl.mzstatic.com/image/thumb/Purple112/v4/04/a1/ae/04a1ae15-ca02-a673-13e6-d2c79161c75d/AppIcon-0-0-1x_U007emarketing-0-7-0-0-85-220.png/400x400.png"
                                                        width="34px"
                                                        height="34px"
                                                    />
                                                    <Grid.Container css={{ pl: "$6" }}>
                                                        <Grid xs={12}>
                                                            <Text h4 css={{ lineHeight: "$xs" }}>
                                                                Note Flow
                                                            </Text>
                                                        </Grid>
                                                        <Grid xs={12}>
                                                            <Text css={{ color: "$accents8" }}>notework.in</Text>
                                                        </Grid>
                                                    </Grid.Container>
                                                </Card.Header>
                                                <Card.Body css={{ py: "$2" }}>
                                                    Our App helps you create and share your content with the people in your life.
                                                </Card.Body>
                                                <Card.Footer>
                                                    <Text h5 onClick={signUpFunction} style={{
                                                        cursor: 'pointer'
                                                    }}>
                                                        <Link icon>
                                                            Login To Continue
                                                        </Link>
                                                    </Text>
                                                </Card.Footer>
                                            </Card>
                                        </Container>
                                    </Grid>
                                </Container>

                            </Grid.Container>

                        </Container>
                    </>
                }

            </Grid.Container >
        </>
    );
};

export default NotesList;