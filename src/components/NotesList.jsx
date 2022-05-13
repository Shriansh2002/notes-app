import Note from './Note';
import AddNote from './AddNote';
import { Container, Grid, Text } from '@nextui-org/react';

const NotesList = ({ notes, handleAddNote, handleDeleteNote }) => {
    return (
        <Grid.Container gap={2}>

            {notes?.length === 0 ?
                <Container>
                    <h3>No Notes Found, Create One Instead 📝  !!</h3>
                </Container> :


                <>
                    <Container><Text>Found {notes?.length} Notes</Text></Container>
                    {notes?.map((note, index) => (
                        <Grid xs={12} md={6}
                            key={note + index}>
                            <Note
                                note={note}
                                handleDeleteNote={handleDeleteNote}
                            />

                        </Grid>
                    ))}
                </>
            }

            <Grid>
                <AddNote handleAddNote={handleAddNote} />
            </Grid>
        </Grid.Container>
    );
};

export default NotesList;