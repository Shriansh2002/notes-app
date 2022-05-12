import Note from './Note';
import AddNote from './AddNote';
import { Container, Grid } from '@nextui-org/react';

const NotesList = ({ notes, handleAddNote, handleDeleteNote }) => {
    return (
        <Grid.Container gap={2}>
            {notes?.map((note, index) => (
                <Grid md={3} sm={5} xs={4}
                    key={note + index}>
                    <Note
                        note={note}
                        handleDeleteNote={handleDeleteNote}
                    />
                </Grid>
            ))}

            {notes?.length === 0 && <Container>No Notes Found</Container>}

            <AddNote handleAddNote={handleAddNote} />
        </Grid.Container>
    );
};

export default NotesList;