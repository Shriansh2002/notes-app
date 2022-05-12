import Note from './Note';
import AddNote from './AddNote';
import { Grid } from '@nextui-org/react';

const NotesList = ({ notes, handleAddNote, handleDeleteNote }) => {
    return (
        <Grid.Container gap={2}>
            {notes?.map((note, index) => (
                <Grid sm={4} md={3}
                    key={note + index}>
                    <Note
                        note={note}
                        handleDeleteNote={handleDeleteNote}
                    />
                </Grid>
            ))}

            {notes?.length === 0 && <>No Results Found</>}

            <AddNote handleAddNote={handleAddNote} />
        </Grid.Container>
    );
};

export default NotesList;