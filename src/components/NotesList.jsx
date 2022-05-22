import Note from './Note';
import AddNote from './AddNote';
import {
    Container,
    Grid,
    Loading,
    Row,
    Text
} from '@nextui-org/react';
import { useAuth } from '../context/AuthContext';
import Search from './Search';


const NotesList = ({ loading,
    notes,
    handleAddNote,
    handleDeleteNote,
    handleEditNote,
    searchText,
    setSearchText,
    showSearch,
    showAddNewNote,
    userPresence = true }) => {
    const { currentUser } = useAuth();

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
                        {showAddNewNote &&
                            <Grid xs={12} md={4}>
                                <AddNote handleAddNote={handleAddNote} />
                            </Grid>
                        }

                        {loading ?
                            <Container>
                                <Loading size="xs" />
                            </Container>
                            :
                            <>
                                <Container>
                                    <Row>
                                        <Text h5>
                                            Your {process.env.REACT_APP_APPLICATION_NAME}
                                        </Text>
                                    </Row>
                                </Container>
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