import Note from './Note';
import AddNote from './AddNote';
import {
    Container,
    Grid,
    Loading,
    Text
} from '@nextui-org/react';
import { useAuth } from '../context/AuthContext';
import Search from './Search';


const NotesList = ({ loading, notes, handleAddNote, handleDeleteNote, handleEditNote, searchText, setSearchText, showSearch, showAddNewNote }) => {
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
                        {loading ?
                            <Container>
                                <Loading size="xs" />
                            </Container>
                            :
                            <>
                                {notes?.length === 0 ?
                                    <Container>
                                        <Text h5 color='red'>No Notes Found on Server</Text>
                                    </Container>
                                    :

                                    <>
                                        <Grid.Container justify='space-between'>
                                            <Grid>
                                                <Container>
                                                    {showSearch &&
                                                        <Text>Found {notes?.length} Notes</Text>
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

                        {showAddNewNote &&
                            <Grid xs={12} md={4}>
                                <AddNote handleAddNote={handleAddNote} />
                            </Grid>
                        }
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